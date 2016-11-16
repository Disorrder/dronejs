const ref = require('ref');
const _ = require('lodash');
const code = require('./apiConst');
const au = require('autoit');
const robotjs = require('robotjs');

var keys = {
    'back':     code.VK_BACKSPACE,
    'enter':    code.VK_RETURN,
    'ctrl':     code.VK_CONTROL,
    'caps':     code.VK_CAPITAL,
    'capslock': code.VK_CAPITAL,
    'esc':      code.VK_ESCAPE,
    ' ':        code.VK_SPACE,
    'pageup':   code.VK_PRIOR,
    'pgup':     code.VK_PRIOR,
    'pagedown': code.VK_NEXT,
    'pgdn':     code.VK_NEXT,
    'printscreen':  code.VK_SNAPSHOT,
    'prtscr':   code.VK_SNAPSHOT,
    'ins':      code.VK_INSERT,
    'del':      code.VK_DELETE,
    'win':      code.VK_LWIN,
    '*':        code.VK_MULTIPLY,
    '+':        code.VK_ADD,
    '|':        code.VK_SEPARATOR,
    '-':        code.VK_SUBTRACT,
    '.':        code.VK_DECIMAL,
    '/':        code.VK_DIVIDE,
    'num':      code.VK_NUMLOCK,
    'lctrl':    code.VK_LCONTROL,
    'rctrl':    code.VK_RCONTROL,
    'lalt':     code.VK_LMENU,
    'ralt':     code.VK_RMENU,
}

for (let key in code) {
    if (key.indexOf('VK_') < 0) continue;
    let keyName = key.substr(3).toLowerCase();
    keys[keyName] = code[key];
}

const EN = "`qwertyuiop[]asdfghjkl;'zxcvbnm,./";
const RU = "ёйцукенгшщзхъфывапролджэячсмитьбю.";

class Keyboard {
    constructor(hwnd) {
        this.hwnd = hwnd;
        this.delay = 10;

        // this._ctrl = false;
        // this._alt = false;
        // this._shift = false;
        // this._win = false;
    }

    get ctrl() { return this._ctrl; }
    set ctrl(val) { val ? this.keydown('ctrl') : this.keyup('ctrl'); }

    get alt() { return this._alt; }
    set ctrl(val) { val ? this.keydown('alt') : this.keyup('alt'); }

    get shift() { return this._shift; }
    set ctrl(val) { val ? this.keydown('shift') : this.keyup('shift'); }

    get win() { return this._win; }
    set ctrl(val) { val ? this.keydown('win') : this.keyup('win'); }

    keydown(keyCode) {
        if (_.isString(keyCode)) keyCode = keys[keyCode];
        ['ctrl', 'alt', 'shift', 'win'].forEach((v) => {
            if (keyCode === keys[v]) this[`_${v}`] = true;
        });
        var lParam = MapVirtualKey(keyCode) << 16 | 1;
        // lParam = 0
        console.log('keydown', keyCode.toString(16), lParam, lParam.toString(2));
        au.PostMessage(this.hwnd, au.WM_KEYDOWN, keyCode, lParam);
        // au.SendMessage(this.hwnd, au.WM_KEYDOWN, keyCode, lParam);
        if (this.delay) au.Sleep(this.delay);
    }

    keyup(keyCode) {
        if (_.isString(keyCode)) keyCode = keys[keyCode];
        ['ctrl', 'alt', 'shift', 'win'].forEach((v) => {
            if (keyCode === keys[v]) this[`_${v}`] = false;
        });
        var bit32 = 0x80000000;
        var lParam = 1 << 30 | MapVirtualKey(keyCode) << 16 | 1;
        lParam += bit32;
        // lParam = 0
        console.log('keyup', keyCode.toString(16), lParam, lParam.toString(2));
        au.PostMessage(this.hwnd, au.WM_KEYUP, keyCode, lParam);
        // au.SendMessage(this.hwnd, au.WM_KEYUP, keyCode, lParam);
        if (this.delay) au.Sleep(this.delay);
    }

    _char(keyCode) {
        if (_.isString(keyCode)) keyCode = keys[keyCode];
        var lParam = 0;
        console.log('char', keyCode.toString(16), lParam, lParam.toString(2));
        au.PostMessage(this.hwnd, au.WM_CHAR, keyCode, lParam);
        // au.SendMessage(this.hwnd, au.WM_KEYUP, keyCode, lParam);
        if (this.delay) au.Sleep(this.delay);
    }

    pressKey(keyCode, modifier, holdTime) {
        this.keydown(keyCode);
        if (holdTime) au.Sleep(holdTime);
        this.keyup(keyCode);
    }

    typeString(string, cpm) {

    }

}

function MapVirtualKey(code, mapType = 0) {
    var ref = require('ref');
    var ffi = require('ffi');

    var user32 = ffi.Library('user32.dll', {
        MapVirtualKeyW: ['uint32', ['uint32', 'uint32']]
    });

    return user32.MapVirtualKeyW(code, mapType);
}


module.exports = Keyboard;
