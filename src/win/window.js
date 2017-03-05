const _ = require('lodash');
const au = require('autoit');
const Window = require('../robot/window');

au.Init();

Object.defineProperties(Window.prototype, {
    getClassList: {
        value() { return au.WinGetClassList(this.hwnd).split('\n') }// .filter((v) => v); }
    },
    getChildren: {
        value() { return Window.EnumChildWindows(this.hwnd); }
    },

    sendMessage: {
        value(message, wParam, lParam) {
            return au.SendMessage(this.hwnd, message, wParam, lParam);
        }
    },
    postMessage: {
        value(message, wParam, lParam) {
            return au.PostMessage(this.hwnd, message, wParam, lParam);
        }
    }
});
// --- state shorthands ---
// get state() { return au.WinGetState(this.hwnd); }
// set state(val) { au.WinSetState(this.hwnd, val); }
//
// get exists() { return this.state & au.WIN_STATE_EXISTS }
// get visible() { return this.state & au.WIN_STATE_VISIBLE }
// get enabled() { return this.state & au.WIN_STATE_ENABLED }
// get active() { return this.state & au.WIN_STATE_ACTIVE }
// get minimized() { return this.state & au.WIN_STATE_MINIMIZED }
// get maximized() { return this.state & au.WIN_STATE_MAXIMIZED }
//
// show() { this.state = au.SW_SHOW; return this; }
// hide() { this.state = au.SW_HIDE; return this; }
//
// minimize() { this.state = au.SW_MINIMIZE; return this; }
// maximize() { this.state = au.SW_MAXIMIZE; return this; }
// restore() { this.state = au.SW_RESTORE; return this; }

Object.defineProperties(Window, {
    getChildren: {
        value(hwnd) {
            return EnumChildWindows(hwnd).map((v) => new Window(v));
        }
    },
    minimizeAll: {
        value() { return au.WinMinimizeAll(); }
    },
    restoreAll: {
        value() { return au.WinMinimizeAllUndo(); }
    }
});


const ref = require('ref');
const ffi = require('ffi');

var voidPtr = ref.refType(ref.types.void);
var user32 = ffi.Library('user32.dll', {
    EnumChildWindows: ['bool', ['int', voidPtr, 'int32']]
});

function EnumChildWindows(hwnd = 0) {
    var handles = [];
    var windowProc = ffi.Callback('bool', ['long', 'int32'], function(hwnd, lParam) {
        handles.push(hwnd);
        return true;
    });

    user32.EnumChildWindows(hwnd, windowProc, 0);
    return handles;
}

module.exports = Window;
