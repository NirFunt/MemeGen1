'use strict'

//VARABILES SECTION//
var gElCanvas;
var gCtx;

var gDrawValues = {
    color: 'black',
    isClicked: false
}

var gIsDragging = false;

//SETUP SECTION//
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


//GENERAL CANVAS FUNCTIONS SECTION - RENDER THE CANVAS//
function drawAllLinesAndImages() {
    // onClear();
    drawImgFromlocal(getMemeImgId());
    drawAllStickers();
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

function onClear() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth;
    drawImgFromlocal(getMemeImgId());
    drawAllLinesAndImages();
}

function drawImgFromlocal(imageId) {
    var img = new Image();
    var image = getImageById(imageId);
    img.src = image.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    }
}

//MOUSE EVENTS ON CANVAS FROM LISTERNERS//
function onDown(ev) {
    gDrawValues.isClicked = true;
    console.log('down');
    console.log(ev);
}

function onMove(ev) {
    // ev.preventDefault();
    console.log('move');
    handleMouseEventsOnCanvas(ev);
}

function onUp(ev) {
    gDrawValues.isClicked = false;
    var lines = getMeme().lines;
    for (var i = 0; i < lines.length; i++) {
        lines[i].isMarked = false;
    }
    dealWithSteaker(ev);
    console.log('up')
    drawAllLinesAndImages();
}

//COMPLEX MOUSE EVENTS OF CANVAS SECTION//
function handleMouseEventsOnCanvas(ev) {
    ev.preventDefault();
    var offsetX = ev.offsetX;
    var offsetY = ev.offsetY;
    // console.log(ev);
    if (ev.type === 'touchmove') {
        offsetX = ev.targetTouches[0].pageX;
        offsetY = ev.targetTouches[0].pageY;
    }
    console.log(offsetX, offsetY);
    var meme = getMeme();
    if (meme.lines.length === 0) return; // prevent error when there isnt such line
    handleGrabTextLine(meme, 0, offsetX, offsetY);
    if (meme.lines.length === 1) return; // prevent error when there isnt such line
    handleGrabTextLine(meme, 1, offsetX, offsetY);
    if (meme.lines.length === 2) return; // prevent error when there isnt such line
    handleGrabTextLine(meme, 2, offsetX, offsetY);
    if (meme.lines.length === 3) return; // prevent error when there isnt such line
    handleGrabTextLine(meme, 3, offsetX, offsetY);
    // support dragging 4 lines
}

function handleGrabTextLine(meme, num, offsetX, offsetY) {
    if (offsetX > 50 && offsetX < 450 && offsetY < meme.lines[num].align.y &&
        offsetY > meme.lines[num].align.y - 25 && !gIsDragging) {
        gElCanvas.style.cursor = 'pointer';
        meme.lines[num].isMarked = true;
        gIsDragging = true;
        if (gDrawValues.isClicked && meme.lines[num].isMarked) {
            gElCanvas.style.cursor = 'grab';
            meme.lines[num].align.x = offsetX;
            meme.lines[num].align.y = offsetY + 15;
            drawAllLinesAndImages();
        }
    } else {
        gElCanvas.style.cursor = 'default';
        gIsDragging = false;
    }
}

//STICKERS FUNCTION SECTION//
function drawStickerFromlocal(stickerId, posX, posY) {
    var img = new Image();
    var sticker = getStickerById(stickerId);
    img.src = sticker.url;
    img.onload = () => {
        gCtx.drawImage(img, posX, posY, 100, 100);
    }
}

function drawAllStickers() {
    var meme = getMeme();
    for (var i = 0; i < meme.stickers.length; i++) {
        drawStickerFromlocal(meme.stickers[i].id, meme.stickers[i].posX, meme.stickers[i].posY);
    }
}

function dealWithSteaker({ offsetX, offsetY }) {
    if (gStickerDrag) {
        addSticker(gStickerPicked, offsetX, offsetY);
        gStickerDrag = false;
    }
}

//REGULAR FUNCTION ON LINES//
function onRemoveLine() {
    if (getMeme().selectedLineIdx === 0) document.querySelector('#text-input').value = '';
    else removeLine()
    drawAllLinesAndImages();
}

function onColorPick() {
    gDrawValues.color = document.querySelector('#selected-color').value;
    setColor(gDrawValues.color);
    drawAllLinesAndImages();
}

function onIncreaseFontSize() {
    setSize(5)
    drawAllLinesAndImages();
}

function onDecreaseFontSize() {
    setSize(-5);
    drawAllLinesAndImages();
}

function onFontSelect(fontType) {
    setFont(fontType);
    drawAllLinesAndImages();
}

function onSetTextStroke() {
    getLine().isTextStroke = !getLine().isTextStroke;
    drawAllLinesAndImages();
}

//NAVIGATING LINES SECCTION//
function onGoUp() {
    moveText(-15);
    drawAllLinesAndImages();
}

function onGoDown() {
    moveText(+15);
    drawAllLinesAndImages();
}

function onAlignLeft() {
    alignLeft();
    drawAllLinesAndImages();
}

function onAlignCenter() {
    alignCenter();
    drawAllLinesAndImages();
}

function onAlignRight() {
    alignRight();
    drawAllLinesAndImages();
}

// CREATE NEW LINE AND SWITCH LINES FOCUS
function onNextText() {
    document.querySelector('#text-input').value = '';
    NextText();
}

function onSwitchLines() {
    switchLines();
    document.querySelector('#text-input').value = getLine().txt;
}

// LOAD SAVE AND SHARE SECTION//
//LOAD ONE IMAGE TO CANVAS FROM LOCAL FOLDER
function loadImgToCanvas(ev) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.src = event.target.result;
        _createImage(100, img.src, ['nice', 'cute']);
        setMemeImgId(100);
    }
    reader.readAsDataURL(ev.target.files[0]);
    document.querySelector('.share-load-modal').style.display = 'none';
    setTimeout(resizeCanvas, 100);
}

//SAVES CANVAS CURRENT VIEW TO JEPG FILE ON LOCAL DOWNLOAD FOLDER//
function onSave(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'canvas-download.jpeg';
}

//UPLOAD IMAGE TO SEVER AND SHARE ON FACEBOOK - upload.image.service.js
function onUploadImage() {
    uploadImg();
}

function onOpenShareLoadModal() {
    document.querySelector('.share-load-modal').style.display = 'flex';
}

function closeShareModal() {
    document.querySelector('.share-load-modal').style.display = 'none';
}

