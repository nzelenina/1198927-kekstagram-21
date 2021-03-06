'use strict';

(function () {
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
  };

  window.renderComments = renderComments;

  /* закрытие большой картинки*/
  const closeBigPicture = bigPicture.querySelector(`#picture-cancel`);
  closeBigPicture.addEventListener(`click`, function () {
    bigPicture.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
  });

  const DISPLAY_COMMENTS_COUNT = 5;

  // функция, которая возвращает DOM-элементы скрытых комментариев
  const findHiddenComments = function () {
    return allSocialComment.querySelectorAll(`.social__comment.hidden`);
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
  };

  const socialCommentsLoader = document.querySelector(`.social__comments-loader`);

  // клик на кнопку
  socialCommentsLoader.addEventListener(`click`, function () {
    showNextComments();
  });

  window.showFullPhoto = showFullPhoto;
})();
