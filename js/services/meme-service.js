'use strict'

// var gKeywords = {'happy': 12,'funny puk': 1} objectCounter
var gKeywords = {}

// var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['happy', 'funny'] }];

var gImgs = [];
_createImages();

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        // {
        //     txt: 'I never eat Falafel',
        //     size: 20,
        //     align: { x: 50, y: 50 },
        //     color: 'red',
        //     font: 'IMPACT'
        // }
    ]
}


function getImages() {
    return gImgs;
}

function getImageById(imageId) {
    var image = gImgs.find(img => { return img.id === +imageId });
    return image;
}

function getMeme() {
    return gMeme;
}

function getMemeImgId() {
    return gMeme.selectedImgId;
}

function setMemeIdx(selectedImgId, selectedLineIdx) {
    gMeme.selectedImgId = selectedImgId;
    gMeme.selectedLineIdx = selectedLineIdx;
}

function setMemeImgId(selectedImgId) {
    gMeme.selectedImgId = selectedImgId;
}

function createLine(txt, size, color, font) {
    var align = {};
    if (gMeme.lines.length === 0) {
        align.x = 400;
        align.y = 50;
    }
    if (gMeme.lines.length === 1) {
        align.x = 400;
        align.y = 750;
    }

    if (gMeme.lines.length === 2) {
        align.x = 400;
        align.y = 400;
    }

    var line = {
        txt,
        size,
        align,
        color,
        font
    }
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    console.log(align);
}

function setLine(txt, color) {
    var line = gMeme.lines[gMeme.selectedLineIdx];
    if (line) {
        line.txt = txt;
        line.color = color;
    } else {
        createLine(txt, 20, color, 'IMPACT');
    }
}

function setSize(num) {
    console.log(gMeme.selectedLineIdx)
    gMeme.lines[gMeme.selectedLineIdx].size += num;
}

function setFont(fontType) {
    console.log(gMeme.lines[gMeme.selectedLineIdx].font, fontType)
    gMeme.lines[gMeme.selectedLineIdx].font = fontType;
}

function NextText() {
    gMeme.selectedLineIdx++;
}

function _createImages() {
    for (var i = 1; i <= 18; i++) {
        var image = _createImage(i, 'img-square/' + i + '.jpg', ['happy', 'funny', 'nice'])
        gImgs.push(image);
    }
}

function _createImage(id, url, keywords) {
    var image = {
        id,
        url,
        keywords
    }
    return image;
}

