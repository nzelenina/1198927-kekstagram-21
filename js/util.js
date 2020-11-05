'use strict';

(function () {
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
/* const imgFilter = document.querySelector(`.img-filters`);
window.imgFilter = imgFilter;
const imgFilterButton = imgFilter.querySelectorAll(`.img-filters__button`);
const imgFilterActive = imgFilter.querySelector(`.img-filters__button--active`);
*/
})();
