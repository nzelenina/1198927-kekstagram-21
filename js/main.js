'use strict';
(function () {
  /* открытие окна редактирования*/
  const body = document.body;
  const uploadFile = document.querySelector(`#upload-file`);
  window.uploadFile = uploadFile;
  const imgUpload = document.querySelector(`.img-upload__overlay`);

  uploadFile.addEventListener(`change`, function () {
    imgUpload.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    window.lockTab(imgUpload);
  });

  function closeForm() {
    imgUpload.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
    window.cleanForm();
    window.unlockTab();
  }
  window.closeForm = closeForm;
  document.querySelector(`#upload-cancel`)
    .addEventListener(`click`, function () {
      closeForm();
    });
  document.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 27 && !evt.target.matches(`.text__hashtags`) && !evt.target.matches(`.text__description`)) {
      closeForm();
    }
  });

  const successMessageCloseHandler = function (evt) {
    evt.preventDefault();
    document.querySelector(`main`).removeChild(window.successPost);
    document.removeEventListener(`click`, successMessageCloseHandler);
  };
  // сообщение об успешной отправке
  const getSuccessMessage = function () {
    const successPostTemplate = document.querySelector(`#success`);
    const successPost = successPostTemplate.content.querySelector(`.success`).cloneNode(true);
    window.successPost = successPost;
    document.querySelector(`main`).appendChild(window.successPost);
    document.addEventListener(`click`, successMessageCloseHandler);
  };
  window.getSuccessMessage = getSuccessMessage;

  const errorMessageCloseHandler = function (evt) {
    evt.preventDefault();
    document.querySelector(`main`).removeChild(window.errorPost);
    document.addEventListener(`click`, errorMessageCloseHandler);
  };

  const getErrorPost = function () {
    const errorPostTemplate = document.querySelector(`#error`);
    const errorPost = errorPostTemplate.content.querySelector(`.error`).cloneNode(true);
    window.errorPost = errorPost;
    document.querySelector(`main`).appendChild(window.errorPost);

    document.addEventListener(`click`, errorMessageCloseHandler);
  };
  window.getErrorPost = getErrorPost;
})();
