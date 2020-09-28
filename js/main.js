var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var names = ['Артем', 'Марья', 'Василий', 'Савелий', 'Валентина', 'Игорь'];
var comments = [];
var photos = [];

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(array) {
  return array[getRndInteger(0, array.length - 1)];
}

for (var i = 0; i <= getRndInteger(1, 4); i++) {
  var comment = {
    avatar: 'img/avatar-' + getRndInteger(1, 6) + '.svg',
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names)
  }
  comments.push(comment)
}

for (var i = 0; i < 25; i++) {
  var object = {
    url: 'photos/' + i + '.jpg',
    likes: getRndInteger(15, 200),
    description: ' aaaa',
    comments: comments
  }
  photos.push(object)
}

var allUserPicture = document.querySelector('.pictures');
var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var getUserPicture = function(photos) {
  var userPicture = userPictureTemplate.cloneNode(true);
  var pictureImg = userPicture.querySelector('.picture__img');
  var image = photos.url;
  pictureImg.setAttribute('src', image);
  userPicture.querySelector('.picture__comments').textContent = photos.comments;
  userPicture.querySelector('.picture__likes').textContent = photos.likes;

 return userPicture;
}
var fragment = document.createDocumentFragment();
for ( i = 1; i < photos.length; i++) {
  fragment.appendChild(getUserPicture(photos[i]));
}
  allUserPicture.appendChild(fragment);
