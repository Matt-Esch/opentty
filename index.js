var fs = require('fs');
var process = require('process');
var ReadStream = require('tty').ReadStream;

var _fs = process.binding('fs');
var _constants = process.binding('constants');
var _TTY = process.binding('tty_wrap').TTY;

module.exports = openTTY;

var rs = null;

function openTTY() {
    var fd;

    if (rs && rs.isTTY) {
        return rs;
    }

    if (process.platform === 'win32') {
        fd = _fs.open('CONIN$', _constants.O_RDWR, 438);
    } else {
        fd = fs.openSync('/dev/tty', 'r');
    }

    var tty = new _TTY(fd, true);
    tty.setRawMode(true);

    if (process.stdin.isTTY) {
        rs = process.stdin;
    } else {
        rs = new ReadStream(fd);
    }

    rs.resume();
    return rs;
}
