const child_process = require('child_process');
const _ = require('lodash');
const au = require('autoit');
const robotjs = require('robotjs');
const apiConst = require('./win/apiConst');

au.Init();

class Window {
    constructor(hwnd) {
        this.hwnd = hwnd;
        if (!this.exists) console.warn(`RUNTIME WARNING: window with handle ${hwnd} is not exists`); // may be throw
    }

    get pid() {
        return this._pid || this._pid = au.WinGetProcess(this.hwnd);
    }

    get title() {
        return au.WinGetTitle(this.hwnd);
    }
    set title(val) {
        au.WinSetTitle(this.hwnd, val);
    }

    getClassList() {
        return au.WinGetClassList(this.hwnd).split('\n').filter((v) => v);
    }

    getChildren() {
        return Window.EnumWindows(this.hwnd);
    }

    // --- size and position shorthands ---
    getPos() {
        var {left, top, right, bottom} = au.WinGetPos(this.hwnd);
        var width = right - left;
        var height = bottom - top;
        return {left, top, width, height};
    }
    setPos(left, top, width, height) { // accept pixels, float percents and text["full, half, quarter, left, top, right, bottom, center"]
        if (_.isObject(left)) {
            {left, top, width, height} = left;
        }

        var {width: screenWidth, height: screenHeight} = robotjs.getScreenSize(); // TODO: robot-js

        if (!top && top !== 0) top = this.top;
        if (!left && left !== 0) left = this.left;
        if (!width && width !== 0) width = this.width;
        if (!height && height !== 0) height = this.height;

        if (width === 'full') width = screenWidth;
        if (height === 'full') height = screenHeight;
        [width, height].forEach((v) => {
            if (v === 1) console.warn('API WARNING: If you set size to 1, it means 1px, but not 100%. To set 100% width or height use "full".');
        });

        [left, top, width, height] = [left, top, width, height].map((v) => {
            if (v === 'half') return 1/2;
            if (v === 'quarter') return 1/4;
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

        if (left === 'center') left = (screenWidth - (width || this.width)) / 2;
        if (top === 'center') top = (screenHeight - (height || this.height)) / 2;

        return au.WinMove(this.hwnd, left, top, width, height);
    }

    get top() { return this.getPos().top; }
    set top(val) { this.setPos({top: val}); }

    get left() { return this.getPos().left; }
    set left(val) { this.setPos({left: val}); }

    get width() { return this.getPos().width; }
    set width(val) { this.setPos({width: val}); }

    get height() { return this.getPos().height; }
    set height(val) { this.setPos({height: val}); }

    // --- abstract functions ---
    sendMessage(message, wParam, lParam) {
        return au.SendMessage(this.hwnd, message, wParam, lParam);
    }

    postMessage(message, wParam, lParam) {
        return au.PostMessage(this.hwnd, message, wParam, lParam);
    }

    // --- state shorthands ---
    get state() { return au.WinGetState(this.hwnd); }
    set state(val) { au.WinSetState(this.hwnd, val); }

    get exists() { return this.state & au.WIN_STATE_EXISTS }
    get visible() { return this.state & au.WIN_STATE_VISIBLE }
    get enabled() { return this.state & au.WIN_STATE_ENABLED }
    get active() { return this.state & au.WIN_STATE_ACTIVE }
    get minimized() { return this.state & au.WIN_STATE_MINIMIZED }
    get maximized() { return this.state & au.WIN_STATE_MAXIMIZED }

    show() { this.state = au.SW_SHOW; return this; }
    hide() { this.state = au.SW_HIDE; return this; }

    minimize() { this.state = au.SW_MINIMIZE; return this; }
    maximize() { this.state = au.SW_MAXIMIZE; return this; }
    restore() { this.state = au.SW_RESTORE; return this; }

    blur() { au.WinActivate('Program Manager'); return this; } // TODO: fix desktop blinking
    focus() { au.WinActivate(this.hwnd); return this; }
    // ---

    kill() { return au.WinKill(this.hwnd); }

    capture() {
        // TODO make bitmap of window
        // use PrintWindow of user32.dll
    }

    static minimizeAll() {
        return au.WinMinimizeAll();
    }
    static restoreAll() {
        return au.WinMinimizeAllUndo();
    }

    static open(name, time) {
        // var process = child_process.exec(name); // Idk why this return pid of cmd...
        return au.Run(name, time);
    }

    static find(id, text) { // The title/hWnd/class of the window
        var hwnd = au.WinGetHandle(id);
        if (!hwnd) return;
        return new Window(hwnd);
    }

    static findByPid(pid) { // return first window example if several was found
        var handles = Window.getHandlesByPid(pid);
        var hwnd = handles[0];
        if (!hwnd) return;
        return new Window(hwnd);
    }

    static getHandlesByPid(pid) {
        return enumWindows().filter((hwnd) => {
            let _pid = au.WinGetProcess(hwnd);
            return _pid === pid;
        });
    }

    static EnumWindows(hwnd) {
        return enumWindows(hwnd).map((hwnd) => {
            return {
                hwnd,
                pid: au.WinGetProcess(hwnd),
                title: au.WinGetTitle(hwnd),
                classList: au.WinGetClassList(hwnd).split('\n').filter((v) => v) // idk why not working
            }
        });
    }
}

function enumWindows(hwnd = null) {
    var ref = require('ref');
    var ffi = require('ffi');

    var voidPtr = ref.refType(ref.types.void);
    var handles = [];

    var user32 = ffi.Library('user32.dll', {
        EnumChildWindows: ['bool', ['int', voidPtr, 'int32']]
    });

    var windowProc = ffi.Callback('bool', ['long', 'int32'], function(hwnd, lParam) {
        handles.push(hwnd | 0);
        return true;
    });

    user32.EnumChildWindows(hwnd, windowProc, 0);
    return handles;
}

module.exports = Window;
