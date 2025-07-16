'use strict'

var gElCanvas
var gCtx


function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)
}

// Render Meme
function onSelectImg(imgId) {
    showEditor()
    // const imgId = ImgId
    const meme = createMeme(imgId)
    // renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    console.log("🚀 ~ renderMeme ~ meme:", meme)

    var elImg = new Image();
    elImg.src = `img/gallery/${meme.selectedImgId}.jpg`

    // gElCanvas.height = (gElImg.naturalHeight / gElImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    meme.lines.forEach((line, idx) => {
        gCtx.font = line.size + 'px Ariel'
        gCtx.fillStyle = line.color
        gCtx.textAlign = 'center'
        gCtx.fillText = (line.txt, line.x, line.y)
    })
}

// Text on Meme
// function drawText({ offsetX = 100, offsetY=100 }) {
//     const elTextInput = document.querySelector('.canvas-text')
//     const text = elTextInput.value || 'You Rock!!'
//     // const text = 'You Rock!!'
//     gCtx.lineWidth = 2
//     gCtx.strokeStyle = 'black'
//     gCtx.fillStyle = 'yellow'
//     gCtx.font = '40px Arial'
//     gCtx.textAlign = 'center'
//     gCtx.textBaseline = 'middle'
//     gCtx.fillText(text, offsetX, offsetY)
//     gCtx.strokeText(text, offsetX, offsetY)

// }

//Resize Canvas
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    // var meme = getMeme()
    // renderMeme(meme)
}

//Render Gallery
function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    const imgs = getImgs()
    var strGallery = imgs.map(img =>
        `<img src="${img.url}" alt="" onclick="onSelectImg(${img.id})" data-id="${img.i}">`)
    elGallery.innerHTML = strGallery.join('')
}

//Download image 
function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

// Upload to cloud & FB
function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    // After a successful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        // console.log('uploadedImgUrl:', uploadedImgUrl)
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a href="${uploadedImgUrl}">Image Url</a>
        <p>Image url: ${uploadedImgUrl}</p>
        
        <button class="btn-facebook" target="_blank" onclick="onUploadToFB('${encodedUploadedImgUrl}')">
        Share on Facebook  
        </button>
        `
    }
    uploadImg(canvasData, onSuccess)
}

function onUploadToFB(url) {
    // console.log('url:', url)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}

//DOM
function onGalleryClick() {
    // Show Gallery
    document.querySelector('.gallery-container').classList.add('grid')
    document.querySelector('.gallery-container').classList.remove('hidden')
    // Hide Editor
    document.querySelector('.main-container').classList.remove('grid')
    document.querySelector('.main-container').classList.add('hidden')
}

function showEditor() {
    // Show Editor
    // document.querySelector('.main-container').classList.add('grid')
    document.querySelector('.main-container').classList.remove('hidden')
    // document.querySelector('canvas').width = 400
    // document.querySelector('canvas').height = 400
    // Hide Gallery
    document.querySelector('.gallery-container').classList.add('hidden')
    // document.querySelector('.gallery-container').classList.remove('grid')
    renderMeme()
}

//clear Canvas
// function onClearCanvas() {
//     gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
// }