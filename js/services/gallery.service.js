'use strict'

var gWords = ['sad', 'funny', 'crazy', 'animal', 'nice', 'cute', 'happy', 'bad'];

var gImageCounter = 18;

var gKeywords = {
    sad: 1,
    funny: 3,
    crazy: 5,
    animal: 2,
    nice: 7,
    cute:2,
    happy : 3,
    bad : 4
}

const IMAGE_PER_PAGE = 9;
var gPage = 0;

function getKeyWords() {
    return gKeywords;
}

var gImgs = [];
_createImages();

var gSortedImgs = gImgs.slice();

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

function uploadLocalImageFile (imageFile,inputKeyWords) {
    _createImage(+gImageCounter, imageFile,inputKeyWords);
    // update keywords
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