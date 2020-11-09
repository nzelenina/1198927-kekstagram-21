'use strict';

(function () {
  // случайные фотографии
  const randomPhotos = [];

  for (let i = 0; i < window.photos.length; i++) {
    const randomPhoto = window.getRandomArrayElement(window.photos);
    randomPhotos.push(randomPhoto);
  }

  const uniqPhotos = randomPhotos.filter(function (photos, index) {
    return randomPhotos.indexOf(photos) === index;
  });

  const limitedUniqPhotos = uniqPhotos.slice(0, 10);


  const filterRandom = document.querySelector(`#filter-random`);
  filterRandom.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    document.querySelector(`.img-filters__button--active`).classList.remove(`img-filters__button--active`);
    filterRandom.classList.add(`img-filters__button--active`);
    window.removePictures();
    window.renderPicturesList(limitedUniqPhotos);

  });
  // сортировка по кол-ву комментариев
  const maxCommentPhotos = window.photos.sort(function (a, b) {
    return b.comments.length - a.comments.length;
  });


  const filterDiscussed = document.querySelector(`#filter-discussed`);
  filterDiscussed.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    document.querySelector(`.img-filters__button--active`).classList.remove(`img-filters__button--active`);
    filterDiscussed.classList.add(`img-filters__button--active`);
    window.removePictures();
    window.renderPicturesList(maxCommentPhotos);
  });
  // по умолчанию
  const filterDefault = document.querySelector(`#filter-default`);
  filterDefault.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    document.querySelector(`.img-filters__button--active`).classList.remove(`img-filters__button--active`);
    filterDefault.classList.add(`img-filters__button--active`);
    window.removePictures();
    window.renderPicturesList(window.photos);
  });
})();
