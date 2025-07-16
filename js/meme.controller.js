'use strict'

var gElCanvas
var gCtx
var gElImg

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    var strGallery = ''
    for (var i = 1; i <= 6; i++) {
        strGallery += `<img src="img/gallery/${i}.jpg" alt="" onclick="onSelectImg(this)">`
    }
    elGallery.innerHTML = strGallery
}

function onSelectImg(elImg) {
    showEditor()
    gElImg = elImg
    coverCanvasWithImg(elImg)
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    //* Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth * 0.7
    coverCanvasWithImg(gElImg)
}

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
    document.querySelector('.main-container').classList.add('grid')
    document.querySelector('.main-container').classList.remove('hidden')
    document.querySelector('canvas').width = 400
    document.querySelector('canvas').height = 400
    // Hide Gallery
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.gallery-container').classList.remove('grid')
}