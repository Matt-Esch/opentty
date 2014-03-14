# opentty

Get TTY read access

## Example

```js
var opentty = require("opentty")

var tty = opentty();

// quit on Q pressed
tty.on('data', function (d) {
    for (var i = 0; i < d.length; d++) {
        if (d[i] === 0x71) {
            return process.exit();
        }
    }
});
```

## Installation

`npm install opentty`

## Contributors

 - Matt Esch

## MIT Licenced
