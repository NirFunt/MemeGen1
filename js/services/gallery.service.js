'use strict'

var gImgs = [];
var gStickers = [];
var gWords = ['sad', 'funny', 'crazy', 'animal', 'nice', 'cute', 'happy', 'bad'];

var gImageCounter = 18;

var gKeywords = {
    // sad: 1,
    // funny: 3,
    // crazy: 5,
    // animal: 2,
    // nice: 7,
    // cute:2,
    // happy : 3,
    // bad : 4
}

const IMAGE_PER_PAGE = 9;
var gPage = 0;

_createImages();
_createStickers();
_setgKeyWords();

var gSortedImgs = gImgs.slice();



function _setgKeyWords () {
    for (var i = 0; i < gImgs.length; i++) {
        for (var j = 0; j < gImgs[i].keywords.length; j++) {
            // console.log(gImgs[i].keywords[j]);
            if (gKeywords[gImgs[i].keywords[j]]) gKeywords[gImgs[i].keywords[j]]++;
            else gKeywords[gImgs[i].keywords[j]] = 1;
        }
    }
}

function getKeyWords() {
    return gKeywords;
}


function sortByWord (word) {
    if (!gWords.includes(word)) return;
    gSortedImgs = gImgs.filter(img => img.keywords.includes(word));
    // console.log(gSortedImgs);
    gKeywords[word]++;
}

function resetSort() {
    gSortedImgs = gImgs.slice();
    // console.log(gSortedImgs);
}

function getImages() {
    // return gSortedImgs;
    return gSortedImgs.slice(gPage * IMAGE_PER_PAGE, gPage * IMAGE_PER_PAGE + IMAGE_PER_PAGE);
}

function getStickers() {
    return gStickers.slice(0,3);
}

function getImageById(imageId) {
    var image = gImgs.find(img => { return img.id === +imageId });
    return image;
}


function movePrev() {
    if (gPage === 0) return;
    gPage--;
}

function moveNext() {
    if ((gPage + 1) * IMAGE_PER_PAGE >= gSortedImgs.length) return;
    gPage++;
}

function uploadLocalImageFile (imageFakePath,inputKeyWords) {
    var imageNameArr = imageFakePath.split('\\');
    var url = 'img-to-load/' + imageNameArr[2];
    var words = inputKeyWords.split(' ');
    _createImage(++gImageCounter, url,words);
    _setgKeyWords();
}

function getStickerById (stickerId) {
    var sticker = gStickers.find(sticker => { return sticker.id === +stickerId });
    return sticker;
}

function _createImages() {
    for (var i = 1; i <= 18; i++) {
        var words = gWords.slice();
        words.splice(getRandomInt(0,words.length),1);
        words.splice(getRandomInt(0,words.length),1);
        words.splice(getRandomInt(0,words.length),1);
        words.splice(getRandomInt(0,words.length),1);
        _createImage(i, 'img-square/' + i + '.jpg', words);
    }
}

function _createImage(id, url, keywords) {
    var image = {
        id,
        url,
        keywords
    }
    gImgs.push(image);
}

function _createStickers() {
    for (var i = 1; i <= 5; i++) {
        _createSticker(i, 'stickers/' + i + '.png');
    }
}

function _createSticker(id, url) {
    var sticker = {
        id,
        url
    }
    gStickers.push(sticker);
}