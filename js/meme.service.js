'use strict'

const IMG_KEY = 'imgDB'
const MEME_KEY = 'memeDB'
const SAVED_MEME_KEY = 'savedMemesDB'


var gImgs = []
//     {
//         id: 1,
//         url: 'img/1.jpg',
//         keywords: ['funny', 'cat']
//     }
// ]

var gMeme
// selectedImgId: 5,
//     selectedLineIdx: 0,
//         lines: [
//             {
//                 txt: 'I sometimes eat Falafel',
//                 size: 20,
//                 color: 'red'
//             },
//             {
//                 txt: 'I sometimes eat Falafel',
//                 size: 20,
//                 color: 'red'
//             }
//         ]

var gKeywordSearchCountMap = {
    'funny': 12,
    'cat': 16,
    'baby': 2
}

_createImgs()

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
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
    //TODO fix input (and input focus?)
    const line = _createLine(txt, size, color)
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(lineIdx, 1)
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function setAlignment(alignDirection) {
    gMeme.lines[gMeme.selectedLineIdx].alignment = alignDirection
}

//Create functions
function _createImgs() {
    gImgs = loadFromStorage(IMG_KEY, gImgs)
    if (!gImgs || !gImgs.length) {
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

function _createImg(id, url, keywords) {
    return {
        id,
        url,
        keywords,
    }
}

function createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'YOU ROCK!',
                size: 30,
                color: 'black',
                x: 250,
                y: 100,
                alignment: 'center',
                font: 'arial'
            },
            {
                txt: 'YOU WEIRD!',
                size: 30,
                color: 'black',
                x: 250,
                y: 400,
                alignment: 'center',
                font: 'arial'
            }
        ]
    }
    saveToStorage(MEME_KEY, gMeme)
    return gMeme
}

function _createLine(txt, size, color, font) {
    return {
        txt: txt,                           //`${txt}`,
        size: size,
        color: color,
        x: 250,
        y: 250,
        alignment: 'center',
        font: 'arial'
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

