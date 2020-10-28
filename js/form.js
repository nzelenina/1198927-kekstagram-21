'use strict';
(function () {
/* функция проверки на дубликаты*/
const findArrayDuplicates = (arr) => {
  let sortedArr = arr.slice().sort();
  let results = [];
  for (let i = 0; i < sortedArr.length - 1; i++) {
    if (sortedArr[i + 1] === sortedArr[i]) {
      results.push(sortedArr[i]);
    }
  }
  return results;
};

/* валидация хэштегов*/
const inputHashtag = document.querySelector(`.text__hashtags`);
inputHashtag.addEventListener(`input`, function (evt) {
  const textHashtag = document.querySelector(`.text__hashtags`).value.trim();
  evt.preventDefault();
  const hashtags = textHashtag.split(` `);
  const hashtagsLength = hashtags.length;
  const re = /^#[A-zА-я\d]+$/;

  for (let i = 0; i < hashtags.length; i++) {
    const isHashtagsValid = re.test(hashtags[i]);
    const hashtagsValuelength = hashtags[i].length;
    if (hashtags[i].substring(0, 1) !== `#`) {
      inputHashtag.setCustomValidity(`каждый хештег должен начинаться с символа #`);
      break;
    }
    if (isHashtagsValid === false) {
      inputHashtag.setCustomValidity(`неправильный символ`);
      break;
    } else {
      inputHashtag.setCustomValidity(``);
    }
    if (hashtagsValuelength > 20) {
      inputHashtag.setCustomValidity(`не больше 20 символов`);
      break;
    } else {
      inputHashtag.setCustomValidity(``);
    }
  }
  if (hashtagsLength > 5) {
    inputHashtag.setCustomValidity(`не больше 5 хэштегов`);
  }

  /* проверка на дубликаты */

  let duplicates = findArrayDuplicates(hashtags);
  if (duplicates.length > 0) {
    inputHashtag.setCustomValidity(`хештеги не должны повторяться`);
  }
  inputHashtag.reportValidity();
});
})();

