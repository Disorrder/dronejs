const robotjs = require('robotjs');

class Screen {
    getSize() {
        return robotjs.getScreenSize();
    }

    get width() {
        return robotjs.getScreenSize().width;
    }

    get height() {
        return robotjs.getScreenSize().height;
    }

    capture() { // x, y, width, height
        return robotjs.screen.capture.apply(robotjs.screen, arguments);
    }
}

var screen = new Screen();

module.exports = screen;
