'use strict'

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getRandomText() {
    const txts = ['You Rock!', 'Mood right now', 'Send help pls ', 'Why like this ', 'Absolutely not okay ',
        'Nope nope nope ', 'Zero motivation today ', 'I need sleep ', 'This is fine ', 'Cant even deal ',
        'Me, every time','💤', '🍭', 'My Unicorn🦄', 'Boo👻', '🙈']
    const idx = getRandomIntInclusive(0, 16)
    const txt = txts[idx]
    return txt
}

function getRandomFont() {
    const fonts = ['impact ', 'arial ', 'comic sans ms ', 'courier new ', 'georgia ',
        'times new roman ', 'verdana ', 'tahoma ', 'trebuchet ms ', 'helvetica '
    ]
    const idx = getRandomIntInclusive(0, 11)
    const font = fonts[idx]
    return font
}
