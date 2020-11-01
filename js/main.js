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

  document.querySelector('#upload-cancel')
    .addEventListener('click', function() {
      imgUpload.classList.add(`hidden`);
      body.classList.remove(`modal-open`);
    })

  // рисуем список изображений
 // renderPicturesList(photos)

  //сообщение об успешной отправке
  const successPostTemplate = document.querySelector(`#success`);

  const successPost = successPostTemplate.cloneNode(true);
  imgUpload.appendChild(successPost);
})();
