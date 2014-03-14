var test = require("tape")

var opentty = require("../index")

test("opentty is a function", function (assert) {
    assert.equal(typeof opentty, "function")
    assert.end()
})


test("opentty creates a TTY readstream", function (assert) {
    var tty = opentty();
    assert.equal(typeof tty.on, "function");
    assert.ok(tty.readable)
    assert.false(tty.writable)
    assert.ok(tty.isTTY)
    assert.end();
})
