'use strict';
(function() {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;
  const TIMEOUT_IN_MS = 10000;
  window.load = function(onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    xhr.addEventListener('timeout', function() {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.send();
  };
  window.load(function(response) {
    (renderPicturesList(photos));

  }, function(response) {
    (errorHandler());
  })
  const renderCommentsLoad = window.load(function(response) {
    (window.renderComments(comment));

  }, function(response) {
    (errorHandler());
  })
  window.renderCommentsLoad = renderCommentsLoad;
})();
