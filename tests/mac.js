const robot = require('robot-js');
var Window = require('../src/robot/window');
var _Window = require('../src/win/window');

function run() {
    // -- mouse --
    // var mouse = robot.Mouse();
    // console.log(mouse);
    // var pos = robot.Mouse.getPos();
    // console.log(pos);
    // robot.Mouse.setPos(pos.sub(50));

    // -- window --
    if (Window.isAxEnabled()) {
        var list = robot.Window.getList();
        list = list.map((v)=>v.title)
        console.log(list);

        var wnd = _Window.getActive();
        console.log(wnd, wnd.active, wnd.getClassList());
        wnd.blink();
        // wnd.blur(); wnd.focus();
    } else {
        // console.log('Ax is not enabled :((');
    }

    // -- win2 --
    var wnd = new Window(100);
    // console.log(wnd instanceof Window, wnd instanceof robot.Window);
    // console.log(wnd, 'YOEE', Window.prototype, Window.prototype.q);
    // console.log(wnd.height, wnd.getBounds(), wnd.setPos, wnd.q);
    // wnd.setPos({left: 'half', 'top': 0.5});
}

module.exports = {
    run,
};
