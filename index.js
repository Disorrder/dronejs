const fs = require('fs');
const path = require('path');
const au = require('autoit');
const robotjs = require('robotjs');
const screen = require('./src/screen');
const Window = require('./src/window');

// --- tests init ---
var tmpDir = './.tmp';
try {
    fs.mkdirSync(tmpDir);
} catch (e) {}

// --- tests here ---
console.log('screen size:', screen.width, screen.height);

var pid = Window.open('notepad.exe');
console.log('pid', pid);
au.Sleep(500);
var wnd = Window.findByPid(pid);
console.log(wnd.title);
wnd.setPos(0, 0, 300, 300);
// wnd.hide().show().blur().focus()//.minimize().kill();
// robotjs.typeStringDelayed('Bitch, why you cant write russian?!\n', 600)
// robotjs.typeStringDelayed('АБЫРВАЛГ', 600)
wnd.kill();
