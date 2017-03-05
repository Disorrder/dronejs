const robot = require('robot-js');
var Window = require('../src/robot/window');
const keys = require('../src/keys');
const Keyboard = require('../src/robot/keyboard');

function run() {
    // -- mouse --
    // var mouse = robot.Mouse();
    // console.log(mouse);
    // var pos = robot.Mouse.getPos();
    // console.log(pos);
    // robot.Mouse.setPos(pos.sub(50));

    // -- window --
    // if (Window.isAxEnabled()) {
    //     var list = robot.Window.getList();
    //     list = list.map((v)=>v.title)
    //     console.log(list);
    //
    //     var wnd = _Window.getActive();
    //     console.log(wnd, wnd.active, wnd.getClassList());
    //     wnd.blink();
    //     // wnd.blur(); wnd.focus();
    // } else {
    //     console.log('Ax is not enabled :((');
    // }

    // console.log(keys);
    var kb = new Keyboard();
    console.log(kb);
    kb.typeString('qwe')

}

module.exports = {
    run,
};
