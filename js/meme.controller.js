'use strict'


function onInit() {
    renderGallery()
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    var strGallery = ''
    for (var i = 0; i < 18; i++) {
        strGallery += `<img src="img/gallery/${i}.jpg" alt="">`
    }
    elGallery.innerHTML = strGallery
}