const au = require('autoit');

var $ = {};

$.WIN_STATE_EXISTS    = 0b000001;
$.WIN_STATE_VISIBLE   = 0b000010;
$.WIN_STATE_ENABLED   = 0b000100;
$.WIN_STATE_ACTIVE    = 0b001000;
$.WIN_STATE_MINIMIZED = 0b010000;
$.WIN_STATE_MAXIMIZED = 0b100000;

$.SW_HIDE            = 0;
$.SW_SHOWNORMAL      = 1;
$.SW_SHOWMINIMIZED   = 2;
$.SW_SHOWMAXIMIZED   = 3;
$.SW_SHOWNOACTIVATE  = 4;
$.SW_SHOW            = 5;
$.SW_MINIMIZE        = 6;
$.SW_SHOWMINNOACTIVE = 7;
$.SW_SHOWNA          = 8;
$.SW_RESTORE         = 9;
$.SW_SHOWDEFAULT     = 10;
$.SW_FORCEMINIMIZE   = 11;

module.exports = $;
Object.assign(au, $)
