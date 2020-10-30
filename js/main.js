'use strict';
(function () {
/* закрытие большой картинки*/
const bigPicture = document.querySelector(`.big-picture`);
const closeBigPicture = bigPicture.querySelector(`#picture-cancel`);
closeBigPicture.addEventListener(`click`, function () {
  bigPicture.classList.add(`hidden`);
});

/* открытие окна редактирования*/
const body = document.body;
const uploadFile = document.querySelector(`#upload-file`);
const imgUpload = document.querySelector(`.img-upload__overlay`);

uploadFile.addEventListener(`change`, function () {
  imgUpload.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
});
//замена большого изображения
// найдем все картинки в разметке
const pictureImgs = document.querySelectorAll(`.picture__img`);
console. log(pictureImgs);
for (let i = 0; i < photos.length; i++) {
pictureImgs[i].addEventListener('click', function () {
console.log(photos[i]);
bigPicture.classList.remove(`hidden`)
body.classList.add(`modal-open`);
const bigPhoto = document.querySelector(`#big-photo`);
bigPhoto.setAttribute(`src`, photos[i].url);
applyGetComment(photos[i].comments);
console.log(allSocialComment)

})
}
/* закрытие окна редактирования*/
const closeImdUpload = imgUpload.querySelector(`#upload-cancel`);
closeImdUpload.addEventListener(`click`, function () {
  imgUpload.classList.add(`hidden`);
  body.classList.remove(`modal-open`);
});

document.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    imgUpload.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
  }
});


/* кнопки + и -*/
const scaleControlValue = document.querySelector(`.scale__control--value`);
const scaleControlBigger = document.querySelector(`.scale__control--bigger`);

// функция применения размера на фото
function applyZoom(zoomValue) {
  scaleControlValue.value = zoomValue + `%`;
  const scale = zoomValue / 100;
  imgUploadPreview.style.transform = `scale(${scale})`;
}

scaleControlBigger.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  const currentValue = Number.parseInt(scaleControlValue.value, 10);
  let nextValue = currentValue + 25;
  if (nextValue > 100) {
    nextValue = 100;
  }

  applyZoom(nextValue);
});

const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
scaleControlSmaller.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  const currentValue = Number.parseInt(scaleControlValue.value, 10);
  let nextValue = currentValue - 25;
  if (nextValue < 25) {
    nextValue = 25;
  }
  applyZoom(nextValue);
});
//сообщение об успешной отправке
const successPostTemplate = document.querySelector(`#success`);

const successPost = successPostTemplate.cloneNode(true);
imgUpload.appendChild(successPost);
})();
