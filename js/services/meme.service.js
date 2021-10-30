'use strict'

//VARABILES SECTION//
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
    ],
    stickers: []
}

var gMemes = [];

//GETTERS SECTION//
function getMeme() {
    return gMeme;
}

function getMemeImgId() {
    return gMeme.selectedImgId;
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

//SETTERS SECTION//
function setMemeIdx(selectedImgId, selectedLineIdx) {
    gMeme.selectedImgId = selectedImgId;
    gMeme.selectedLineIdx = selectedLineIdx;
}

function setMemeImgId(selectedImgId) {
    gMeme.selectedImgId = selectedImgId;
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

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function addSticker(id, posX, posY) {
    var sticker = {
        id,
        posX,
        posY
    }
    gMeme.stickers.push(sticker);
}

//MORE FUNCTIONS//
function NextText() {
    gMeme.selectedLineIdx++;
    createLine();
}

function switchLines() {
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
    } else gMeme.selectedLineIdx--;
}

function removeLine() {
    gMeme.lines.splice([gMeme.selectedLineIdx], 1);
    gMeme.selectedLineIdx--;
}

//TEXT MOVEMENT SECTION//
function moveText(num) {
    gMeme.lines[gMeme.selectedLineIdx].align.y += num;
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

// CLEAR AND CREATE SECTION//
function clearMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
        ],
        stickers: []
    }
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
        area: { startX: 50, endX: 400, startY: align.y, endY: align.y - 50 },
        isMarked: false
    }
    // console.log(line.area);
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function storeMeme () {
    if (gMemes.includes(gMeme)) {
        var index = gMemes.findIndex(meme => meme === gMeme);
        gMemes[index] = gMeme;
    } else gMemes.push(gMeme);
}

function getMyMemes() {
    return gMemes;
}

function setMemeFromMyMeme (index) {
    gMeme = gMemes[index];
}