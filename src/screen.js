const au = require('autoit');
const robotjs = require('robotjs');

class Pixel { // ?
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

class Screen {
    getSize() {
        return robotjs.getScreenSize(); // TODO: robot-js
    }

    get width() { return this.getSize().width; }
    get height() { return this.getSize().height; }

    getPixel(x, y) {
        return au.PixelGetColor(x, y);
        // return robotjs.getPixelColor(x, y);
    }

    capture(x, y, width, height) { // return bitmap object
        // return robotjs.screen.capture(x, y, width, height);
    }
}

var screen = new Screen();

module.exports = screen;
