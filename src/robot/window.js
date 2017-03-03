var robot = require('robot-js');

class Window extends robot.Window {
    constructor(hwnd) {
        super(hwnd);
        this.lol = 234
        if (!robot.Window.isAxEnabled()) return console.warn('RUNTIME WARNING: OS X windows is not accessible')
        if (!this.exists) console.warn(`RUNTIME WARNING: window with handle ${hwnd} is not exists`); // may be throw
    }

    get exists() { console.log('EXIII'); return this.isValid() }

    get hwnd() { return this.getHandle() }
    set hwnd(val) { this.setHandle(val) }

    get pid() {
        if (this._pid) return this._pid;
        return this._pid = this.getPID();
    }

    get title() { return this.getTitle() }
    set title(val) { this.setTitle(val) }

    // -- states --
    get minimized() { return this.isMinimized() }
    set minimized(val) { this.setMinimized(val) }

    get maximized() { return this.isMaximized() }
    set maximized(val) { this.setMaximized(val) }

    // -- boundary --
    get top() { return this.getBounds().y; }
    set top(val) { this.setPos({top: val}); }

    get left() { return this.getBounds().x; }
    set left(val) { this.setPos({left: val}); }

    get width() { return this.getBounds().w; }
    set width(val) { this.setPos({width: val}); }

    get height() { return this.getBounds().h; }
    set height(val) { this.setPos({height: val}); }

    // accept pixels, float percents and text["full, half, quarter, left, top, right, bottom, center"]
    setPos(left, top, width, height) {
        if (_.isObject(left)) {
            // var {left, top, width, height} = left;
        }
        // console.log(left, top, width, height);

        var screen = robot.Screen.getMain();
        var {x: screenWidth, y: screenHeight} = screen.getUsable();

        var bounds = this.getBounds();
        if (!top && top !== 0) top = bounds.y;
        if (!left && left !== 0) left = bounds.x;
        if (!width && width !== 0) width = bounds.w;
        if (!height && height !== 0) height = bounds.h;

        if (width === 'full') width = screenWidth;
        if (height === 'full') height = screenHeight;

        [left, top, width, height] = [left, top, width, height].map((v) => {
            if (v === 'half') return 1/2;
            if (v === 'quarter') return 1/4;
            if (_.isString(v) && v.indexOf('%')) return parseInt(v) / 100;
            return v;
        });

        [left, width] = [left, width].map((v) => {
            if ( 0 < v && v < 1) return v * screenWidth;
            return v;
        });
        [top, height] = [top, height].map((v) => {
            if ( 0 < v && v < 1) return v * screenHeight;
            return v;
        });

        if (left === 'center') left = (screenWidth - width) / 2;
        if (top === 'center') top = (screenHeight - height) / 2;

        this.setBounds(left, top, width, height);
    }
}

robot.Window.prototype.w = function(){}

var q = new Window(200);
console.log(q.q, q.w, Window.prototype.q, q instanceof Window);

console.log(Object.getOwnPropertyDescriptor(q, 'q'));

module.exports = Window;
