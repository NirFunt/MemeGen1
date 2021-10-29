'use strict'

var gWords = ['sad', 'funny', 'crazy', 'animal', 'nice', 'cute', 'happy', 'bad'];

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

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
    ],
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

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function setMemeIdx(selectedImgId, selectedLineIdx) {
    gMeme.selectedImgId = selectedImgId;
    gMeme.selectedLineIdx = selectedLineIdx;
}

function setMemeImgId(selectedImgId) {
    gMeme.selectedImgId = selectedImgId;
}

function createLine(txt = 'text', size = 30, color = 'red', font = 'IMPACT') {
    var align = {};
    if (gMeme.lines.length === 0) {
        align.x = 250;
        align.y = 50;
    }
    if (gMeme.lines.length === 1) {
        align.x = 250;
        align.y = 450;
    }

    if (gMeme.lines.length > 1) {
        align.x = 250;
        align.y = 250;
    }

    var line = {
        txt,
        size,
        align,
        color,
        font,
        isTextStroke: false,
        area : {startX:50, endX : 400, startY: align.y, endY: align.y-50 },
        isMarked : false
    }
    // console.log(line.area);
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function setText(txt) {
    var line = gMeme.lines[gMeme.selectedLineIdx];
    line.txt = txt;
}

function setSize(num) {
    console.log(gMeme.selectedLineIdx)
    gMeme.lines[gMeme.selectedLineIdx].size += num;
}

function setFont(fontType) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontType;
}

function NextText() {
    gMeme.selectedLineIdx++;
    createLine();
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function moveText(num) {
    console.log(num);
    console.log(gMeme.lines[gMeme.selectedLineIdx].align.y);
    gMeme.lines[gMeme.selectedLineIdx].align.y += num;
    console.log(gMeme.lines[gMeme.selectedLineIdx].align.y);
}

function switchLines() {
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
    } else gMeme.selectedLineIdx--;
    console.log(gMeme.selectedLineIdx);

}

function clearMeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [
        ]
    };
}

function removeLine() {
    gMeme.lines.splice([gMeme.selectedLineIdx], 1);
    gMeme.selectedLineIdx--;
}

function alignLeft() {
    gMeme.lines[gMeme.selectedLineIdx].align.x = 50;
}

function alignCenter() {
    gMeme.lines[gMeme.selectedLineIdx].align.x = 250;
}

function alignRight() {
    gMeme.lines[gMeme.selectedLineIdx].align.x = 400;
}




function movePrev() {
    if (gPage === 0) return;
    gPage--;
}

function moveNext() {
    if ((gPage + 1) * IMAGE_PER_PAGE >= gSortedImgs.length) return;
    gPage++;
}


function _createImages() {
    for (var i = 1; i <= 18; i++) {
        var words = gWords.slice();
        words.splice(getRandomInt(0,words.length),1);
        words.splice(getRandomInt(0,words.length),1);
        words.splice(getRandomInt(0,words.length),1);
        words.splice(getRandomInt(0,words.length),1);
        var image = _createImage(i, 'img-square/' + i + '.jpg', words);
        // console.log(image);
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

