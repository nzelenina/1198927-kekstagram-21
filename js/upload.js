'use strict';

(function () {
  var URL = 'https://21.javascript.pages.academy/kekstagram';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();

const form = document.querySelector (`#upload-select-image`);
form.addEventListener (`submit`, function(evt){
  window.upload(new FormData(form),function (response){
imgUpload.classList.add(`hidden`);
imgUpload.appendChild(successPost);
});
   evt.preventDefault();
});
