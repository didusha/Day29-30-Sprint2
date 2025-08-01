'use strict'

var gElCanvas
var gCtx
var gPrevPos
var gIsOpen = false
var gIsMouseDown = false
var gToRemoveBorders = false

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)
}

function onSelectImg(imgId) {
    _createMeme(imgId)
    showEditor()
}

function renderMeme() {
    const meme = getMeme()

    var img = new Image();
    img.src = `img/gallery/${meme.selectedImgId}.jpg`

    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    renderLines(meme)

    if (!gToRemoveBorders) {
        setTextBorder()
    }
    const canvasInput = document.querySelector('.canvas-text')
    canvasInput.focus()
    canvasInput.placeholder = meme.lines[meme.selectedLineIdx].txt
}

function renderLines(meme) {
    meme.lines.forEach((line) => {
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.fillStyle = line.color
        const diff = checkAlignment(line.alignment)
        gCtx.fillText(line.txt, line.x + diff, line.y)
    })
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

    const xStart = line.x + diff - 5
    const xEnd = textWidth + 10
    const yStart = line.y - textMetrics.actualBoundingBoxAscent - 5
    const yEnd = textHeight + 10

    gCtx.strokeRect(xStart, yStart, xEnd, yEnd)
}

function checkAlignment(alignment) {
    let diff
    switch (alignment) {
        case 'left':
            diff = -90
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

function onDeleteSavedMeme(memeId) {
    deleteSavedMeme(memeId)
    renderSavedGallery()
}

function onDown(ev) {
    gIsMouseDown = true
    const pos = getEvPos(ev)
    if (!isTextclicked(pos)) return
    gPrevPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (!gIsMouseDown) return
    const { lines } = getMeme()
    lines.forEach(line => {
        if (!line.isDrag) return
    })
    const pos = getEvPos(ev)
    //* Calculate distance moved from drag start position
    const dx = pos.x - gPrevPos.x
    const dy = pos.y - gPrevPos.y
    setNewLinePos(dx, dy)
    //* Update prev position for next move calculation
    gPrevPos = pos
    //* Redraw the canvas with updated meme position
    renderMeme()
}

function onUp() {
    gIsMouseDown = false
    setIsDrag()
    document.body.style.cursor = 'default'
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
    const dataURL = gElCanvas.toDataURL('image/jpeg')
    elLink.href = dataURL
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
         <img src=${savedMeme.dataURL} alt="" onclick="onSelectSavedMeme(${savedMeme.id})" data-id="${savedMeme.meme}">
          <button class="btn btn-delete-saved" onclick="onDeleteSavedMeme(${savedMeme.id})">Delete</button>
          </div>`)
    elGallery.innerHTML = strSaved.join('')
}

function onSelectSavedMeme(memeId) {
    updateMeme(memeId)
    showEditor()
}

//DOM
function onGalleryClick() {
    //Show Gallery
    document.querySelector('.gallery-wrap').classList.remove('hidden')
    document.querySelector('.editor-wrap').classList.add('hidden')
    document.querySelector('.saved-wrap').classList.add('hidden')
}

function onSavedClick() {
    //Show Gallery
    document.querySelector('.saved-wrap').classList.remove('hidden')
    document.querySelector('.gallery-wrap').classList.add('hidden')
    document.querySelector('.editor-wrap').classList.add('hidden')
    renderSavedGallery()
}

function showEditor() {
    //Show Editor
    document.querySelector('.editor-wrap').classList.remove('hidden')
    document.querySelector('.gallery-wrap').classList.add('hidden')
    document.querySelector('.saved-wrap').classList.add('hidden')
    renderMeme()
}

function onToggleMenu() {
    gIsOpen = !gIsOpen
    document.querySelector('.nav-bar').classList.toggle('menu-open')
    if (gIsOpen) document.querySelector('.btn-toggle-menu').innerHTML = 'X'
    else document.querySelector('.btn-toggle-menu').innerHTML = '☰'
}

//TODO fix functions
// Upload image -  next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    const reader = new FileReader()

    reader.onload = (event) => {
        _createImg(event.target.result)
        const img = new Image()
        img.src = event.target.result
        img.onload = () => {
            onImageReady(img)
        }
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(elImg) {
    renderGallery()
}

//Change language
function onChangeLang(elSelect) {
    const lang = elSelect.value
    if (lang === 'heb') window.location.href = 'index-heb.html'
    else if (lang === 'eng') window.location.href = 'index.html'
}
