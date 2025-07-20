'use strict'

// Add text on Meme
function onDrawText(ev) {
    setLineTxt(ev.target.value)
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

function onSetAlignment(alignment) {
    setAlignment(alignment)
    renderMeme()
}

function onSetFont(font) {
    setFont(font)
    renderMeme()
}

function onChangeTextColor(color) {
    changeTextColor(color)
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

function onSaveMeme() {
    gToRemoveBorders = true
    renderMeme()
    const dataURL = gElCanvas.toDataURL('image/jpeg')
    saveMeme(dataURL)
    document.querySelector('.modal').classList.add('open-modal')
    setTimeout(() => {
        document.querySelector('.modal').classList.remove('open-modal')
    }, 1500);
    gToRemoveBorders = false
}

function onFlexMeme() {
    onSelectImg(getRandomIntInclusive(1, 18))
    const meme = getMeme()
    meme.lines.forEach(line => {
        line.txt = getRandomText()
        line.color = getRandomColor()
        line.size = getRandomIntInclusive(16, 30)
        line.font = getRandomFont()
    })
    renderMeme()
}

//Download image 
function onDownloadImg(elLink) {
    gToRemoveBorders = true
    renderMeme()
    const dataURL = gElCanvas.toDataURL('image/jpeg')
    elLink.href = dataURL
    gToRemoveBorders = false
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