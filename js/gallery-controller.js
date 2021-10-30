'use strict'

//VARABILES SECTION//
var gStickerDrag = false;
var gStickerPicked;

//SETUP SECTION//
function init() {
   renderGrid();
   renderKeyWords();
   initCanvas();
   renderStickers();
}

//RENDER SECTION//
function renderGrid() {
   var images = getImages();
   var elGalleryContainer = document.querySelector('.gallery-container');
   var htmlStrArray = images.map(image => {
      return `<img src="${image.url}" class="square-img" id="${image.id}" onclick="onImageClick('${image.id}')">`;
   })
      // console.log(htmlStrArray);
   elGalleryContainer.innerHTML = htmlStrArray.join('');
}

function renderKeyWords() {
   var elKeyWordsContainer = document.querySelector('.key-words-list');
   var elKeyWordsContainer2 = document.querySelector('.key-words-list2');
   var keywords = getKeyWords();
   var keywords2 = [];
   var strHTML = '';

   for (var word in keywords) {
      var liHTML = `<li style="font-size:${keywords[word] * 3}px;" onclick="onSort('${word}')"> ${word}</li> `
      strHTML += liHTML;
      keywords2.push(liHTML);
   }
   elKeyWordsContainer.innerHTML = strHTML;
   keywords2 = keywords2.slice(5);
   keywords2.push(`<li onclick="showMoreKeyWords()"> More </li>`);
   elKeyWordsContainer2.innerHTML = keywords2.join('');
}

function renderStickers() {
   var stickers = getStickers();
   // console.log(stickers) 
   var elStickers = document.querySelector('.stickers');
   var htmlStrArray = stickers.map(sticker => {
      return `<img src="${sticker.url}" id="${sticker.id}" onmousedown="onStickerClick('${sticker.id}')">`;
   })
   // console.log(htmlStrArray);
   elStickers.innerHTML = htmlStrArray.join('');
}

function renderMyMemes() {
   var images = getImages();
   var memes = getMyMemes();
   var elGalleryContainer = document.querySelector('.gallery-container');
   var htmlStrArray = memes.map( (meme,index) => {
      return `<img src="${images[meme.selectedImgId-1].url}" class="square-img" id="${index}" onclick="onMemeClick('${index}')">`;
   })
      // console.log(htmlStrArray);
   elGalleryContainer.innerHTML = htmlStrArray.join('');
}

//IMAGE CLICK, SORT AND SERARCH SECTION//
function onImageClick(imageId) {
   setMemeImgId(imageId)
   drawImgFromlocal(imageId);
   setTimeout (function () {
      document.querySelector('.header2').style.display = 'none';
      document.querySelector('main').style.display = 'none';
      document.querySelector('.my-info').style.display = 'none';
      document.querySelector('.canvas-btn-container').style.display = 'flex';
      resizeCanvas();
   },100)
}

function onMemeClick (memeId) {
   setMemeFromMyMeme (memeId);
   drawAllLinesAndImages();
   document.querySelector('main').style.display = 'none';
   document.querySelector('.canvas-btn-container').style.display = 'flex';
}

function onSort(word) {
   sortByWord(word);
   renderGrid();
   renderKeyWords();
}

function onSearch() {
   var input = document.querySelector('#search-input').value;
   onSort(input);
}


//NAVIGATION SECTION//
function onPagePrev() {
   movePrev();
   renderGrid();
}

function onPageNext() {
   moveNext();
   renderGrid();
}

function onMoveStickerPrev() {
   moveStickerPrev();
   renderStickers();
}

function onMoveStickerNext() {
   moveStickerNext();
   renderStickers()
}

// GO TO FUNCTIONS SECTION//
function goToGallery() {
   resetSort();
   renderGrid();
   document.querySelector('.header2').style.display = 'flex';
   document.querySelector('main').style.display = 'block';
   document.querySelector('.my-info').style.display = 'flex';
   document.querySelector('.canvas-btn-container').style.display = 'none';
   onClear();
   clearMeme();
}

function goToMemes() {
   document.querySelector('main').style.display = 'block';
   document.querySelector('.canvas-btn-container').style.display = 'none';
   document.querySelector('.my-info').style.display = 'none';
   renderMyMemes();
   onClear();
   clearMeme();
}



function onOpenUploadImageModal() {
   document.querySelector('.load-image-form').style.display = 'flex';
}

function closeLoadImageFormModal() {
   document.querySelector('.load-image-form').style.display = 'none';
}

//MORE FUNCTIONS SECTION//
function onUploadLocalImage() {
   var imageFakePath = document.querySelector('#image-input').value;
   var inputKeyWords = document.querySelector('#key-words-input').value;
   // console.log(imageFakePath,inputKeyWords);
   uploadLocalImageFile(imageFakePath, inputKeyWords);
   document.querySelector('.load-image-form').style.display = 'none';
   renderGrid();
   renderKeyWords();
}

function onStickerClick(stickerId) {
   console.log(stickerId);
   gStickerPicked = stickerId;
   gStickerDrag = true;
}



