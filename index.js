var fs = require('fs');
var ReadStream = require('tty').ReadStream;

var _fs = process.binding('fs');
var _constants = process.binding('constants');
var _TTY = process.binding('tty_wrap').TTY;

module.exports = openTTY;

var rs = null;

function openTTY() {
    var fd;

    if (rs) {
        rs.setRawMode(true);
        return rs;
    }

    if (process.platform === 'win32') {
        fd = _fs.open('CONIN$', _constants.O_RDWR, 438);
    } else {
        fd = fs.openSync('/dev/tty', 'r');
    }

    if (!fd) {
        throw new Error('Cannot access console input buffer');
    }

    var tty = new _TTY(fd, true);
    tty.setRawMode(true);

    if (process.stdin.isTTY) {
        return rs = process.stdin;
    } else {
        return rs || (rs = new ReadStream(fd));
    }

    return rs;
}
