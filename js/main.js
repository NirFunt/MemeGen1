'use strict'

function init () {
    renderGrid();
}

function renderGrid() {
   var elGalleryContainer = document.querySelector('.gallery-container');
   console.log(elGalleryContainer);
   var htmlStr = '';
   for (var i = 1; i <= 18; i++) {
    htmlStr +=`<img src="img-square/${i}.jpg" class="square-img" id="myID">`
   }
   elGalleryContainer.innerHTML = htmlStr;
}