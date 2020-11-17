'use strict';

(function() {
  const allUserPictures = document.querySelector(`.pictures`);
  const userPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

  const renderUserPicture = function(photo) {
    const userPicture = userPictureTemplate.cloneNode(true);
    const pictureImg = userPicture.querySelector(`.picture__img`);
    const image = photo.url;
    pictureImg.setAttribute(`src`, image);

    userPicture.querySelector(`.picture__likes`).textContent = photo.likes;
    userPicture.querySelector(`.picture__comments`).textContent = photo.comments.length;
    userPicture.addEventListener(`click`, function(evt) {
      evt.preventDefault();
      window.showFullPhoto(photo);

    });

    return userPicture;
  };
  window.renderUserPicture = renderUserPicture;
  const fragment = document.createDocumentFragment();
  window.fragment = fragment;
  const renderPicturesList = function(photos) {

    for (let i = 0; i < photos.length; i++) {
      fragment.appendChild(renderUserPicture(photos[i]));
    }
    allUserPictures.appendChild(fragment);
  };
  window.renderPicturesList = renderPicturesList;
  window.allUserPictures = allUserPictures;
  // удаление картинок
  function removePictures() {
    const pictures = document.querySelectorAll(`.picture`);
    for (let i = 0; i < pictures.length; i++) {
      pictures[i].remove();
    }
  }
  window.removePictures = removePictures;
  //загрузка
  window.backend.load(function(response) {
    window.photos = response;
    (window.renderPicturesList(response));
    // появляется меню фильтров
    window.imgFilter.classList.remove(`img-filters--inactive`);

  }, function() {
    window.errorHandler(`произошла ошибка`);
  });
})();
