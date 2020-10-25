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
/*кнопки + и -*/

const scaleControlValue = document.querySelector(`.scale__control--value`);
console.log (scaleControlValue.value);
const imgUploadPreview = document.querySelector(`.img-upload__preview`);
const scaleControlBigger = document.querySelector(`.scale__control--bigger`);

scaleControlBigger.addEventListener(`click`, function(evt) {
const currentValue = Number.parseInt (scaleControlValue.value)
if (currentValue < 100){
scaleControlValue.value = (currentValue + 25) + `%`;
const scale = (currentValue + 25) / 100;
console.log(scaleControlValue.value);
console.log(scale);
imgUploadPreview.style.transform = `scale(${scale})`;
}
});
const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);

scaleControlSmaller.addEventListener(`click`, function(evt){
const currentValue = Number.parseInt (scaleControlValue.value)
  if (currentValue > 0) {
scaleControlValue.value = (currentValue) - 25 + `%`;
const scale = (currentValue - 25) / 100;
console.log(scale);
 console.log(scaleControlValue.value);
 imgUploadPreview.style.transform = `scale(${scale})`;
}
});
/*наложение эффекта*/

let currentEffect = `none`;

  const effectLevel = document.querySelector(`.effect-level`);
  effectLevel.classList.add (`hidden`);
  /*функция выбора эффекта*/
document.querySelector('.effects__list').addEventListener('change', function (evt) {
  const effectName = evt.target.value
  imgUploadPreview.classList.remove(`effects__preview--${currentEffect}`);
  currentEffect =  effectName;
   imgUploadPreview.classList.add(`effects__preview--${effectName}`);
 effectLevel.classList.remove(`hidden`);

});
/* перемещение ползунка*/
var isDragging = false

/* сохраняем ссылку на пин */
var pin = document.querySelector('.effect-level__pin')

// сохраняем ссылка на трек(элемент, в котоом живёт и движется пин)
var track = document.querySelector('.effect-level__line')
var depth = track.querySelector('.effect-level__depth')

// нажимаем на пин – включаем режим "тащим"
pin.addEventListener('mousedown', (e) => {
  isDragging = true
})

// когда отпускаем кнопку – выключаем режим "тащим"
document.addEventListener('mouseup', () => {
  isDragging = false
})
 const effectLevelValue = document.querySelector(`.effect-level__value`);

// двигаем мышкой по документу
document.addEventListener('mousemove', (e) => {

  if (isDragging) {
    // если режим "тащим" включен, то считаем положение пина
    let pos = e.pageX - track.getBoundingClientRect().x
    let percentage = (pos / track.offsetWidth) * 100

    if (percentage < 0) {
      percentage = 0
    }

    if (percentage > 100) {
      percentage = 100
    }

    pin.style.left = percentage + '%'
    depth.style.width = percentage + '%'
    console.log(percentage);
   console.log(percentage);
   effectLevelValue.value = percentage;
  console.log(effectLevelValue.value);


 /*условие выбранного еффекта*/
 if (currentEffect === `chrome`) {
   const grayScale = percentage * 1 / 100;
console.log(grayScale);
imgUploadPreview.style.filter = `grayscale(${grayScale}`;
};
 if (currentEffect === `sepia`) {
   const sepia = percentage * 1 / 100;
imgUploadPreview.style.filter = `sepia(${sepia}`;
};
 if (currentEffect === `marvin`) {
   const invert = percentage + `%`;
imgUploadPreview.style.filter = `invert(${invert}`;
};
 if (currentEffect === `phobos`) {
   const blur = percentage * 3 / 100 + `px`;
imgUploadPreview.style.filter = `blur(${blur}`;
};
 if (currentEffect === `heat`) {
   const brightness = percentage * 3 / 100;
imgUploadPreview.style.filter = `brightness(${brightness}`;
};

 }
});


