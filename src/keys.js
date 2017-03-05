const robot = require('robot-js');
const code = require('./win/apiConst');

var keys = {
    'back':     code.VK_BACKSPACE, // does it mean browser back?
    'enter':    code.VK_RETURN,
    '\n':       code.VK_RETURN,
    'ctrl':     code.VK_CONTROL,
    'caps':     code.VK_CAPITAL,
    'capslock': code.VK_CAPITAL,
    'esc':      code.VK_ESCAPE,
    ' ':        code.VK_SPACE,
    'pageup':   code.VK_PRIOR,
    'pgup':     code.VK_PRIOR,
    'pagedown': code.VK_NEXT,
    'pgdn':     code.VK_NEXT,
    'printscreen':  code.VK_SNAPSHOT,
    'prtscr':   code.VK_SNAPSHOT,
    'ins':      code.VK_INSERT,
    'del':      code.VK_DELETE,
    'win':      code.VK_LWIN,
    '*':        code.VK_MULTIPLY,
    '+':        code.VK_ADD,
    '|':        code.VK_SEPARATOR,
    '-':        code.VK_SUBTRACT,
    '.':        code.VK_DECIMAL,
    '/':        code.VK_DIVIDE,
    'num':      code.VK_NUMLOCK,
    'lctrl':    code.VK_LCONTROL,
    'rctrl':    code.VK_RCONTROL,
    'lalt':     code.VK_LMENU,
    'ralt':     code.VK_RMENU,

    '=':        robot.KEY_EQUAL,
    '(':        robot.KEY_LBRACKET,
    ')':        robot.KEY_RBRACKET,
    '\\':       robot.KEY_BACKSLASH,
    ';':        robot.KEY_SEMICOLON,
    '"':        robot.KEY_QUOTE,
    ',':        robot.KEY_COMMA,
    '~':        robot.KEY_PERIOD,
}

for (let k in robot) {
    if (k.indexOf('KEY_') === 0) {
        let name = k.substr(4).toLowerCase();
        if (name in keys) continue;
        keys[name] = robot[k];
    }
}

for (let k in code) {
    if (k.indexOf('VK_') === 0) {
        let name = k.substr(3).toLowerCase();
        if (name in keys) continue;
        keys[name] = code[k];
    }
}

module.exports = keys;
