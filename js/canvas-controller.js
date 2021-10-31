'use strict'

//VARABILES SECTION//
var gElCanvas;
var gCtx;

var gDrawValues = {
    color: 'black',
    isClicked: false
}

var gIsDragging = false;
var gIsDragging2 = false;
var gGrabedLine = null;
var gGrabedSticker = null;

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
        // on the cavnas page, there is not problem to resize window, canvas redraw itself.
        // but on the gallery page there is a problem to resize window, it makes canvas width = 0, maybe because canvas is a display 'none'. this is very strange behavior.
        // console.log(gElCanvas);
        gElCanvas.width = 500;
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
    }, 10);
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
    // ev.preventDefault();
    gDrawValues.isClicked = true;
    console.log('down');
    // console.log(ev);
}

function onMove(ev) {
    // ev.preventDefault();
    // console.log('move');
    handleMouseEventsOnCanvas(ev);
}

function onUp(ev) {
    // ev.preventDefault();
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
        offsetX = ev.targetTouches[0].clientX;
        offsetY = ev.targetTouches[0].clientY;
    }
    console.log(offsetX, offsetY);
    var meme = getMeme();

    var linesPos = [];
    var stickersPos = [];
    for (var i = 0; i < meme.lines.length; i++) {
        linesPos.push({ line: meme.lines[i], x: meme.lines[i].align.x, y: meme.lines[i].align.y });
    }
    for (var i = 0; i < meme.stickers.length; i++) {
        stickersPos.push({ sticker: meme.stickers[i], x: meme.stickers[i].posX, y: meme.stickers[i].posY });
    }


    for (var i = 0; i < linesPos.length; i++) {
        if (offsetX > 50 && offsetX < 500 && offsetY < linesPos[i].y &&
            offsetY > linesPos[i].y - 25) {
            console.log('i am a line')
            gIsDragging = true;
            gGrabedLine = linesPos[i].line;
            break;
        } else gIsDragging = false;
    }

    for (var i = 0; i < stickersPos.length; i++) {
        if (offsetX > stickersPos[i].x && offsetX < stickersPos[i].x +100 && 
            offsetY < stickersPos[i].y +100 && offsetY > stickersPos[i].y) {
            console.log('i am a sticker')
            gIsDragging2 = true;
            gGrabedSticker = stickersPos[i].sticker;
            break;
        } else gIsDragging2 = false;
    }
    

    if (gDrawValues.isClicked && gIsDragging) {
        console.log('moving element')
        if (gGrabedLine) {
            gGrabedLine.align.x = offsetX - 50;
            gGrabedLine.align.y = offsetY + 10;
        } 
        drawAllLinesAndImages();
    }

    if (gDrawValues.isClicked && gIsDragging2) {
        console.log('moving element')
        if (gGrabedSticker) {
            gGrabedSticker.posX = offsetX-50;
            gGrabedSticker.posY = offsetY-50;
        } 
        drawAllLinesAndImages();
    }

    // gElCanvas.style.cursor = 'pointer';
    // gElCanvas.style.cursor = 'grab';
    // gElCanvas.style.cursor = 'default';
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
    setTimeout(resizeCanvas, 10);
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

function onStoreMeme() {
    storeMeme();
    alert('Meme was stored to My Memes');
}

