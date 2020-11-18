"use strict";

(function () {
  let focusableElements = [];

  // обработчик события нажатия кнопки
  const tabKeyHandler = function (evt) {
    // если надали tab
    if (evt.keyCode === window.KEY_TAB) {
      evt.preventDefault();

      // отфильтровываем скрытые элементы
      focusableElements = focusableElements.filter(function (element) {
        return element.offsetWidth > 0 && element.offsetHeight > 0;
      });

      // находим индекс элемента, в котором сейчас находится фокус
      const currentFocusableIndex = focusableElements.findIndex(function (element) {
        return element === evt.target;
      });

      // если элемент не найден в массиве, или в данный момент фокус в последнем элементе
      if (
        currentFocusableIndex < 0 || currentFocusableIndex === focusableElements.length - 1
      ) {
        // то ставим фокус на первый элемент
        focusableElements[0].focus();
      } else {
        // ставим в фокус в следущий эелемент
        focusableElements[currentFocusableIndex + 1].focus();
      }
    }
  };

  window.lockTab = function (root) {
    // находим элементы, на которые возможно установить фокус
    focusableElements = Array.from(root.querySelectorAll(`input:not(:disabled), button:not(:disabled), [tabindex]`));

    // навешиваем обработчик
    document.addEventListener(`keydown`, tabKeyHandler);
  };

  // отключение лока таба
  window.unlockTab = function () {
    focusableElements = [];
    document.removeEventListener(`keydown`, tabKeyHandler);
  };
})();
