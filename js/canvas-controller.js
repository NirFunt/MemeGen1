'use strict'

var gElCanvas;
var gCtx;

var gDrawValues = {
    shapeColor: 'black',
    borderColor: 'black',
    shape: 'line',
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

function onShapeColorPick() {
    gDrawValues.shapeColor = document.querySelector('#shape-color').value;
}

function onBorderColorPick() {
    gDrawValues.borderColor = document.querySelector('#border-color').value;
}

function onSetShape(shape) {
    gDrawValues.shape = shape;
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

function onDraw(ev) {
    var { offsetX, offsetY } = ev;

    switch (gDrawValues.shape) {
        case 'line':
            drawLine(offsetX, offsetY);
            break;
        case 'lines':
            drawLines(offsetX, offsetY);
            break;
        case 'rod':
            drawLinePoles(offsetX, offsetY);
            break;
        case 'square':
            drawSquare(offsetX, offsetY, 100, 100);
            break;
        case 'square2':
            drawSquare2(offsetX, offsetY, (gPrevious.prevX - offsetX + 1) * 3, (gPrevious.prevY - offsetY + 3) * 9);
            gPrevious.prevX = offsetX;
            gPrevious.prevY = offsetY;
            break;
    }
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

function drawLines(startX, startY) {
    drawLine(startX - 10, startY - 10);
    drawLine(startX - 20, startY - 20);
    drawLine(startX - 30, startY - 30);
    drawLine(startX - 40, startY - 40);
    drawLine(startX, startY);
    drawLine(startX + 10, startY + 10);
    drawLine(startX + 20, startY + 30);
    drawLine(startX + 3, startY + 30);
    drawLine(startX + 40, startY + 40);
}

function drawLinePoles(startX, startY) {
    var endX = startX + 100;
    var endY = startY + 100;
    gCtx.beginPath();
    gCtx.moveTo(startX, startY);
    gCtx.lineTo(endX, endY);
    gCtx.lineWidth = 4;
    gCtx.strokeStyle = gDrawValues.borderColor;
    gCtx.stroke();
}

function drawSquare(startX, startY, endX, endY) {
    gCtx.beginPath();
    gCtx.rect(startX, startY, endX, endY);
    gCtx.fillStyle = gDrawValues.shapeColor;
    gCtx.fillRect(startX, startY, endX, endY);
    gCtx.strokeStyle = gDrawValues.borderColor;
    gCtx.lineWidth = 4;
    gCtx.stroke();
}

function drawSquare2(startX, startY, endX, endY) {
    gCtx.beginPath();
    gCtx.rect(startX, startY, endX, endY);
    gCtx.fillStyle = gDrawValues.shapeColor;
    // gCtx.fillRect(startX, startY, endX, endY);
    gCtx.strokeStyle = gDrawValues.borderColor;
    gCtx.lineWidth = 4;
    gCtx.stroke();
}

function onClear() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 50;
}

function onSave(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'canvas-download.jpeg';
}

function onUploadImage() {
    uploadImg();
}

function onImageClick(imageId) {
    drawImgFromlocal(imageId);
}

function drawImgFromlocal(imageId) {
    var img = new Image();
    var image = getImageById(imageId);
    img.src = image.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
    }
}