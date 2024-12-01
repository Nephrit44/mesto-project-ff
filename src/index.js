import { initialCards } from "./scripts/cards.js";
import { createCard, onLikeCard, onDeleteCard } from "./scripts/card.js";
import { openPopup, closePopup, popupCloseByOverlay } from "./scripts/modal.js";
import "./pages/index.css";

export {  openImagePopup };
//Общие переменные
const placesList = document.querySelector(".places__list"); //Место куда вставляются карточки
const profileEditButton = document.querySelector(".profile__edit-button"); //Кнопка редактирование профиля
const newCardAddButton = document.querySelector(".profile__add-button"); //Кнопка создание карточки

//Модалка увеличение картинки
const popupImageForm = document.querySelector(".popup_type_image"); //Окно показа увеличенной картинки
const popupImageFormCloseButton = popupImageForm.querySelector(".popup__close"); //Кнопка закрытия окна с увеличенной картинкой

const popupImageTitle = popupImageForm.querySelector(".popup__caption");  //Место для описания в модальном окне
const popupImageLink = popupImageForm.querySelector(".popup__image"); //Место на ссылку в модальном окне

addAnimated(popupImageForm); //Анимация на окно
popupCloseByOverlay(popupImageForm); //Закрытия окна по оверлею
popupImageFormCloseButton.addEventListener("click", function(){closePopup(popupImageForm)}); //Закрытие окна по крестику

//Модалка редактирование профиля
const popupEditProfile = document.querySelector(".popup_type_edit");  //Окно редактирования профиля
const formsTypeEdit = document.forms["edit-profile"]; //Форма редактирования профиля
const popupProfileCloseButton = popupEditProfile.querySelector(".popup__close"); //Кнопка закрытия окна редактирвоания профиля
const popupUserNameInput = formsTypeEdit.name; //Новое имя профиля
const popupUserDescriptionInput = formsTypeEdit.description; //новое описание профиля
const currentUserName = document.querySelector(".profile__title"); //Текущее имя профиля
const currentUserDescription = document.querySelector(".profile__description"); //Текущее описание профиля
addAnimated(popupEditProfile); //Анимация на окно
popupCloseByOverlay(popupEditProfile); //Закрытия окна по оверлею
modalFormClickListener(formsTypeEdit, popupEditProfile, saveUserDataFromPopupToPage); //Submit в окне редактивароя профиля
popupProfileCloseButton.addEventListener("click", function(){closePopup(popupEditProfile)}); //Закрытие окна по крестику

//Модалка новая карточка
const popupNewCard = document.querySelector(".popup_type_new-card");//Модалка для редактирования профиля
const popupNewCardCloseButton = popupNewCard.querySelector(".popup__close"); //Кнопка закрытия окна создания новой карточки
const formsNewCard = document.forms["new-place"]; //Форма создания новой карточки
const popupNewPlaceInput = formsNewCard["place-name"]; //Название новой карточки
const popupNewLinkInput = formsNewCard.link; //Ссылка на изображение для карточки
addAnimated(popupNewCard); //Анимация на окно
popupCloseByOverlay(popupNewCard); //Закрытия окна по оверлею
modalFormClickListener(formsNewCard, popupNewCard, createNewUserCard); //Submit в окне новая карточка
popupNewCardCloseButton.addEventListener("click", function(){closePopup(popupNewCard)}); //Закрытие окна по крестику

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

//======================================== ВАЛИДАЦИЯ ========================================

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add('form__input-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove('form__input-error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}; 

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
    });
  });
}; 

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();