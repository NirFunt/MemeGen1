'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
    ],
    stickers : [{id:1,posX:50,posY:50},{id:2,posX:200,posY:200}],
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

