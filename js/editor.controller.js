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

function onAddEmoji(imoji){
    addImoji(imoji)
    renderMeme()
}

function onMoveText(diff){
    moveTextUpDown(diff)
    renderMeme()
}

//Download image 
function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

//Upload to cloud
async function uploadImg(imgData, onSuccess) {
    const CLOUD_NAME = 'webify'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify')
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err)
    }
}

//upload to facebook
function onUploadToFB(url) {
    // console.log('url:', url)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}

