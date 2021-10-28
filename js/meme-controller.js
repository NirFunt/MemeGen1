'use strict'

function init () {
    renderGrid();
    renderKeyWords();
    initCanvas();
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
   var keywords = getKeyWords();
   var strHTML = '';
   for (var word in keywords ) {
      console.log(word);
      strHTML+= `<li style="font-size:${keywords[word]*8}px;"> ${word}</li> `
   }
   elKeyWordsContainer.innerHTML = strHTML;
}


