'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram`;

 window.upload = function (data, onSuccess, onError) {
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';

xhr.addEventListener('load', function () {
if (xhr.status == 200) {
// статус 200, значит всё прошло успешно
onSuccess(xhr.response);
} else {
// статус отличается от 200, значит надо обработать ошибку
onError(xhr.response);
}
});

xhr.addEventListener('error', onError)

xhr.open('POST', URL);
xhr.send(data);
};
  //отправка формы
  const form = document.querySelector(`#upload-select-image`);
  form.addEventListener(`submit`, function (evt) {

    window.upload(new FormData(form), function (response) {

      window.imgUpload.classList.add(`hidden`);
      window.getSuccessMessage();
      window.closeSuccessMessage();
        },
        function (response) {
// ответ с ошибкой
window.imgUpload.classList.add(`hidden`);
window. getErrorPost();
window.closeErrorMessage();
});
evt.preventDefault();
});


})();
