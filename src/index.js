import { initialCards } from "./scripts/cards.js";
import { createCard } from "./scripts/card.js";
import { loadProfileData } from "./scripts/card.js";
import { updateProfileData } from "./scripts/card.js";

import { openPopup } from "./scripts/modal.js";

import "./pages/index.css";

export { onDeleteCard, openImagePopup };

const placesList = document.querySelector(".places__list"); //Место куда вставляются карточки
const profileEditButton = document.querySelector(".profile__edit-button"); //слушалка для редактирования профиля
const popupImage = document.querySelector(".popup_type_image"); //Ищем модалку для картинок

const formsTypeEdit = document.forms["edit-profile"]; //Ищем модалку для редактирования профиля
const popupUserNameInput = formsTypeEdit.name; //Поле для имени в модалке
const popupUserDescriptionInput = formsTypeEdit.description; //Поле для описания пользователя
const currentUserName = document.querySelector(".profile__title"); //Текущее имя пользоваля
const currentUserDescription = document.querySelector(".profile__description"); //Текущее описание профиля

const popupNewCard = document.querySelector(".popup_type_new-card"); //Ищем модалку для новой карточки

//console.log(popupUserDescriptionInput)

//Загрузка списка карточек из базы
initialCards.forEach((cardData) => {
  placesList.append(
    createCard(cardData, onDeleteCard, onLikeCard, openImagePopup)
  );
});

//Слушалка нажатия на редактирование профиля
profileEditButton.addEventListener("click", function () {
  const $_curentPopup = document.querySelector(".popup_type_edit");
  popupUserNameInput.value = currentUserName.textContent;
  popupUserDescriptionInput.value = currentUserDescription.textContent;
  openPopup($_curentPopup);
});

//Создание новой карточки
const profileAddButton = document.querySelector(".profile__add-button");
profileAddButton.addEventListener("click", function (e) {
  const $_curentPopup = document.querySelector(".popup_type_new-card");
  resetUserData($_curentPopup);
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
  popupImage.querySelector(".popup__image").src = cardData.querySelector(".card__image").src;
  popupImage.querySelector(".popup__image").alt = cardData.querySelector(".card__title").textContent;
  popupImage.querySelector(".popup__caption").textContent = cardData.querySelector(".card__title").textContent;
  openPopup(popupImage);
}

//Слушалка на модальные формы
function modalFormClickListener(curentForm, actionfunction){
  curentForm.addEventListener("click", function(e){
    console.log(e);
  })
}


//Отправляем данные на форму
function saveUserDataFromPopupToPage(){
  currentUserName.textContent = popupUserNameInput.value;
  currentUserDescription.textContent = popupUserDescriptionInput.value
}