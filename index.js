
/**
 * Module dependencies.
 * @api private
 */

var peer = require('peer');
var channel = require('channel');
var Emitter = require('component-emitter');


/**
 * Expose 'Socket'
 */

module.exports = Socket;


/**
 * Socket constructor.
 *
 * Examples:
 *
 *   var socket = socket.connect('chat');
 *   
 *   var socket = socket(peer);
 *   socket.connect('chat');
 * 
 * @param {Peer} peer
 * @api public
 */

function Socket(peer) {
  if(!(this instanceof Socket)) return new Socket(peer);
  var _this = this;
  this.peer = peer;
  peer.on('message', function(ev) {
    ev = JSON.parse(ev);
    peer.emit.apply(_this, [ev.topic].concat(ev.body));
  });
  peer.on('channel open', function() {
    // should do that in channel
    peer.on('channel emit', function(topic, body) {

      peer.send({
        topic: topic,
        body: body
      });
    });
  });
}


// Emitter

Emitter(Socket.prototype);


/**
 * Socket factory.
 *
 * Create a socket from a newly created peer
 * and connect it to a room.
 * 
 * @param  {String} room
 * @return {Socket}
 * @api public
 */

Socket.connect = function(room) {
  var socket = new Socket(peer());
  socket.connect(room);
  return socket;
};


/**
 * Connect socket to a data channel.
 * 
 * @param  {String} room 
 * @return {this}
 * @api public
 */

Socket.prototype.connect = function(room) {
  return this.use(channel(room));
};


/**
 * Emit messages through socket.
 *
 * A message has a topic and a body.
 * 
 * Examples:
 *
 *   socket.emit('hello');
 *   socket.emit('hello', 'world');
 * 
 * @param  {String} topic 
 * @return {this}
 * @api public
 */

Socket.prototype.emit = function(topic, body) {
  // NOTE: we should allow to pass multiple arguments
  this.peer.queue('channel emit', topic, body);
  return this;
};


/**
 * Use plugin on socket peer connection.
 *
 * @return {this}
 * @api public
 */

Socket.prototype.use = function() {
  this.peer.use.apply(this.peer, arguments);
  return this;
};
