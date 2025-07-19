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
    addLine('Type...', 30, 'black')
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
    setFont(value)
    renderMeme()
}

function onChangeTextColor(event) {
    const value = event.target.value
    changeTextColor(value)
    renderMeme()
}

function onAddEmoji(imoji) {
    addImoji(imoji)
    renderMeme()
}

function onMoveText(diff) {
    moveTextUpDown(diff)
    renderMeme()
}

//TODO fix remove border trigger
function onSaveMeme(){
    gToRemoveBorders = true
    renderMeme()
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    saveMeme(imgContent)
    gToRemoveBorders = false
}

function onFlexMeme(){
    onSelectImg(getRandomIntInclusive(1,18))
    const meme = getMeme()
    meme.lines.forEach(line => {
        line.txt = getRandomText()
        line.color = getRandomColor()
        line.size = getRandomIntInclusive(16,30)
        line.font = getRandomFont()
    })
    renderMeme()
}

//Download image 
function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

// Upload to cloud & FB 

function onUploadToFB(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}

function onShare(ev) {

    const canvasData = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        onUploadToFB(encodedUploadedImgUrl)
    }
    uploadImg(canvasData, onSuccess)
    
}
