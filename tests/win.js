const au = require('autoit');
const screen = require('./src/screen');
const Window = require('./src/window');
const Keyboard = require('./src/keyboard');

function getWindow() {
    var wnd = Window.find('Безымянный');
    if (!wnd) {
        var pid = Window.open('notepad.exe');
        console.log('pid', pid);
        au.Sleep(500);
        wnd = Window.findByPid(pid);
    }
    return wnd;
}

function run() {
    console.log('screen size:', screen.width, screen.height);

    var wnd = getWindow();
    console.log(wnd.title);
    console.log('wnd classes:', wnd.getClassList());
    console.log('wnd children:', wnd.getChildren());

    var kb = new Keyboard(wnd.getChildren()[0].hwnd);
    kb.keydown('a');
    au.Sleep(777)
    kb.keyup('a');
    kb.pressKey('b');
    kb._char('c');

    kb.pressKey('enter');
    kb.typeString('hello world', 500);
    kb.pressKey('enter');

    // wnd.setPos(0, 0, 300, 300);
    // wnd.hide().show().blur().focus()//.minimize().kill();
    // wnd.kill();
}

module.exports = {
    run,
    getWindow,
}
