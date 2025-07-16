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
    createMeme(imgId)
    showEditor()
    // renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    console.log("🚀 ~ renderMeme ~ meme:", meme)

    var img = new Image();
    img.src = `img/gallery/${meme.selectedImgId}.jpg`

    // gElCanvas.height = (gElImg.naturalHeight / gElImg.naturalWidth) * gElCanvas.width
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line, idx) => {
            gCtx.font = line.size + 'px Arial'
            gCtx.fillStyle = line.color
            gCtx.textAlign = 'center'
            gCtx.fillText(line.txt, line.x, line.y)
        })
    }

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

//Render Gallery
function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    const imgs = getImgs()
    var strGallery = imgs.map(img =>
        `<img src="${img.url}" alt="" onclick="onSelectImg(${img.id})" data-id="${img.id}">`)
    elGallery.innerHTML = strGallery.join('')
}

//DOM
function onGalleryClick() {
    // Show Gallery
    // document.querySelector('.gallery-container').classList.add('grid')
    document.querySelector('.gallery-container').classList.remove('hidden')
    // Hide Editor
    // document.querySelector('.main-container').classList.remove('grid')
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

//Resize Canvas
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    // var meme = getMeme()
    // renderMeme(meme)
}

//clear Canvas
// function onClearCanvas() {
//     gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
// }

// Add text on Meme
function onDrawText(ev) {
    setLineTxt(ev)
    renderMeme()
}