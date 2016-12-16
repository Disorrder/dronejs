const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const au = require('autoit');
const robotjs = require('robotjs');
const screen = require('./src/screen');
const Window = require('./src/window');
const Keyboard = require('./src/keyboard');

// --- tests init ---
var tmpDir = './.tmp';
try {
    fs.mkdirSync(tmpDir);
} catch (e) {}

// --- tests here ---
console.log('screen size:', screen.width, screen.height);

var wnd = Window.find('Безымянный');
if (!wnd) {
    var pid = Window.open('notepad.exe');
    console.log('pid', pid);
    au.Sleep(500);
    wnd = Window.findByPid(pid);
}

console.log(wnd.title);
// wnd.setPos(0, 0, 300, 300);
// wnd.hide().show().blur().focus()//.minimize().kill();
// robotjs.typeStringDelayed('Bitch, why you cant write russian?!\n', 600)
// robotjs.typeStringDelayed('АБЫРВАЛГ', 600)

// var kb = new Keyboard(wnd.hwnd);
var kb = new Keyboard(wnd.getChildren()[0].hwnd);
kb.keydown('b');
au.Sleep(777)
kb.keyup('b');
kb.pressKey('c');
kb._char('d');

console.log('classes:', wnd.getClassList());
console.log(wnd.getChildren());

kb._char('q')

return;
kb.pressKey('enter');
kb.typeString('hello world', 500);
kb.pressKey('enter');

// --- key codes test ---
const code = require('./src/apiConst');
var keys = _(code)
    .map((v, k) => {
        if (k.indexOf('VK_') < 0) return;
        if (k.length <= 4) return;
        return {
            code: v,
            codeName: k
        }
    })
    .compact()
    .value()
;

// console.log('KEYS', keys);
for (let i=0; i < 0x100; i++) {
    let key = _.find(keys, {code: i});
    if (key) continue;
    kb.typeString(`0x${i.toString(16)}- `)
    kb.pressKey(i);
    kb.pressKey(['shift', i]);
    kb.pressKey(['ctrl', i]);
    kb.pressKey('enter');
}

// wnd.kill();
