'use strict';

(function () {
  const bigPicture = document.querySelector(`.big-picture`);

  const bigPhoto = bigPicture.querySelector(`#big-photo`);
  const likesElement = bigPicture.querySelector(`.likes-count`);

  const socialCommentTemplate = document.querySelector(`#comment`).content.querySelector(`.social__comment`);
  const allSocialComment = bigPicture.querySelector(`.social__comments`);

  const renderComment = function (comment) {
    const socialComment = socialCommentTemplate.cloneNode(true);
    const socialPicture = socialComment.querySelector(`.social__picture`);
    socialPicture.setAttribute(`src`, comment.avatar);
    socialPicture.setAttribute(`alt`, comment.name);
    socialComment.querySelector(`.social__text`).textContent = comment.message;
    return socialComment;
  };

  const renderComments = function (comments) {
    const fragmentComment = document.createDocumentFragment();
    for (let i = 1; i < comments.length; i++) {
      fragmentComment.appendChild(renderComment(comments[i]));
    }

    allSocialComment.appendChild(fragmentComment);
  };

  const socialCommentCount = bigPicture.querySelector(`.social__comment-count`);
  socialCommentCount.classList.add(`hidden`);
  const socialCommentsLoader = document.querySelector(`.social__comments-loader`);
  socialCommentsLoader.classList.add(`hidden`);

  /* закрытие большой картинки*/
  const closeBigPicture = bigPicture.querySelector(`#picture-cancel`);
  closeBigPicture.addEventListener(`click`, function () {
    bigPicture.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
  });


  const showFullPhoto = function (photo) {
    bigPhoto.setAttribute(`src`, photo.url);
    renderComments(photo.comments);

    likesElement.textContent = photo.likes;
    bigPicture.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
  };
  window.showFullPhoto = showFullPhoto;
})();
