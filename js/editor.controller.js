'use strict'


// Add text on Meme
function onDrawText(ev) {
    setLineTxt(ev)
    renderMeme()
}

// Editor buttons functions
function onSwitchLine() {
    switchLine() = m,
        renderMeme()
}

function onAddLine() {
    //TODO: Change TO TAKE FROM INPUTS
    const fontSize = 30
    const color = 'black'
    addLine('Type..', fontSize, color)
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}

function onSetAlignment(alignDirection) {
    setAlignment(alignDirection)
    renderMeme()
}

function onSetFont(elInput) {
    let value = elInput.value
    onSetFont(value)
    renderMeme()
}
