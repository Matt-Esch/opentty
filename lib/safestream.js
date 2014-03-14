var net = require('net');

module.exports = ReadStream

function ReadStream(fd, tty) {
    if (!(this instanceof ReadStream))
      return new ReadStream(fd, options);

    net.Socket.call(this, {
        highWaterMark: 0,
        readable: true,
        writable: false,
        handle: tty
    });

    this.isRaw = false;
    this.isTTY = true;
}
