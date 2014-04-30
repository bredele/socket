socket
======

A library to send messages between two webrtc **[peers](http://github.com/bredele/peer)** in a websocket fashion.


## Installation

with [component](http://github.com/component/component):

	$ component install bredele/socket


## Usage

```js
var io = require('socket');
var socket = io.connect('myroom');

socket.emit('hello');
socket.on('world', function() {
	// do something
});
```

## API


### emit(event, ...)

  Emit an `event` with variable option args.

```js
socket.emit('topic');
socket.emit('topic', 'message');
```


### on(event, fn)

  Register an `event` handler `fn`.

```js
socket.on('topic', function(msg) {
	// do something 
});
```

### once(event, fn)

  Register a single-shot `event` handler `fnv, removed immediately after it is invoked the first time.

```js
socket.once('topic', function() {
	// do something
});
```

### off(event, fn)

  Pass `event` and `fn` to remove a listener.
  Pass `event` to remove all listeners on that event.
  Pass nothing to remove all listeners on all events.

```js
socket.off('topic');
```


### connect(room)

  Create a data channel on a peer connection.

```js
var io = require('socket');
var peer = require('peer');

var client = peer();
var socket = io(client);
socket.connect('myroom');
```

### use

  public interface to use plugins on the socket peer connection (`socket.peer`).

```js
master.use(function(peer) {
  // do something
});
```


## License

The MIT License (MIT)

Copyright (c) 2014 Olivier Wietrich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.