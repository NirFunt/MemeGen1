'use strict'

//VARABILES SECTION//
const IMAGE_PER_PAGE = 9;
var gPage = 0;
const STICKER_PER_PAGE = 3;
var gStickerPage = 0;
var gImageCounter = 18;

var gImgs = [];
var gStickers = [];
var gWords = ['sad', 'funny', 'crazy', 'animal', 'nice', 'cute', 'happy', 'bad'];
var gKeywords = {};

_createImages();
_createStickers();
_setgKeyWords();

var gSortedImgs = gImgs.slice();

//GETTERS SECTION//
function getImages() {
    // return gSortedImgs;
    return gSortedImgs.slice(gPage * IMAGE_PER_PAGE, gPage * IMAGE_PER_PAGE + IMAGE_PER_PAGE);
}

function getStickers() {
    return gStickers.slice(gStickerPage * STICKER_PER_PAGE, gStickerPage * STICKER_PER_PAGE + STICKER_PER_PAGE);
}

function getKeyWords() {
    return gKeywords;
}

function getImageById(imageId) {
    var image = gImgs.find(img => { return img.id === +imageId });
    return image;
}

function getStickerById(stickerId) {
    var sticker = gStickers.find(sticker => { return sticker.id === +stickerId });
    return sticker;
}

//NAVIGATE SECTION//
function movePrev() {
    if (gPage === 0) return;
    gPage--;
}

function moveNext() {
    if ((gPage + 1) * IMAGE_PER_PAGE >= gSortedImgs.length) return;
    gPage++;
}

function moveStickerPrev() {
    if (gStickerPage === 0) return;
    gStickerPage--;
}

function moveStickerNext() {
    if ((gStickerPage + 1) * STICKER_PER_PAGE >= gStickers.length) return;
    gStickerPage++;
}

//SORT, UPLOADIMAGE, MORE FUNCTION SECTIONS//
function uploadLocalImageFile(imageFakePath, inputKeyWords) {
    var imageNameArr = imageFakePath.split('\\');
    var url = 'img-to-load/' + imageNameArr[2];
    var words = inputKeyWords.split(' ');
    _createImage(++gImageCounter, url, words);
    _setgKeyWords();
}

function sortByWord(word) {
    if (!gWords.includes(word)) return;
    gSortedImgs = gImgs.filter(img => img.keywords.includes(word));
    // console.log(gSortedImgs);
    gKeywords[word]++;
}

function resetSort() {
    gSortedImgs = gImgs.slice();
    // console.log(gSortedImgs);
}

//CREATE SECTION//
function _createImages() {
    for (var i = 1; i <= 18; i++) {
        var words = gWords.slice();
        words.splice(getRandomInt(0, words.length), 1);
        words.splice(getRandomInt(0, words.length), 1);
        words.splice(getRandomInt(0, words.length), 1);
        words.splice(getRandomInt(0, words.length), 1);
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
    for (var i = 1; i <= 12; i++) {
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

function _setgKeyWords() {
    for (var i = 0; i < gImgs.length; i++) {
        for (var j = 0; j < gImgs[i].keywords.length; j++) {
            // console.log(gImgs[i].keywords[j]);
            if (gKeywords[gImgs[i].keywords[j]]) gKeywords[gImgs[i].keywords[j]]++;
            else gKeywords[gImgs[i].keywords[j]] = 1;
        }
    }
}