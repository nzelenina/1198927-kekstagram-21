'use strict';

(function () {

  const randomPhotos = [];
   for (let i = 0; i < 10; i++) {
       const randomPhoto =  window.getRandomArrayElement(photos);
    randomPhotos.push(randomPhoto);
 }

console.log(randomPhotos);
const filterRandom = document.querySelector(`#filter-random`);
filterRandom.addEventListener(`click`, function () {
  renderPicturesList(randomPhotos);
})



    })();

