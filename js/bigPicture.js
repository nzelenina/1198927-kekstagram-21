'use strict';

(function () {
  const DISPLAY_COMMENTS_COUNT = 5;
  const bigPicture = document.querySelector(`.big-picture`);

  const bigPhoto = bigPicture.querySelector(`#big-photo`);
  const likesElement = bigPicture.querySelector(`.likes-count`);
  const descriptionElement = bigPicture.querySelector(`.social__caption`);
  const socialCommentTemplate = document.querySelector(`#comment`).content.querySelector(`.social__comment`);
  const allSocialComment = bigPicture.querySelector(`.social__comments`);

  const renderComment = function (comment) {
    const socialComment = socialCommentTemplate.cloneNode(true);
    const socialPicture = socialComment.querySelector(`.social__picture`);

    // сразу добавляем класс hidden комментарию
    socialComment.classList.add(`hidden`);
    socialPicture.setAttribute(`src`, comment.avatar);
    socialPicture.setAttribute(`alt`, comment.name);
    socialComment.querySelector(`.social__text`).textContent = comment.message;
    return socialComment;
  };

  const renderComments = function (comments) {
    const fragmentComment = document.createDocumentFragment();
    for (let i = 0; i < comments.length; i++) {
      fragmentComment.appendChild(renderComment(comments[i]));
    }

    allSocialComment.textContent = ``;
    allSocialComment.appendChild(fragmentComment);
    const commentsCount = document.querySelector(`.comments-count`);
    commentsCount.textContent = comments.length;
  };

  window.renderComments = renderComments;

  /* закрытие большой картинки*/
  const closeBigPicture = function () {
    // function closeBigPicture() {
    bigPicture.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    window.unlockTab();
  };

  const bigPictureCloseButton = bigPicture.querySelector(`#picture-cancel`);
  bigPictureCloseButton.addEventListener(`click`, function () {
    closeBigPicture();
  });

  document.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 27) {
      closeBigPicture();
    }
  });

  // функция, которая возвращает DOM-элементы скрытых комментариев
  const findHiddenComments = function () {
    return allSocialComment.querySelectorAll(`.social__comment.hidden`);
  };
  const findVisibleComments = function () {
    return allSocialComment.querySelectorAll(`.social__comment:not(.hidden)`);
  };

  // функция, которая показывает следущие N комментариев
  const showNextComments = function () {
    // находим невидимые комментарии
    let hiddenComments = findHiddenComments();
    // если таковые имеются…
    if (hiddenComments.length > 0) {
      hiddenComments = Array.from(hiddenComments); // конвертируем NodesList в обычный массив
      // берём первые 5 элементов…
      const commentsToShow = hiddenComments.slice(0, DISPLAY_COMMENTS_COUNT);

      for (let i = 0; i < commentsToShow.length; i++) {
        // удаляем у них класс hidden
        commentsToShow[i].classList.remove(`hidden`);
      }

      // ещё раз находим невидимые комментарии
      hiddenComments = findHiddenComments();

      // если ещё есть скрытые комментарии
      if (hiddenComments.length > 0) {
        // значит нужно убрать с кнопки класс hidden
        socialCommentsLoader.classList.remove(`hidden`);
      } else {
        // если скрытых нет, то добавить класс hidden
        socialCommentsLoader.classList.add(`hidden`);
      }
      const visibleComments = findVisibleComments();
      document.querySelector(`.comments-visible`).textContent = visibleComments.length;
    }
  };

  const showFullPhoto = function (photo) {
    bigPhoto.setAttribute(`src`, photo.url);
    renderComments(photo.comments);

    // вызываем функцию showNextComments, что бы сразу показать первые 5 комментариев
    showNextComments();

    likesElement.textContent = photo.likes;
    descriptionElement.textContent = photo.description;
    bigPicture.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    window.lockTab(bigPicture);
  };

  const socialCommentsLoader = document.querySelector(`.social__comments-loader`);

  // клик на кнопку
  socialCommentsLoader.addEventListener(`click`, function () {
    showNextComments();

  });

  window.showFullPhoto = showFullPhoto;
})();
