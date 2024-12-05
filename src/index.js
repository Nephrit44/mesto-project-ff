import { initialCards } from "./scripts/cards.js";
import { createCard, onLikeCard, onDeleteCard } from "./scripts/card.js";
import { openPopup, closePopup, popupCloseByOverlay } from "./scripts/modal.js";
import { enableValidation, isValid, showInputError, hideInputError, disableButtonsubmit, enableButtonsubmit, clearValidation } from "./scripts/validation.js"
import "./pages/index.css";

export { openImagePopup };
//Общие переменные
const placesList = document.querySelector(".places__list"); //Место куда вставляются карточки
const profileEditButton = document.querySelector(".profile__edit-button"); //Кнопка редактирование профиля
const newCardAddButton = document.querySelector(".profile__add-button"); //Кнопка создание карточки

const validationConfig = {
  formSelector: ".popup__form", //Формы в которых ищем
  inputSelector: ".popup__input", //Инпуты в формах
  submitButtonSelector: ".popup__button", //Кнопки submit
  inactiveButtonClass: "popup__button_disabled", //Кнопки submit в состоянии блокитровки
  inputErrorClass: "popup__input_type_error", //Оформление ошибки
  errorClass: ".popup__error_visible", //Скорее всего это span для сообщений
};

//Модалка увеличение картинки
const popupImageForm = document.querySelector(".popup_type_image"); //Окно показа увеличенной картинки
const popupImageFormCloseButton = popupImageForm.querySelector(".popup__close"); //Кнопка закрытия окна с увеличенной картинкой

const popupImageTitle = popupImageForm.querySelector(".popup__caption"); //Место для описания в модальном окне
const popupImageLink = popupImageForm.querySelector(".popup__image"); //Место на ссылку в модальном окне

addAnimated(popupImageForm); //Анимация на окно
popupCloseByOverlay(popupImageForm); //Закрытия окна по оверлею
popupImageFormCloseButton.addEventListener("click", function () {
  closePopup(popupImageForm);
}); //Закрытие окна по крестику

//Модалка редактирование профиля
const popupEditProfile = document.querySelector(".popup_type_edit"); //Окно редактирования профиля
const formsTypeEdit = document.forms["edit-profile"]; //Форма редактирования профиля
const popupProfileCloseButton = popupEditProfile.querySelector(".popup__close"); //Кнопка закрытия окна редактирвоания профиля
const popupUserNameInput = formsTypeEdit.name; //Новое имя профиля
const popupUserDescriptionInput = formsTypeEdit.description; //новое описание профиля
const currentUserName = document.querySelector(".profile__title"); //Текущее имя профиля
const currentUserDescription = document.querySelector(".profile__description"); //Текущее описание профиля
addAnimated(popupEditProfile); //Анимация на окно
popupCloseByOverlay(popupEditProfile); //Закрытия окна по оверлею
modalFormClickListener(
  formsTypeEdit,
  popupEditProfile,
  saveUserDataFromPopupToPage
); //Submit в окне редактивароя профиля
popupProfileCloseButton.addEventListener("click", function () {
  clearValidation(formsTypeEdit, validationConfig);
  closePopup(popupEditProfile);
}); //Закрытие окна по крестику

//Модалка новая карточка
const popupNewCard = document.querySelector(".popup_type_new-card"); //Модалка для редактирования профиля
const popupNewCardCloseButton = popupNewCard.querySelector(".popup__close"); //Кнопка закрытия окна создания новой карточки
const formsNewCard = document.forms["new-place"]; //Форма создания новой карточки
const popupNewPlaceInput = formsNewCard["place-name"]; //Название новой карточки
const popupNewLinkInput = formsNewCard.link; //Ссылка на изображение для карточки
addAnimated(popupNewCard); //Анимация на окно
popupCloseByOverlay(popupNewCard); //Закрытия окна по оверлею
modalFormClickListener(formsNewCard, popupNewCard, createNewUserCard); //Submit в окне новая карточка
popupNewCardCloseButton.addEventListener("click", function () {
  clearValidation(formsTypeEdit, validationConfig);
  closePopup(popupNewCard);
}); //Закрытие окна по крестику

//Загрузка списка карточек из базы
initialCards.forEach((cardData) => {
  placesList.append(
    createCard(cardData, onDeleteCard, onLikeCard, openImagePopup)
  );
});

//Слушалка нажатия на редактирование профиля
profileEditButton.addEventListener("click", function () {
  popupUserNameInput.value = currentUserName.textContent;
  popupUserDescriptionInput.value = currentUserDescription.textContent;
  openPopup(popupEditProfile);
});

//Создание новой карточки
newCardAddButton.addEventListener("click", function () {
  formNewCardReset();
  openPopup(popupNewCard);
});

//Для увеличения карточки
function openImagePopup(cardData) {
  popupImageTitle.textContent = cardData.name;
  popupImageLink.src = cardData.link;
  popupImageLink.alt = cardData.name;
  openPopup(popupImageForm);
}

//Слушалка на модальные формы
function modalFormClickListener(curentForm, curentModalWindow, actionFunction) {
  curentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    actionFunction();
    closePopup(curentModalWindow);
  });
}

//Выводим новые данные пользователя на страницу
function saveUserDataFromPopupToPage() {
  currentUserName.textContent = popupUserNameInput.value;
  currentUserDescription.textContent = popupUserDescriptionInput.value;
  closePopup(popupEditProfile);
}

//Сброс формы в Default
function formNewCardReset() {
  formsNewCard.reset();
}

//Добавление стиля с плавностями
function addAnimated(form) {
  form.classList.add("popup_is-animated");
}

//Создание пользовательской карточки
function createNewUserCard() {
  const newCardObject = {
    name: popupNewPlaceInput.value,
    link: popupNewLinkInput.value,
  };
  placesList.prepend(
    createCard(newCardObject, onDeleteCard, onLikeCard, openImagePopup)
  );
}

enableValidation(validationConfig);
