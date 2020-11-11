'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;

  const debounce = function (cb) {
    let lastTimeout = null;

    return function (...parameters) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  // случайные фотографии
  function getRandomPhotos(array) {
    const randomPhotos = [];

    for (let i = 0; i < array.length; i++) {
      const randomPhoto = window.getRandomArrayElement(window.photos);
      randomPhotos.push(randomPhoto);
    }

    const uniqPhotos = randomPhotos.filter(function (photos, index) {
      return randomPhotos.indexOf(photos) === index;
    });

    return uniqPhotos.slice(0, 10);
  }

  function getPhotosSortedByComments(array) {
    return [].concat(array).sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  }

  const filterHandler = debounce(function (evt) {
    evt.preventDefault();
    document.querySelector(`.img-filters__button--active`).classList.remove(`img-filters__button--active`);

    const target = evt.target;

    target.classList.add(`img-filters__button--active`);
    window.removePictures();

    let filterResult = [];
    const filterId = evt.target.id;

    if (filterId === `filter-default`) {
      filterResult = window.photos;
    } else if (filterId === `filter-random`) {
      filterResult = getRandomPhotos(window.photos);
    } else if (filterId === `filter-discussed`) {
      filterResult = getPhotosSortedByComments(window.photos);
    }

    window.renderPicturesList(filterResult);
  });

  const filterRandom = document.querySelector(`#filter-random`);
  filterRandom.addEventListener(`click`, filterHandler);
  filterRandom.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 13) {
      filterHandler();
    }
  });

  // сортировка по кол-ву комментариев
  const filterDiscussed = document.querySelector(`#filter-discussed`);
  filterDiscussed.addEventListener(`click`, filterHandler);
  filterDiscussed.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 13) {
      filterHandler();
    }
  });

  // по умолчанию
  const filterDefault = document.querySelector(`#filter-default`);
  filterDefault.addEventListener(`click`, filterHandler);
  filterDefault.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 13) {
      filterHandler();
    }
  });
})();
