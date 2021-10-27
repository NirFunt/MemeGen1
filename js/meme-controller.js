'use strict'

function init () {
    renderGrid();
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


