let messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
let names = ['Артем', 'Марья', 'Василий', 'Савелий', 'Валентина', 'Игорь'];
let comments = [];
let photos = [];

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

for (let i = 0; i <= getRandomInteger(1, 4); i++) {
  const comment = {
    avatar: `img/avatar getRandomInteger(1, 6) .svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names)
  }
  comments.push(comment)
}

for (let i = 0; i < 25; i++) {
  const object = {
    url: 'photos/' + i + '.jpg',
    likes: getRandomInteger(15, 200),
    description: ' aaaa',
    comments: comments
  }
  photos.push(object)
}

let allUserPicture = document.querySelector('.pictures');
let userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

let getUserPicture = function(photos) {
  let userPicture = userPictureTemplate.cloneNode(true);
  let pictureImg = userPicture.querySelector('.picture__img');
  let image = photos.url;
  pictureImg.setAttribute('src', image);
  userPicture.querySelector('.picture__comments').textContent = photos.comments;
  userPicture.querySelector('.picture__likes').textContent = photos.likes;

 return userPicture;
}
let fragment = document.createDocumentFragment();
for ( i = 1; i < photos.length; i++) {
  fragment.appendChild(getUserPicture(photos[i]));
}
  allUserPicture.appendChild(fragment);
