'use strict';

(function () {
  const DATA_URL = `https://21.javascript.pages.academy/kekstagram/data`;
  const UPLOAD_URL = `https://21.javascript.pages.academy/kekstagram`;
  const TIMEOUT_IN_MS = 10000;
  const SUCCESS_COD = 200;
  const ACT_FOREND = 300;

  const load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, DATA_URL);

    xhr.addEventListener(`load`, function () {
      if (xhr.status >= SUCCESS_COD && xhr.status < ACT_FOREND) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.response);
      }
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.send();
  };

  const upload = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === SUCCESS_COD) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.response);
      }
    });

    xhr.open(`POST`, UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load,
    upload
  };
})();
