import { initialCards } from "./scripts/cards.js";
import { showSelectedIMG } from "./scripts/card.js";
import { createCard } from "./scripts/card.js";
import { loadProfileData } from "./scripts/card.js";
import { updateProfileData } from "./scripts/card.js";
//import { addUserCard } from "./scripts/card.js";

import { closePopUpByButton } from "./scripts/modal.js";
import { closePopUpByESC } from "./scripts/modal.js";
import { closePopUpByOverlay } from "./scripts/modal.js";
import { openPopup } from "./scripts/modal.js";

import "./pages/index.css";

export { onDeleteCard, openImagePopup };

const placesList = document.querySelector(".places__list"); //Место куда пихаем карточки
initialCards.forEach((cardData) => {
  placesList.append(
    createCard(cardData, onDeleteCard, onLikeCard, openImagePopup)
  );
});

//Слушатель нажатия на кнопку для редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", function () {
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

  openPopup($_curentPopup);
  closePopUpByButton($_curentPopup);
  closePopUpByESC($_curentPopup);
  closePopUpByOverlay($_curentPopup);
  loadProfileData($_curentPopup);
  updateProfileData($_curentPopup);
});

const profileAddButton = document.querySelector(".profile__add-button");
profileAddButton.addEventListener("click", function () {
  /*
      Новая карточка
      1. Получить соответствующий попап и показать его
      3. Обработать кнопку закрытия по крестику
      4. Обработка закрытия по любому месту кроме формы попапа
      5. Обработка закрытия по кнопке ESC
      6. Обработка кнопки save
      */
  const $_curentPopup = document.querySelector(".popup_type_new-card");
  resetUserData($_curentPopup);
});

const cardImageButton = document.querySelectorAll(".card__image");
cardImageButton.forEach((item) => {
  item.addEventListener("click", function (e) {
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
    openPopup($_curentPopup);
    //closePopUpByButton($_curentPopup);
    //closePopUpByESC($_curentPopup);    closePopUpByOverlay($_curentPopup);
    showSelectedIMG(
      $_curentPopup,
      e.target.src,
      e.target.parentElement.querySelector(".card__title").textContent
    );
  });
});

//Удаление элемента
function onDeleteCard(element) {
  element.remove();
}
//Для лайкания карточки
function onLikeCard(copyCard) {
  copyCard
    .querySelector(".card__like-button")
    .classList.toggle("card__like-button_is-active");
}
//Для увеличения карточки
function openImagePopup(cardData) {
  console.log("Картинка увеличилась")
}

//Сброс полей с пользовательскими данными
function resetUserData(curentPopup) {
  curentPopup.querySelector('input[name="place-name"]').value = "";
  curentPopup.querySelector('input[name="link"]').value = "";
  addUserCard(curentPopup, placesList);
  openPopup(curentPopup);
}
