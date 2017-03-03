const winTest = require('./win');
var wnd = winTest.getWindow();

function run() {
    // --- key codes test ---
    const code = require('./src/apiConst');
    var keys = _(code)
        .map((v, k) => {
            if (k.indexOf('VK_') < 0) return;
            if (k.length <= 4) return;
            return {
                code: v,
                codeName: k
            }
        })
        .compact()
        .value()
    ;

    // console.log('KEYS', keys);
    for (let i=0; i < 0x100; i++) {
        let key = _.find(keys, {code: i});
        if (key) continue;
        kb.typeString(`0x${i.toString(16)}- `)
        kb.pressKey(i);
        kb.pressKey(['shift', i]);
        kb.pressKey(['ctrl', i]);
        kb.pressKey('enter');
    }
}

module.exports = {
    run,
};
