'use strict';

(function () {
  const allUserPictures = document.querySelector(`.pictures`);
  const userPictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

  window.renderUserPicture = function (photo) {
    const userPicture = userPictureTemplate.cloneNode(true);
    const pictureImg = userPicture.querySelector(`.picture__img`);
    const image = photo.url;
    pictureImg.setAttribute(`src`, image);

    userPicture.querySelector(`.picture__likes`).textContent = photo.likes;

    userPicture.addEventListener('click', function (evt) {
      evt.preventDefault();
      showFullPhoto(photo);
    })

    return userPicture;
  };

  window.renderPicturesList = function (photos) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < photos.length; i++) {
      fragment.appendChild(renderUserPicture(photos[i]));
    }
    allUserPictures.appendChild(fragment);
  }

  window.allUserPictures = allUserPictures
})();
