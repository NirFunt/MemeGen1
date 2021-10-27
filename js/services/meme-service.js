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
        {
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}


function getImages () {
    return gImgs;
}

function _createImages () {
    for (var i = 1; i <= 18; i++) {
        var image = _createImage(i,'img-square/'+i+'.jpg',['happy','funny','nice'])
        gImgs.push(image);
    }
}

function _createImage (id,url,keywords) {
    var image = {
        id,
        url,
        keywords
    }
    return image;
}

