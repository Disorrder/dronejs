const _ = require('lodash');
const robot = require('robot-js');
const keys = require('../keys');

var kb = robot.Keyboard(); // Global multiplatform keyboard
kb.autoDelay.min = kb.autoDelay.max = 0;

var layouts = {
    EN: {
        code: 0x0409,
        locale: "`1234567890-= qwertyuiop[]\\ asdfghjkl;' zxcvbnm,./",
        shift:  '~!@#$%^&*()_+ QWERTYUIOP{}| ASDFGHJKL:" ZXCVBNM<>?'
    },
    RU: {
        code: 0x0419,
        locale: "ё1234567890-= йцукенгшщзхъ\\ фывапролджэ ячсмтиьбю.",
        shift:  'Ё!"№;%:?*()_+ ЙЦУКЕНГШЩЗХЪ/ ФЫВАПРОЛДЖЭ ЯЧСМИТЬБЮ,'
    },
}

class Keyboard {
    constructor() {
        this.delay = 5;
    }

    get ctrl() { return robot.Keyboard.getState(keys['ctrl']); }
    set ctrl(val) { val ? this.keydown('ctrl') : this.keyup('ctrl'); }

    get alt() { return robot.Keyboard.getState(keys['alt']); }
    set alt(val) { val ? this.keydown('alt') : this.keyup('alt'); }

    get shift() { return robot.Keyboard.getState(keys['shift']); }
    set shift(val) { val ? this.keydown('shift') : this.keyup('shift'); }

    get win() { return robot.Keyboard.getState(keys['win']); }
    set win(val) { val ? this.keydown('win') : this.keyup('win'); }
    get system() { return this.win; }
    set system(val) { this.win = val; }

    keydown(key) {
        if (_.isString(key)) key = keys[key];
        if (!key) return;
        kb.press(key);
        if (this.delay) robot.Timer.sleep(this.delay);
    }

    keyup(key) {
        if (_.isString(key)) key = keys[key];
        if (!key) return;
        kb.release(key);
        if (this.delay) robot.Timer.sleep(this.delay);
    }

    /*
     * keyCode - int, string, int[], string[]
     * Example: 0x30, 'enter', 'ctrl a', ['shift', 0x30], 'ctrl+alt-del'
     * holdTime - int. Time to hold all buttons in ms.
     */
    pressKey(key, holdTime) {
        console.log(`KEYPRESS START [${key}]`, _.isNumber(key), _.isString(key));
        var keys;
        if (_.isNumber(key)) keys = [key];
        if (_.isString(key)) {
            keys = _.words(key);
            if (!keys.length) keys = key.split('');
        }

        _.each(keys, (v) => this.keydown(v));
        if (holdTime) au.Sleep(holdTime);
        _.eachRight(keys, (v) => this.keyup(v));
    }

    typeString(string, cpm) {
        if (cpm) {
            var delay = 60*1000 / cpm;
            if (this.delay) delay -= this.delay;
            if (delay < 0) {
                // TODO: warn about min delay of this.delay
                delay = 0;
            }
            console.log('type string with delay', delay, 'ms');
        }

        for (let char of string) {
            console.log(`CHAR [${char}]`);

            this.pressKey(char);
            if (delay) au.Sleep(delay);
        }
    }

    getCharCode(char) {
        let layout, index, shift = false;
        for (let lName in layouts) {
            index = layouts[lName].locale.indexOf(char);
            if (~index) {
                layout = lName;
                break;
            }

            index = layouts[lName].shift.indexOf(char);
            if (~index) {
                layout = lName;
                shift = true;
                break;
            }
        }

        if (~index) char = layouts.EN.locale[index];
        return [keys[char], shift, locale];
    }

    switchLayout(name) {
        if (name === Keyboard.layout) return;
        var index = Keyboard.layoutStack.indexOf(Keyboard.layout);
        var newIndex = name
            ? Keyboard.layoutStack.indexOf(name)
            : (index+1) % Keyboard.layoutStack.length;
        while (index !== newIndex) {
            this.pressKey(Keyboard.switchLayoutButton);
            index++;
            index = index % Keyboard.layoutStack.length;
        }
        Keyboard.layout = Keyboard.layoutStack[newIndex];
    }
}

Keyboard.layout = 'EN';
Keyboard.layoutStack = ['EN', 'RU'];
Keyboard.switchLayoutButton = 'alt shift';

module.exports = Keyboard;
