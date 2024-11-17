import { initialCards } from "./scripts/cards.js";
import {
  showSelectedIMG,
  createCard,
  loadProfileData,
  updateProfileData,
  addUserCard,
  deleteElement,
} from "./scripts/card.js";

import {
  closePopUpByButton,
  closePopUpByESC,
  closePopUpByOverlay,
  showPopUp,
} from "./scripts/modal.js";

import "./pages/index.css";

const placesList = document.querySelector(".places__list"); //Место куда пихаем карточки
initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteElement));
});

//Функция навешивания слушалок для открытия модальных окон

document.addEventListener("click", function (e) {

  switch (
    e.target.classList.value //Определяем, что за кнопку я нажал
  ) {
    case "profile__edit-button": {
      /*
      Редактирование профиля
      1. Получить соответствующий попап и показать его
      3. Обработать кнопку закрытия по крестику
      4. Обработка закрытия по любому месту кроме формы попапа
      5. Обработка закрытия по кнопке ESC
      6. Получить данные со страницы и вставить в попап
      7. Обработка кнопки save
      */
      const $_curentPopup = document.querySelector(".popup_type_edit");

      showPopUp($_curentPopup);
      closePopUpByButton($_curentPopup);
      closePopUpByESC($_curentPopup);
      closePopUpByOverlay($_curentPopup);
      loadProfileData($_curentPopup);
      updateProfileData($_curentPopup);
      break;
    }

    case "profile__add-button": {
      /*
      Новая карточка
      1. Получить соответствующий попап и показать его
      3. Обработать кнопку закрытия по крестику
      4. Обработка закрытия по любому месту кроме формы попапа
      5. Обработка закрытия по кнопке ESC
      6. Обработка кнопки save
      */
      const $_curentPopup = document.querySelector(".popup_type_new-card");
      showPopUp($_curentPopup);
      closePopUpByButton($_curentPopup);
      closePopUpByESC($_curentPopup);
      closePopUpByOverlay($_curentPopup);
      addUserCard($_curentPopup, placesList);
      break;
    }
    case "card__image": {
      /*
      Клик по картинке
      1. Получить соответствующий попап и показать его
      2. Обработать кнопку закрытия по крестику
      3. Обработка закрытия по любому месту кроме формы попапа
      4. Обработка закрытия по кнопке ESC
      5. Получить данные о картинке
      6. Получить описание о картинке
      7. Внести их в поля попап
      */
      const $_curentPopup = document.querySelector(".popup_type_image");
      showPopUp($_curentPopup);
      closePopUpByButton($_curentPopup);
      closePopUpByESC($_curentPopup);
      closePopUpByOverlay($_curentPopup);
      showSelectedIMG(
        $_curentPopup,
        e.target.src,
        e.target.parentElement.querySelector(".card__title").textContent
      );
      break;
    }
  }
});
