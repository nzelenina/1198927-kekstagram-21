const messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const names = ['Артем', 'Марья', 'Василий', 'Савелий', 'Валентина', 'Игорь'];
const comments = [];
const photos = [];

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

for (let i = 0; i <= getRandomInteger(1, 4); i++) {
  const comment = {
    avatar: `img/avatar ${getRandomInteger(1, 6)} .svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names)
  }
  comments.push(comment)
}

for (let i = 0; i < 25; i++) {
  const object = {
    url: `photos/${i}.jpg`,
    likes: getRandomInteger(15, 200),
    description: ' aaaa',
    comments: comments
  }
  photos.push(object)
}

const allUserPicture = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const getUserPicture = function(photos) {
  const userPicture = userPictureTemplate.cloneNode(true);
  const pictureImg = userPicture.querySelector('.picture__img');
  const image = photos.url;
  pictureImg.setAttribute('src', image);
  userPicture.querySelector('.picture__comments').textContent = photos.comments.length;
  userPicture.querySelector('.picture__likes').textContent = photos.likes;

 return userPicture;
}
const fragment = document.createDocumentFragment();
for ( let i = 1; i < photos.length; i++) {
  fragment.appendChild(getUserPicture(photos[i]));
}
  allUserPicture.appendChild(fragment);
