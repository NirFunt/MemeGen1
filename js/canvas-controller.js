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
    if (gDrawValues.isClicked) onDraw(ev);
    console.log('move', ev.offsetX, ev.offsetY);
}

function onUp() {
    gDrawValues.isClicked = false;
    console.log('up')
}

function drawText() {
    onClear();
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

function onImageClick(imageId) {
    setMemeImgId(imageId)
    drawImgFromlocal(imageId);
    document.querySelector('.header2').style.display = 'none';
    document.querySelector('main').style.display = 'none';
    document.querySelector('.my-info').style.display = 'none';
    document.querySelector('.canvas-btn-container').style.display = 'flex';
    resizeCanvas();
    
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