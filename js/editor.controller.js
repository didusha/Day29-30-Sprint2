'use strict'


// Add text on Meme
function onDrawText(ev) {
    setLineTxt(ev)
    renderMeme()
}

// Editor buttons functions
function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onAddLine() {
    addLine('Type something..', 30, 'black')
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
    //TODO check this function
    let value = elInput.value
    setFont(value)
    renderMeme()
}

function onChangeTextColor(event){
    const value = event.target.value
    changeTextColor(value)
    renderMeme()
}