import { initialCards } from "./scripts/cards.js";
import { createCard } from "./scripts/card.js";

import { openPopup } from "./scripts/modal.js";
import { closePopup } from "./scripts/modal.js";

import "./pages/index.css";

export { onDeleteCard, openImagePopup };

const placesList = document.querySelector(".places__list"); //Место куда вставляются карточки
const profileEditButton = document.querySelector(".profile__edit-button"); //слушалка для редактирования профиля
const profileAddButton = document.querySelector(".profile__add-button"); //Слушалка для создания карточки
const popupImage = document.querySelector(".popup_type_image"); //Ищем модалку для картинок

const formsTypeEdit = document.forms["edit-profile"]; 
const popupUserNameInput = formsTypeEdit.name;
const popupUserDescriptionInput = formsTypeEdit.description; 
const currentUserName = document.querySelector(".profile__title");
const currentUserDescription = document.querySelector(".profile__description"); 

const formsNewCard = document.forms["edit-profile"];
const popupNewPlace = formsNewCard["place-name"];
const popupNewLink = formsNewCard.link;


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
  modalFormClickListener($_curentPopup, saveUserDataFromPopupToPage, closePopup)
  openPopup($_curentPopup);
});

//Создание новой карточки
profileAddButton.addEventListener("click", function () {
  const $_curentPopup = document.querySelector(".popup_type_new-card");
  modalFormClickListener($_curentPopup, formReset, closePopup)
  formReset(formsNewCard);
  openPopup($_curentPopup);
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
function modalFormClickListener(curentForm, actionfunction, closePopup){
  curentForm.addEventListener("submit", function(e){
    e.preventDefault();
    actionfunction();
    closePopup(e.target.closest(".popup_type_edit"));
  })
}

//Выводим новые данные пользователя на страницу
function saveUserDataFromPopupToPage(){
  currentUserName.textContent = popupUserNameInput.value;
  currentUserDescription.textContent = popupUserDescriptionInput.value
}

//Сброс формы в Default
function formReset(curentForm){
  curentForm.reset();
}