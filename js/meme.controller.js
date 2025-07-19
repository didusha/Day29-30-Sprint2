'use strict'

var gElCanvas
var gCtx
var gPrevPos

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
}

function renderMeme() {
    const meme = getMeme()

    var img = new Image();
    img.src = `img/gallery/${meme.selectedImgId}.jpg`

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line, idx) => {
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.fillStyle = line.color
            gCtx.textAlign = 'center'
            const diff = checkAlignment(line.alignment)

            gCtx.fillText(line.txt, line.x + diff, line.y)
        })
        if (meme.selectedLineIdx === 0) setTextBorder()
        else {
            setTextBorder()
        }
        const canvasInput = document.querySelector('.canvas-text')
        canvasInput.focus()
        canvasInput.placeholder = meme.lines[meme.selectedLineIdx].txt
    }
}

function setTextBorder() {
    const { selectedLineIdx, lines } = getMeme()
    gCtx.beginPath()
    const line = lines[selectedLineIdx]
    gCtx.strokeStyle = line.color
    gCtx.lineWidth = 2

    //Update font measurments for inc/dec
    gCtx.font = `${line.size}px ${line.font}`;
    const diff = checkAlignment(line.alignment)

    const textMetrics = gCtx.measureText(line.txt)
    const textWidth = textMetrics.width
    const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent
    //Check alignment

    const xStart = line.x + diff - textWidth / 2 - 5
    const xEnd = textWidth + 10
    const yStart = line.y - textMetrics.actualBoundingBoxAscent - 5
    const yEnd = textHeight + 10

    gCtx.strokeRect(xStart, yStart, xEnd, yEnd)
}

function checkAlignment(alignment) {
    let diff
    switch (alignment) {
        case 'left':
            diff = -100
            break
        case 'center':
            diff = 0
            break
        case 'right':
            diff = 100
            break
    }
    return diff
}

function onDeleteSavedMeme(memeId){
    console.log("memeId:", memeId)
    deleteSavedMeme(memeId)
    renderSavedGallery()
}

function onDown(ev) {
    // const pos = getEvPos(ev)
    // if (!isTextclicked(pos)) return
    // // setTextDrag(true)
    // gPrevPos = pos
    // document.body.style.cursor = 'grabbing'
}

function onUp() {

}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the default mouse behavior
        ev.preventDefault()
        // Gets the first touch point (could be multiple in touch event)
        ev = ev.changedTouches[0]
        //  Calculate touch coordinates relative to canvas 
        //  position by subtracting canvas offsets (left and top) from page coordinates
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

//Download image 
function onDownloadImg(elLink) {
    // removeBorders()
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

//Render Gallery
function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    const imgs = getImgs()
    var strGallery = imgs.map(img =>
        `<img src="${img.url}" alt="" onclick="onSelectImg(${img.id})" data-id="${img.id}">`)
    elGallery.innerHTML = strGallery.join('')
}

function renderSavedGallery() {
    const elGallery = document.querySelector('.saved-container')
    var savedMemes = getSavedMemes()
    if (!savedMemes.length) {
        elGallery.innerHTML = '<p>No saved memes yet...</p>'
        return
    }
    const strSaved = savedMemes.map((savedMeme, idx) =>
        `<div class="saved-img-container">
    <img src=${savedMeme.dataURL} alt="" onclick="onSelectImg(${savedMeme.id})" data-id="${savedMeme.id}">
          <button class="btn btn-delete-saved" onclick="onDeleteSavedMeme(${savedMeme.id})">Delete</button>
          </div>`)
    elGallery.innerHTML = strSaved.join('')
}

//DOM
function onGalleryClick() {
    //Show Gallery
    document.querySelector('.gallery-container').classList.remove('hidden')
    document.querySelector('.main-container').classList.add('hidden')
    document.querySelector('.saved-container').classList.add('hidden')
}

function onSavedClick() {
    //Show Gallery
    document.querySelector('.saved-container').classList.remove('hidden')
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.main-container').classList.add('hidden')
    renderSavedGallery()
}

function showEditor() {
    //Show Editor
    document.querySelector('.main-container').classList.remove('hidden')
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.saved-container').classList.add('hidden')
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

