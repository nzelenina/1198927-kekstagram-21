'use strict';
(function () {
const photos = [];
  window.photos = photos;
  const imgUploadPreview = document.querySelector(`.img-upload__preview`);
const imgUpload = document.querySelector(`.img-upload__overlay`);
window.imgUpload = imgUpload;
  window.imgUploadPreview = imgUploadPreview ;
  const body = document.body;
  window.body = body;
  const successPostTemplate = document.querySelector(`#success`);

  const successPost = successPostTemplate.cloneNode(true);
window.successPost = successPost;

window.successPostTemplate = successPostTemplate;

})();