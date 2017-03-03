const code = require('./apiConst');

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
}

for (let key in code) {
    if (key.indexOf('VK_') < 0) continue;
    let keyName = key.substr(3).toLowerCase();
    keys[keyName] = code[key];
}

module.exports = keys;
