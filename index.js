var fs = require('fs');
var process = require('process');
var ReadStream = require('tty').ReadStream;

var _fs = process.binding('fs');
var _constants = process.binding('constants');
var _TTY = process.binding('tty_wrap').TTY;

module.exports = openTTY;

var rs = null;

var rawConsole_native = null
var rawConsole


if (process.platform === 'win32') {
    rawConsole_native = require('./bin/opentty.node').console;
    rawConsole = rawConsole_win32;
} else {
    rawConsole = rawConsole_unix;
}

function openTTY() {
    if (rs && rs.isTTY) {
        return rs;
    }

    var fd = rawConsole();

    if (process.stdin.isTTY) {
        rs = process.stdin;
    } else {
        rs = new ReadStream(fd);
    }

    return rs;
}

function rawConsole_win32() {
    var fd

    try {
        fd = _fs.open('CONIN$', _constants.O_RDWR, 438);
        var tty = new _TTY(fd, true);
        tty.setRawMode(true);
    } catch (e) {
        fd = rawConsole_native();
    }

    return fd;
}

function rawConsole_unix() {
    var fd = fs.openSync('/dev/tty', 'r');
    var tty = new _TTY(fd, true);
    tty.setRawMode(true);
    return fd;
}
