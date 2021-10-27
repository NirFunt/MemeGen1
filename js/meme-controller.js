'use strict'

function init () {
    renderGrid();
    initCanvas();
}

function renderGrid() {
    console.log('asda');
   var images = getImages(); 
   var elGalleryContainer = document.querySelector('.gallery-container');

   var htmlStrArray = images.map(image => {
      return `<img src="${image.url}" class="square-img" id="${image.id}">`;
   })
//    console.log(htmlStrArray);
   elGalleryContainer.innerHTML = htmlStrArray.join('');
}


