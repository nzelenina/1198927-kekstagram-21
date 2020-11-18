'use strict';

(function () {
  const KEY_ENTER = 27;
  window.KEY_ENTER = KEY_ENTER;
  const KEY_TAB = 9;
  window.KEY_TAB = KEY_TAB;
  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomArrayElement(array) {
    return array[getRandomInteger(0, array.length - 1)];
  }
  window.getRandomArrayElement = getRandomArrayElement;
  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };
  window.errorHandler = errorHandler;
  // меню фильтров
  const imgFilter = document.querySelector(`.img-filters`);
  window.imgFilter = imgFilter;


})();
