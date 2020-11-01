'use strict';

(function() {
  const messages = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
  const names = [`Артем`, `Марья`, `Василий`, `Савелий`, `Валентина`, `Игорь`];
  /*const comments = [];*/
  const photos = [];

  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomArrayElement(array) {
    return array[getRandomInteger(0, array.length - 1)];
  }

  function generateComments() {
    const comments = []
    for (let i = 0; i <= getRandomInteger(1, 10); i++) {
      const comment = {
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: getRandomArrayElement(messages),
        name: getRandomArrayElement(names)
      };
      comments.push(comment);
    }

    return comments
  }

  for (let i = 1; i <= 25; i++) {
    const object = {
      url: `photos/${i}.jpg`,
      likes: getRandomInteger(15, 200),
      description: ` aaaa`,
      comments: generateComments()
    };
    photos.push(object);
  }

  window.photos = photos;
})();
