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
// {
//     selectedImgId: 5,
//     selectedLineIdx: 0,
//     lines: [
//         {
//             txt: 'I sometimes eat Falafel',
//             size: 20,
//             color: 'red'
//         }
//     ]
// }
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
                size: 20,
                color: 'black',
                x: 100,
                y: 100,
            }
        ]
    }
    saveToStorage(MEME_KEY, gMeme)
    return gMeme
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

