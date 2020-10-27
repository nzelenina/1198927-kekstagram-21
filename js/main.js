'use strict';

const messages = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
const names = [`Артем`, `Марья`, `Василий`, `Савелий`, `Валентина`, `Игорь`];
const comments = [];
const photos = [];

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

for (let i = 0; i <= getRandomInteger(1, 10); i++) {
  const comment = {
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names)
  };
  comments.push(comment);
}

for (let i = 0; i < 25; i++) {
  const object = {
    url: `photos/${i}.jpg`,
    likes: getRandomInteger(15, 200),
    description: ` aaaa`,
    comments
  };
  photos.push(object);
}

const allUserPicture = document.querySelector(`.pictures`);
const userPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

const getUserPicture = function (photo) {
  const userPicture = userPictureTemplate.cloneNode(true);
  const pictureImg = userPicture.querySelector(`.picture__img`);
  const image = photo.url;
  pictureImg.setAttribute(`src`, image);
  userPicture.querySelector(`.picture__comments`).textContent = photo.comments.length;
  userPicture.querySelector(`.picture__likes`).textContent = photo.likes;
  return userPicture;
};

const bigPicture = document.querySelector(`.big-picture`);

bigPicture.querySelector(`.comments-count`).textContent = comments.length;
bigPicture.querySelector(`.likes-count`).textContent = photos[1].likes;

const bigPictureImg = bigPicture.querySelector(`.big-picture__img`);
bigPictureImg.setAttribute(`src`, photos[1].url);
const fragment = document.createDocumentFragment();
for (let i = 1; i < photos.length; i++) {
  fragment.appendChild(getUserPicture(photos[i]));
}
allUserPicture.appendChild(fragment);

const socialCommentTemplate = document.querySelector(`#comment`).content.querySelector(`.social__comment`);
const allSocialComment = bigPicture.querySelector(`.social__comments`);

const getComment = function (comment) {
  const socialComment = socialCommentTemplate.cloneNode(true);
  const socialPicture = socialComment.querySelector(`.social__picture`);
  socialPicture.setAttribute(`src`, comment.avatar);
  socialPicture.setAttribute(`alt`, comment.name);
  socialComment.querySelector(`.social__text`).textContent = comment.message;
  return socialComment;
};
const fragmentComment = document.createDocumentFragment();
for (let i = 1; i < comments.length; i++) {
  fragmentComment.appendChild(getComment(comments[i]));
}

allSocialComment.appendChild(fragmentComment);

bigPicture.querySelector(`.social__caption`).textContent = photos[1].description;

const socialCommentCount = bigPicture.querySelector(`.social__comment-count`);
socialCommentCount.classList.add(`hidden`);
const socialCommentsLoader = document.querySelector(`.social__comments-loader`);
socialCommentsLoader.classList.add(`hidden`);

/* закрытие большой картинки*/
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

/* функция проверки на дубликаты*/
const findArrayDuplicates = (arr) => {
  let sortedArr = arr.slice().sort();
  let results = [];
  for (let i = 0; i < sortedArr.length - 1; i++) {
    if (sortedArr[i + 1] === sortedArr[i]) {
      results.push(sortedArr[i]);
    }
  }
  return results;
};

/* валидация хэштегов*/
const inputHashtag = document.querySelector(`.text__hashtags`);
inputHashtag.addEventListener(`input`, function (evt) {
  const textHashtag = document.querySelector(`.text__hashtags`).value.trim();
  evt.preventDefault();
  const hashtags = textHashtag.split(` `);
  const hashtagsLength = hashtags.length;
  const re = /^#[A-zА-я\d]+$/;

  for (let i = 0; i < hashtags.length; i++) {
    const isHashtagsValid = re.test(hashtags[i]);
    const hashtagsValuelength = hashtags[i].length;
    if (hashtags[i].substring(0, 1) !== `#`) {
      inputHashtag.setCustomValidity(`каждый хештег должен начинаться с символа #`);
      break;
    }
    if (isHashtagsValid === false) {
      inputHashtag.setCustomValidity(`неправильный символ`);
      break;
    } else {
      inputHashtag.setCustomValidity(``);
    }
    if (hashtagsValuelength > 20) {
      inputHashtag.setCustomValidity(`не больше 20 символов`);
      break;
    } else {
      inputHashtag.setCustomValidity(``);
    }
  }
  if (hashtagsLength > 5) {
    inputHashtag.setCustomValidity(`не больше 5 хэштегов`);
  }

  /* проверка на дубликаты */

  let duplicates = findArrayDuplicates(hashtags);
  if (duplicates.length > 0) {
    inputHashtag.setCustomValidity(`хештеги не должны повторяться`);
  }
  inputHashtag.reportValidity();
});

/* кнопки + и -*/
const scaleControlValue = document.querySelector(`.scale__control--value`);
const imgUploadPreview = document.querySelector(`.img-upload__preview`);
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

const effectLevelValue = document.querySelector(`.effect-level__value`);

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

// функция для установки визуальной позиции слайдера в зависимости от значения
function setSliderPosition(value) {
  pin.style.left = value + `%`;
  depth.style.width = value + `%`;
}
/* наложение эффекта*/
let currentEffect = `none`;

const effectLevel = document.querySelector(`.effect-level`);
effectLevel.classList.add(`hidden`);

/* функция выбора эффекта*/
document.querySelector(`.effects__list`).addEventListener(`change`, function (evt) {
  const effectName = evt.target.value;
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
  }
});
