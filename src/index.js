import { initialCards } from "./scripts/cards.js";
import { createCard } from "./scripts/card.js";

import { openPopup, closePopup, popupCloseButton, popupCloseByESC, popupCloseByOverlay } from "./scripts/modal.js";

import "./pages/index.css";

export { onDeleteCard, openImagePopup };
//Общие переменные
const placesList = document.querySelector(".places__list"); //Место куда вставляются карточки
const profileEditButton = document.querySelector(".profile__edit-button"); //Кнопка редактирование профиля
const newCardAddButton = document.querySelector(".profile__add-button"); //Кнопка создание карточки

//Модалка увеличение картинки
const popupImage = document.querySelector(".popup_type_image"); //Модалка для показа увеличенной картинки
addAnimated(popupImage);
popupCloseByESC(popupImage);
popupCloseByOverlay(popupImage);
const popupImageCloseButton = popupImage.querySelector(".popup__close"); //Кнопка закрытия окна с увеличенной картинкой
popupCloseButton(popupImageCloseButton, popupImage);

//Модалка редактирование профиля
const popupEditProfile = document.querySelector(".popup_type_edit");//Модалка для редактирования профиля
addAnimated(popupEditProfile);
popupCloseByESC(popupEditProfile);
popupCloseByOverlay(popupEditProfile);
const popupProfileCloseButton = popupEditProfile.querySelector(".popup__close"); //Кнопка закрытия окна редактирвоания профиля
popupCloseButton(popupProfileCloseButton, popupEditProfile);

const formsTypeEdit = document.forms["edit-profile"];
const popupUserNameInput = formsTypeEdit.name;
const popupUserDescriptionInput = formsTypeEdit.description;
const currentUserName = document.querySelector(".profile__title");
const currentUserDescription = document.querySelector(".profile__description");

//Модалка новая карточка
const popupNewCard = document.querySelector(".popup_type_new-card");//Модалка для редактирования профиля
addAnimated(popupNewCard);
popupCloseByESC(popupNewCard);
popupCloseByOverlay(popupNewCard);
const popupNewCardCloseButton = popupNewCard.querySelector(".popup__close"); //Кнопка закрытия окна редактирвоания профиля
popupCloseButton(popupNewCardCloseButton, popupNewCard);
const formsNewCard = document.forms["new-place"];
const popupNewPlaceInput = formsNewCard["place-name"];
const popupNewLinkInput = formsNewCard.link;

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
  modalFormClickListener($_curentPopup, saveUserDataFromPopupToPage);
  openPopup($_curentPopup);
});

//Создание новой карточки
newCardAddButton.addEventListener("click", function () {
  const $_curentPopup = document.querySelector(".popup_type_new-card");
  formReset();
  modalFormClickListener($_curentPopup, createNewUserCard);
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
  popupImage.querySelector(".popup__image").src =
    cardData.querySelector(".card__image").src;
  popupImage.querySelector(".popup__image").alt =
    cardData.querySelector(".card__title").textContent;
  popupImage.querySelector(".popup__caption").textContent =
    cardData.querySelector(".card__title").textContent;
  openPopup(popupImage);
}

//Слушалка на модальные формы
function modalFormClickListener(curentForm, actionFunction) {
  curentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    actionFunction();
    closePopup(curentForm);
  });
}

//Выводим новые данные пользователя на страницу
function saveUserDataFromPopupToPage() {
  currentUserName.textContent = popupUserNameInput.value;
  currentUserDescription.textContent = popupUserDescriptionInput.value;
}

//Сброс формы в Default
function formReset() {
  formsNewCard.reset();
}

//Добавление стиля с плавностями
function addAnimated(form){
  form.classList.add("popup_is-animated");
}

//Создание пользовательской карточки
function createNewUserCard(){
  const newCardObject = {
    name: popupNewPlaceInput.value,
    link: popupNewLinkInput.value
  }
  placesList.prepend(
    createCard(newCardObject, onDeleteCard, onLikeCard, openImagePopup)
  );
}