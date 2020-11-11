'use strict';

(function () {
  const imgUpload = document.querySelector(`.img-upload__overlay`);
  window.imgUpload = imgUpload;
  const effectLevelValue = document.querySelector(`.effect-level__value`);
  const imgUploadPreview = document.querySelector(`.img-upload__preview`);
  window.imgUploadPreview = imgUploadPreview;
  const effectsRadio = document.querySelector(`.effects__radio`).value;
  window.effectsRadio = effectsRadio;
  console.log(effectsRadio);
  // функция рассчёта значения style для эффекта
  function getEffectStyleValue(effect, sliderValue) {
    if (effect === `chrome`) {
      const grayScale = sliderValue * 1 / 100;
      return `grayscale(${grayScale}`;
    } else if (effect === `sepia`) {
      const sepia = sliderValue * 1 / 100;
      return `sepia(${sepia}`;
    } else if (effect === `marvin`) {
      const invert = sliderValue + `%`;
      return `invert(${invert}`;
    } else if (effect === `phobos`) {
      const blur = sliderValue * 3 / 100 + `px`;
      return `blur(${blur}`;
    } else if (effect === `heat`) {
      const brightness = sliderValue * 3 / 100;
      return `brightness(${brightness}`;
    }
    return null;

  }

  // применяем эффект на изображение и устанавливаем его в value соответсвующего инпута
  function applyEffectDepth(effect, sliderValue) {
    effectLevelValue.value = sliderValue;
    imgUploadPreview.style.filter = getEffectStyleValue(effect, sliderValue);

  }
    window.getEffectStyleValue = getEffectStyleValue;
  // функция для установки визуальной позиции слайдера в зависимости от значения
  function setSliderPosition(value) {
    pin.style.left = value + `%`;
    depth.style.width = value + `%`;
  }
  /* наложение эффекта*/
  let currentEffect = `none`;

  const effectLevel = document.querySelector(`.effect-level`);
  effectLevel.classList.add(`hidden`);
window.effectLevel = effectLevel;
  // функция выбора эффекта
  document.querySelector(`.effects__list`).addEventListener(`change`, function (evt) {
    const effectName = evt.target.value;
window.effectName = effectName;
    imgUploadPreview.classList.remove(`effects__preview--${currentEffect}`);
    currentEffect = effectName;
    imgUploadPreview.classList.add(`effects__preview--${effectName}`);

    if (effectName !== `none`) {
      effectLevel.classList.remove(`hidden`);
    } else {
      effectLevel.classList.add(`hidden`);
    }

    applyEffectDepth(currentEffect, 100);

    setSliderPosition(100);
  });

  /* перемещение ползунка*/
  let isDragging = false;

  let pin = document.querySelector(`.effect-level__pin`);
  let track = document.querySelector(`.effect-level__line`);
  let depth = track.querySelector(`.effect-level__depth`);

  // нажимаем на пин – включаем режим "тащим"
  pin.addEventListener(`mousedown`, () => {
    isDragging = true;
  });

  // когда отпускаем кнопку – выключаем режим "тащим"
  document.addEventListener(`mouseup`, () => {
    isDragging = false;
  });

  // двигаем мышкой по документу
  document.addEventListener(`mousemove`, (e) => {
    if (isDragging) {
      let pos = e.pageX - track.getBoundingClientRect().x;
      let percentage = Math.round((pos / track.offsetWidth) * 100);

      if (percentage < 0) {
        percentage = 0;
      }

      if (percentage > 100) {
        percentage = 100;
      }

      setSliderPosition(percentage);
      applyEffectDepth(currentEffect, percentage);

      window.applyEffectDepth = applyEffectDepth;
    }
  });

})();
