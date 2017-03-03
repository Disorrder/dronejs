if (process.platform == 'win32') {
    module.exports = {
        Window: require('./win/window'),
        Keyboard: require('./win/keyboard'),
    };
} else {
    module.exports = {
        Window: require('./robot/window'),
        Keyboard: require('./robot/keyboard'),
    };
}

// Object.assign(module.exports, {
//     Screen: require('./robot/screen'),
//     Memory: require('./robot/memory'),
// })
