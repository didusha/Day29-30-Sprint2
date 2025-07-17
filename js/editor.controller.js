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

//Download image 
function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

//Upload to cloud
function onShare(ev) {
    const canvasData = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML =
            `<a href="${uploadedImgUrl}">Image Url</a>
            <p>Image url: ${uploadedImgUrl}</p>
            <button class="btn-facebook" target="_blank" onclick="onUploadToFB('${encodedUploadedImgUrl}')">
            Share on Facebook</button>`
    }
    uploadImg(canvasData, onSuccess)
}


//upload to facebook
function onUploadToFB(url) {
    // console.log('url:', url)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}
