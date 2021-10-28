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
    console.log('up')
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
                gCtx.rect(align.x - size / 2, align.y + size / 2, txt.length * size * 0.8, -size * 1.5);
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
    // console.log(meme.lines[0].align.x, meme.lines[0].align.y, meme.lines[0].area.x, meme.lines[0].area.y)
    if (meme.lines.length === 0) return;
    if (offsetX > meme.lines[0].align.x && offsetX < meme.lines[0].area.x
        && offsetY < meme.lines[0].align.y && offsetY > meme.lines[0].area.y) {
        gElCanvas.style.cursor = 'pointer';
        if (gDrawValues.isClicked) {
            gElCanvas.style.cursor = 'grab';
            meme.lines[0].isMarked = true;
            meme.lines[0].align.x = offsetX - meme.lines[0].size * meme.lines.length * 0.5;
            meme.lines[0].align.y = offsetY + meme.lines[0].size / 2;
            drawText();
        }
    } else gElCanvas.style.cursor = 'default';

    if (meme.lines.length === 1) return;
    if (offsetX > meme.lines[1].align.x && offsetX < meme.lines[1].area.x
        && offsetY < meme.lines[1].align.y && offsetY > meme.lines[1].area.y) {
        gElCanvas.style.cursor = 'pointer';
        if (gDrawValues.isClicked) {
            gElCanvas.style.cursor = 'grab';
            meme.lines[1].isMarked = true;
            meme.lines[1].align.x = offsetX - meme.lines[1].size * meme.lines.length * 0.5;
            meme.lines[1].align.y = offsetY + meme.lines[1].size / 2;
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

