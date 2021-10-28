'use strict'

var gElCanvas;
var gCtx;

var gDrawValues = {
    color: 'black',
    isClicked: false
}

var gPrevious = {};

var gIsTextStroke = false;

function initCanvas() {
    gElCanvas = document.querySelector('.meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    // resizeCanvas();
    addEventListeners();
}

function addEventListeners() {
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mouseup', onUp);

    gElCanvas.addEventListener('mouseleave', onUp);

    gElCanvas.addEventListener('touchstart', onDown);
    gElCanvas.addEventListener('touchmove', onMove);
    gElCanvas.addEventListener('touchend', onUp);

    window.addEventListener('resize', () => {
        resizeCanvas();
    });
}

function onColorPick() {
    gDrawValues.color = document.querySelector('#selected-color').value;
    setColor(gDrawValues.color);
    drawText();
}

function onDown({ offsetX, offsetY }) {
    gDrawValues.isClicked = true;
    gPrevious.prevX = offsetX;
    gPrevious.prevY = offsetY;
    console.log('down')
}

function onMove(ev) {
    console.log('move');
    checkCorr(ev);
}

function onUp() {
    gDrawValues.isClicked = false;
    var lines = getMeme().lines;
    for (var i = 0; i < lines.length; i++) {
        lines[i].isMarked = false;
    }
    console.log('up')
    drawText();
}

function drawText() {
    // onClear();
    drawImgFromlocal(getMemeImgId());
    var txt = document.querySelector('#text-input').value;
    if (getMeme().lines.length === 0) createLine(txt);

    setText(txt);

    setTimeout(function () {
        for (var i = 0; i < getMeme().lines.length; i++) {
            var { txt, size, align, color, font } = getMeme().lines[i];
            gCtx.beginPath();
            gCtx.lineWidth = 2;
            gCtx.strokeStyle = 'black';
            gCtx.fillStyle = color;
            gCtx.font = `${size}px ${font}`;
            gCtx.fillText(txt, align.x, align.y);
            if (getMeme().lines[i].isTextStroke) gCtx.strokeText(txt, align.x, align.y);
            if (getMeme().lines[i].isMarked) {
                gCtx.rect(50, getMeme().lines[i].align.y, 400, -30);
                gCtx.stroke();
            }
        }
    }, 100);
}

function onRemoveLine() {
    if (getMeme().selectedLineIdx === 0) document.querySelector('#text-input').value = '';
    else removeLine()
    drawText();
}
function onClear() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth;
}

function drawImgFromlocal(imageId) {
    var img = new Image();
    var image = getImageById(imageId);
    img.src = image.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    }
}

function onIncreaseFontSize() {
    setSize(5)
    drawText();
}

function onDecreaseFontSize() {
    setSize(-5);
    drawText();
}

function onFontSelect(fontType) {
    setFont(fontType);
    drawText();
}

function onNextText() {
    document.querySelector('#text-input').value = '';
    NextText();
}

function onGoUp() {
    moveText(-15);
    drawText();
}

function onGoDown() {
    moveText(+15);
    drawText();
}

function onSwitchLines() {
    switchLines();
    document.querySelector('#text-input').value = getLine().txt;
}


function onSetTextStroke() {
    getLine().isTextStroke = !getLine().isTextStroke;
    drawText();
}

function onAlignLeft() {
    alignLeft();
    drawText();
}

function onAlignCenter() {
    alignCenter();
    drawText();
}

function onAlignRight() {
    alignRight();
    drawText();
}


function checkCorr({ offsetX, offsetY }) {
    console.log(offsetX, offsetY);
    var meme = getMeme();
    if (meme.lines.length === 0) return;
    grab(meme, 0, offsetX, offsetY);
    if (meme.lines.length === 1) return;
    grab(meme, 1, offsetX, offsetY);
    if (meme.lines.length === 2) return;
    grab(meme, 2, offsetX, offsetY);
}

function grab(meme, num, offsetX, offsetY) {
    if (offsetX > 50 && offsetX < 450 && offsetY < meme.lines[num].align.y && offsetY > meme.lines[num].align.y - 25) {
        gElCanvas.style.cursor = 'pointer';
        meme.lines[num].isMarked = true;
        if (gDrawValues.isClicked && meme.lines[num].isMarked) {
            gElCanvas.style.cursor = 'grab';
            meme.lines[num].align.x = offsetX;
            meme.lines[num].align.y = offsetY + 15;
            drawText();
        }
    } else gElCanvas.style.cursor = 'default';
}



function onSave(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'canvas-download.jpeg';
}

function onUploadImage() {
    uploadImg();
}

