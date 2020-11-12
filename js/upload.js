'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram`;

  window.upload = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.response);
      }
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
  // отправка формы
  const form = document.querySelector(`#upload-select-image`);
  form.addEventListener(`submit`, function (evt) {

    window.upload(new FormData(form), function () {
      window.cleanForm();
      window.getSuccessMessage();
      window.closeSuccessMessage();
    });

    evt.preventDefault();
  });


})();
