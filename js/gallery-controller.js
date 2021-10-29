'use strict'

var gStickerDrag = false;
var gStickerPicked;

function init () {
    renderGrid();
    renderKeyWords();
    initCanvas();
    renderStickers ();
}

function renderGrid() {
   var images = getImages(); 
   var elGalleryContainer = document.querySelector('.gallery-container');

   var htmlStrArray = images.map(image => {
      return `<img src="${image.url}" class="square-img" id="${image.id}" onclick="onImageClick('${image.id}')">`;
   })
//    console.log(htmlStrArray);
   elGalleryContainer.innerHTML = htmlStrArray.join('');
}

function renderKeyWords() {
   var elKeyWordsContainer = document.querySelector('.key-words-list');
   var elKeyWordsContainer2 = document.querySelector('.key-words-list2');
   var keywords = getKeyWords();
   var keywords2 = [];
   var strHTML = '';

   for (var word in keywords ) {
      var liHTML = `<li style="font-size:${keywords[word]*3}px;" onclick="onSort('${word}')"> ${word}</li> `
      strHTML += liHTML;
      keywords2.push(liHTML);
   }
   elKeyWordsContainer.innerHTML = strHTML;
   keywords2 = keywords2.slice(5);
   keywords2.push(`<li onclick="showMoreKeyWords()"> More </li>`);
   elKeyWordsContainer2.innerHTML = keywords2.join('');
}

function renderStickers () {
   var stickers = getStickers();
   // console.log(stickers) 
   var elStickers = document.querySelector('.stickers');
   var htmlStrArray = stickers.map(sticker => {
      return `<img src="${sticker.url}" id="${sticker.id}" onmousedown="onStickerClick('${sticker.id}')">`;
   })
   // console.log(htmlStrArray);
   elStickers.innerHTML = htmlStrArray.join('');
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

function onSort (word) {
   sortByWord (word);
   renderGrid();
   renderKeyWords();
}

function onSearch () {
   var input = document.querySelector('#search-input').value;
   onSort(input);
}

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

function onPagePrev() {
   movePrev();
   renderGrid();
}

function onPageNext() {
   moveNext ();
   renderGrid();
}

function onOpenUploadImageModal () {
   document.querySelector('.load-image-form').style.display = 'flex';
}

function onUploadLocalImage() {
   var imageFakePath = document.querySelector('#image-input').value;
   var inputKeyWords = document.querySelector('#key-words-input').value;
   // console.log(imageFakePath,inputKeyWords);
   uploadLocalImageFile(imageFakePath,inputKeyWords);
   document.querySelector('.load-image-form').style.display = 'none';
   renderGrid();
   renderKeyWords();
}


function closeLoadImageFormModal() {
   document.querySelector('.load-image-form').style.display = 'none';
}

function onStickerClick (stickerId) {
   console.log(stickerId);
   gStickerPicked = stickerId;
   gStickerDrag = true;
}



