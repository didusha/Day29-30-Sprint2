'use strict'

const IMG_KEY = 'imgDB'
const TEST = 'test'
const MEME_KEY = 'memeDB'
const SAVED_MEME_KEY = 'savedMemesDB'


var gImgs
var gMeme
var gSavedMemes
var gmemeId = 100
var gImgId = 20
_createImgs()
_loadsavedMemes()


var gKeywordSearchCountMap = {
    'funny': 12,
    'cat': 16,
    'baby': 2
}

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function getSavedMemes() {
    return gSavedMemes
}

function setLineTxt(ev) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.txt = ev.target.value
}

function setFont(value) {
    gMeme.lines[gMeme.selectedLineIdx].font = value
}

function changeTextColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].color = value
}

function switchLine() {
    let { selectedLineIdx, lines } = gMeme
    selectedLineIdx < lines.length - 1 ? gMeme.selectedLineIdx += 1 : gMeme.selectedLineIdx = 0
}

function addLine(txt, size, color) {
    const line = _createLine(txt, size, color)
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(lineIdx, 1)
}

function updateMeme(memeId) {
    console.log("memeId:", memeId)
    const meme = gSavedMemes.find(savedMeme => savedMeme.id === memeId)
    gMeme = meme.meme
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function setAlignment(alignDirection) {
    gMeme.lines[gMeme.selectedLineIdx].alignment = alignDirection
}

function addImoji(imoji) {
    addLine(imoji, 30, 'black')
}

function moveTextUpDown(diff) {
    gMeme.lines[gMeme.selectedLineIdx].y += diff
}

//Create functions
function _createImgs() {
    gImgs = loadFromStorage(IMG_KEY, gImgs)
    if (!gImgs || !gImgs.length) {
        gImgs = []
        for (var i = 1; i <= 18; i++) {
            gImgs.push(
                _createImg(
                    i,
                    `img/gallery/${i}.jpg`,
                    []
                )
            )
        }
        saveToStorage(IMG_KEY, gImgs)
    }
}

function _createImg(url, keywords) {
    const img = {
        id: gImgId++,
        url,
        keywords: addKeywords() ,
    }
    gImgs.push(img)
    return img
}

function createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'YOU ROCK!',
                size: 15,
                color: 'black',
                x: 100,
                y: 50,
                alignment: 'center',
                font: 'arial',
                isDrag: false
            },
            {
                txt: 'YOU WEIRD!',
                size: 15,
                color: 'black',
                x: 100,
                y: 250,
                alignment: 'center',
                font: 'arial',
                isDrag: false
            }
        ]
    }
    saveToStorage(MEME_KEY, gMeme)
    return gMeme
}

function _createLine(txt, size = 15, color, font) {
    return {
        txt: txt,
        size: size,
        color: color,
        x: 150,
        y: 150,
        alignment: 'center',
        font: 'arial',
    }

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


//Save memes to storage
function saveMeme(imgContent) {
    if (!gSavedMemes || !gSavedMemes.length) gSavedMemes = []
    const memeToSave = {
        id: gmemeId++,
        dataURL: imgContent,
        meme: gMeme
    }
    gSavedMemes.push(memeToSave)
    saveToStorage(SAVED_MEME_KEY, gSavedMemes)
}

function _loadsavedMemes() {
    gSavedMemes = loadFromStorage(SAVED_MEME_KEY, gSavedMemes)
}

function deleteSavedMeme(memeId) {
    const idx = gSavedMemes.findIndex(savedMeme => savedMeme.id === memeId)
    gSavedMemes.splice(idx, 1)
    saveToStorage(SAVED_MEME_KEY, gSavedMemes)
}

//Drag & Drop
function isTextclicked(pos) {
    console.log("clicked pos:", pos)
    console.log("Text pos", gMeme.lines[0].x, gMeme.lines[0].y)

    for (var i = 0; i < gMeme.lines.length; i++) {
        const line = gMeme.lines[i]
        //Update font measurments for inc/dec
        // gCtx.font = `${line.size}px ${line.font}`;
        //Check alignment
        const diff = checkAlignment(line.alignment)
        console.log("diff:", diff)

        const textMetrics = gCtx.measureText(line.txt)
        const textWidth = textMetrics.width
        const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent

        const xStart = line.x - diff - 10
        const xEnd = xStart + textWidth - 10
        const yStart = line.y - textMetrics.actualBoundingBoxAscent - 10
        const yEnd = yStart + textHeight + 10

        if (pos.x >= xStart && pos.x <= xEnd &&
            pos.y >= yStart && pos.y <= yEnd) {
            line.isDrag = true;
            return true;
        }
    }
    return false
}

function setNewLinePos(dx, dy) {
    const LineId = gMeme.lines.findIndex(line => line.isDrag)
    gMeme.lines[LineId].x += dx
    gMeme.lines[LineId].y += dy

}

function setisDrag() {
    gMeme.lines.forEach(line => line.isDrag = false)
}

