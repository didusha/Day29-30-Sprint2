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

function onAddLine(){
    //TODO: Change TO TAKE FROM INPUTS
    const fontSize = 30
    const color = 'black'
    addLine('Type..', fontSize, color)
    renderMeme()
}

function onDeleteLine(){
    deleteLine()
    renderMeme()
}