'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram`;

  window.upload = function (data, onSuccess) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
  const form = document.querySelector(`#upload-select-image`);
  form.addEventListener(`submit`, function (evt) {
    window.upload(new FormData(form), function (response) {
      window.imgUpload.classList.add(`hidden`);
      evt.preventDefault();
      document.querySelector(`main`).append(window.successPost);

    });
  });
})();
