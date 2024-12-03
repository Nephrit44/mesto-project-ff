import { initialCards } from "./scripts/cards.js";
import { createCard, onLikeCard, onDeleteCard } from "./scripts/card.js";
import { openPopup, closePopup, popupCloseByOverlay } from "./scripts/modal.js";
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
  errorClass: "popup__error_visible", //??
}

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

//======================================== ВАЛИДАЦИЯ ========================================

const isValid = (options, formElement, inputElement, chekRegular) => {
  //Если прошла проверка стандартная браузерная и регуляркой то ОК иначе не ОК
  if (inputElement.validity.valid === true && chekRegular === true) {
    setButtonSubmit(options, formElement, true);
    hideInputError(options, formElement, inputElement);
  } else {
    showInputError(
      options,
      formElement,
      inputElement,
      inputElement.validationMessage,
      chekRegular
    );
    setButtonSubmit(options, formElement, false);
  }
};

const showInputError = (
  options,
  formElement,
  inputElement,
  errorMessage,
  chekRegular
) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(options.inputErrorClass);

  if (chekRegular === false) { //Если регулярка даёт false - выводим кастомную ошибку
    errorElement.textContent = inputElement.getAttribute("data-regexp-error");
  } else { //иначе default
    errorElement.textContent = errorMessage;
  }
};

const hideInputError = (options, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(options.inputErrorClass);
  errorElement.textContent = "";
};

//Настройка Инпутов
const setEvtListenersInput = (options, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );

  inputList.forEach((inputElement) => {

    inputElement.addEventListener("input", () => {

      isValid(
        options,
        formElement,
        inputElement,
        chekRegular(inputElement.value)
      );
    });
  });
};

//Настройка кнопок Submit в зависимости от валидации
const setButtonSubmit = (options, formElement, buttonStatus) => {
  /*
  options - входные параметры. Что будем искать
  formElement - где будем искать
  buttonStatus - текущее состояние относительно валидации
  */

  const buttonList = Array.from(
    formElement.querySelectorAll(options.submitButtonSelector)
  );

  buttonList.forEach((buttonElement) => {
    if (buttonStatus) {
      buttonElement.classList.remove("popup__button_disabled");
    } else {
      buttonElement.classList.add("popup__button_disabled");
    }
    buttonElement.disabled = !buttonStatus;
  });
};

//Поиск форм
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {
    setEvtListenersInput(options, formElement);
  });
};

function chekRegular(inputText) {
  const regex = /^[a-zа-яё\s\-]+$/i; //Все буквы РУС и ENG, тирешка и пробел
  return regex.test(inputText);
}

function clearValidation(profileForm, validationConfig){
  const errMessage = profileForm.querySelectorAll(validationConfig.inputErrorClass);
  console.log(validationConfig.inputErrorClass);
  errMessage.forEach((element) => {
    console.log(element)
    element.classList.remove(validationConfig.inputErrorClass);
  })
}

enableValidation(validationConfig);
