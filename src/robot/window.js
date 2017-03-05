const _ = require('lodash');
const robot = require('robot-js');
var Window = robot.Window;

Object.defineProperties(Window.prototype, {
    exists: {
        get() { console.log('EXIII'); return this.isValid() }
    },
    hwnd: {
        get() { return this.getHandle() },
        set(val) { this.setHandle(val) }
    },
    pid: {
        get() {
            if (this._pid) return this._pid;
            return this._pid = this.getPID();
        }
    },
    title: {
        get() { return this.getTitle() },
        set(val) { this.setTitle(val) }
    },

    // -- states --
    minimized: {
        get() { return this.isMinimized() },
        set(val) { this.setMinimized(val) }
    },
    maximized: {
        get() { return this.isMaximized() },
        set(val) { this.setMaximized(val) }
    },
    borderless: {
        get() { return this.isBorderless() },
        set(val) { this.setBorderless(val) }
    },

    active: { // not writable
        get() { return Window.getActive().eq(this) },
        // set(val) {  }
    },

    blur: { // TODO?: fix desktop blinking
        value() { Window.setActive(ProgramManager); return this; }
    },
    focus: {
        value() { Window.setActive(this); return this; }
    },

    // -- boundary --
    top: {
        get() { return this.getBounds().y; },
        set(val) { this.setPos({top: val}); }
    },
    left: {
        get() { return this.getBounds().x; },
        set(val) { this.setPos({left: val}); }
    },
    width: {
        get() { return this.getBounds().w; },
        set(val) { this.setPos({width: val}); }
    },
    height: {
        get() { return this.getBounds().h; },
        set(val) { this.setPos({height: val}); }
    },

    // accept pixels, float percents and text["full, half, quarter, left, top, right, bottom, center"]
    setPos: {
        value(left, top, width, height) {
            if (_.isObject(left)) {
                var {left, top, width, height} = left;
            }
            console.log(left, top, width, height);

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
    },

    // -- animations --
    blink: {
        value(times = 3) {
            for (let i = 0; i < times; i++) {
                this.blur();
                robot.Timer.sleep(130);
                this.focus();
                robot.Timer.sleep(130);
            }
            return this;
        }
    },
});

Object.defineProperties(Window, {
    find: {
        value(title) {
            var list = Window.getList(`.*${title}.*`);
            if (list.length > 1) console.warn('API WARN: found more than 1 window with title '+title); // experimantal
            return list[0];
        }
    },
    findByPid: {
        value(pid) {
            return Window.getList().find((v) => v.pid === pid);
        }
    },
    getListByPid: {
        value(pid) {
            return Window.getList().filter((v) => v.pid === pid);
        }
    }
});

const ProgramManager = Window.find('Program Manager');

var q = new Window(200);
console.log(q.exists);

module.exports = Window;
