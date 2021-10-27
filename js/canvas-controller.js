'use strict'

var gElCanvas;
var gCtx;

var gDrawValues = {
    color: 'black',
    isClicked: false
}

var gPrevious = {};

function initCanvas() {
    gElCanvas = document.querySelector('.meme-canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
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
    drawText();
}

function onDown({ offsetX, offsetY }) {
    gDrawValues.isClicked = true;
    gPrevious.prevX = offsetX;
    gPrevious.prevY = offsetY;
    console.log('down')
}

function onMove(ev) {
    if (gDrawValues.isClicked) onDraw(ev);
    console.log('move')
}

function onUp() {
    gDrawValues.isClicked = false;
    console.log('up')
}

function drawText(align = 'left', font = 'IMPACT') {
    var txt = document.querySelector('#text-input').value;
    setLine(txt, 'left', gDrawValues.color, font, 1);
    onClear();
    drawImgFromlocal(getMemeImgId());

    var { txt, size, align, color, font } = getMemes().lines[1];

    var x, y;
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = color;
    gCtx.font = `${size}px ${font}`;
    if (align === 'left') {
        x = 50;
        y = 50;
    }
    setTimeout(function () {
        gCtx.fillText(txt, x, y);
        gCtx.strokeText(txt, x, y);
    }, 50);

}

function onClear() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 50;
}

function onImageClick(imageId) {
    setMemeImgId(imageId)
    drawImgFromlocal(imageId);
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






function onSave(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'canvas-download.jpeg';
}

function onUploadImage() {
    uploadImg();
}


function onDraw(ev) {
    var { offsetX, offsetY } = ev;
    drawLine(offsetX, offsetY);
}

function drawLine(startX, startY) {
    var endX = startX + 1;
    var endY = startY + 1;
    gCtx.beginPath();
    gCtx.moveTo(startX, startY);
    gCtx.lineTo(endX, endY);
    gCtx.lineWidth = 4;
    gCtx.strokeStyle = gDrawValues.borderColor;
    gCtx.stroke();
}