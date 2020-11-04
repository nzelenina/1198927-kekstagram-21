'use strict';
(function() {
  /* открытие окна редактирования*/
  const body = document.body;
  const uploadFile = document.querySelector(`#upload-file`);
  const imgUpload = document.querySelector(`.img-upload__overlay`);

  uploadFile.addEventListener(`change`, function() {
    imgUpload.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
  });

  document.querySelector(`#upload-cancel`)
    .addEventListener(`click`, function() {
      imgUpload.classList.add(`hidden`);
      body.classList.remove(`modal-open`);
    });

  // рисуем список изображений
  // window.renderPicturesList(window.photos);

  // сообщение об успешной отправке
  const getSuccessMessage = function() {
    const successPostTemplate = document.querySelector(`#success`);
    const successPost = successPostTemplate.content.querySelector(`.success`).cloneNode(true);
    window.successPost = successPost;
    document.querySelector(`main`).appendChild(window.successPost);
  };
  window.getSuccessMessage = getSuccessMessage;
  // закрытие сообщения
  const closeSuccessMessage = function() {
    const successButton = document.querySelector(`.success__button`);
    successButton.addEventListener(`click`, function(evt) {
      document.querySelector(`main`).removeChild(window.successPost);
    })
  }
  window.closeSuccessMessage = closeSuccessMessage;

  //сообщение об ошибке
  const getErrorPost = function() {
    const errorPostTemplate = document.querySelector(`#error`);
    const errorPost = errorPostTemplate.content.querySelector(`.error`).cloneNode(true);
    window.errorPost = errorPost;
    document.querySelector(`main`).appendChild(window.errorPost);
  };
  window.getErrorPost = getErrorPost;
  //закрытия сообщения об ошибке
  const closeErrorMessage = function() {
    const errorButton = document.querySelector(`.error__button`);
    errorButton.addEventListener(`click`, function(evt) {
      document.querySelector(`main`).removeChild(window.errorPost);
    })
  }
  window.closeErrorMessage = closeErrorMessage;

  // сообщение о сбое загрузки
  const errorHandler = function(errorMessage) {
    const node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.errorHandler = errorHandler;
})();
