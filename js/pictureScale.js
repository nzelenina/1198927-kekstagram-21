'use strict';
(function () {
  /* кнопки + и -*/
  const scaleControlValue = document.querySelector(`.scale__control--value`);
  const scaleControlBigger = document.querySelector(`.scale__control--bigger`);

  // функция применения размера на фото
  function applyZoom(zoomValue) {
    scaleControlValue.value = zoomValue + `%`;
    const scale = zoomValue / 100;
    window.imgUploadPreview.style.transform = `scale(${scale})`;
  }
  window.applyZoom = applyZoom;
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
})();
