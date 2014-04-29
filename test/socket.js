
/**
 * Test dependencies.
 */

var assert = require('assert');
var socket = require('socket');
var connect = require('connect');

describe("basic", function() {

	var master, slave;
	beforeEach(function() {
		master = socket.connect('chat');
		slave = socket.connect('chat');
		// NOTE: slave.peer is soso
		master.use(connect(slave.peer));
	});

	it('should send message to other peer', function(done) {
		slave.on('topic', function(msg) {
			if(msg === 'hello') done();
		});
		master.emit('topic', 'hello');
	});
	
});
