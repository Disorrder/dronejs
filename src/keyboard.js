const WinKeyboard = require('./win/WinKeyboard');

class Keyboard extends WinKeyboard {

}

module.exports = Keyboard;
module.exports.keyCodes = WinKeyboard.keyCodes;
