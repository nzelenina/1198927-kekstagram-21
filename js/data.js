'use strict';
(function () {
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

for (let i = 1; i <= 25; i++) {
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
 // userPicture.querySelector(`.picture__comments`).textContent = photo.comments.length;
  userPicture.querySelector(`.picture__likes`).textContent = photo.likes;
  return userPicture;
};

const bigPicture = document.querySelector(`.big-picture`);

bigPicture.querySelector(`.comments-count`).textContent = comments.length;
bigPicture.querySelector(`.likes-count`).textContent = photos[1].likes;

const bigPictureImg = bigPicture.querySelector(`.big-picture__img`);
//bigPictureImg.setAttribute(`src`, photos[1].url);

const fragment = document.createDocumentFragment();
for (let i = 0; i < photos.length; i++) {
  fragment.appendChild(getUserPicture(photos[i]));
}
allUserPicture.appendChild(fragment);

const socialCommentTemplate = document.querySelector(`#comment`).content.querySelector(`.social__comment`);
const allSocialComment = bigPicture.querySelector(`.social__comments`);

const getComment = function (comments) {
  const socialComment = socialCommentTemplate.cloneNode(true);
  const socialPicture = socialComment.querySelector(`.social__picture`);
  socialPicture.setAttribute(`src`, comment.avatar);
  socialPicture.setAttribute(`alt`, comment.name);
  socialComment.querySelector(`.social__text`).textContent = comment.message;
  return socialComment;
};
const applyGetComment = function(comments){
const fragmentComment = document.createDocumentFragment();
for (let i = 1; i < comments.length; i++) {
  fragmentComment.appendChild(getComment(comments[i]));
}

allSocialComment.appendChild(fragmentComment);
};

bigPicture.querySelector(`.social__caption`).textContent = photos[1].description;

const socialCommentCount = bigPicture.querySelector(`.social__comment-count`);
socialCommentCount.classList.add(`hidden`);
const socialCommentsLoader = document.querySelector(`.social__comments-loader`);
socialCommentsLoader.classList.add(`hidden`);
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
applyGetComment(comments);
console.log(allSocialComment)

})
}
})();
