import { initialCards } from "./scripts/cards.js";
import { createCard, onLikeCard, onDeleteCard } from "./scripts/card.js";
import { openPopup, closePopup, popupCloseByOverlay } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  apiGETRequest,
  apiPATCHRequest,
  apiPOSTRequest,
} from "./scripts/api.js";
import "./pages/index.css";

export { openImagePopup };
//Общие переменные
let userID = ""; //Пользовательское ID
const placesList = document.querySelector(".places__list"); //Место куда вставляются карточки
const profileEditButton = document.querySelector(".profile__edit-button"); //Кнопка редактирование профиля
const newCardAddButton = document.querySelector(".profile__add-button"); //Кнопка создание карточки

const apiParametrs = {
  pathProfile: "https://nomoreparties.co/v1/wff-cohort-28/users/me/",
  pathCardCollection: "https://nomoreparties.co/v1/wff-cohort-28/cards/",
};

const validationConfig = {
  formSelector: ".popup__form", //Формы в которых ищем
  inputSelector: ".popup__input", //Инпуты в формах
  submitButtonSelector: ".popup__button", //Кнопки submit
  inactiveButtonClass: "popup__button_disabled", //Кнопки submit в состоянии блокитровки
  inputErrorClass: "popup__input_type_error", //Полоска в input
  errorClass: "popup__error_visible", //Span сообщение
};

const basicConfig = {
  //Элементы на странице
  onPageUserName: ".profile__title", //Текущее имя профиля
  onPageUserDescription: ".profile__description", //Текущее описание профиля
  onPageUserAvatar: ".profile__image", //Текущая фотка пользователя
  //Редактирование профиля
  windowEditProfile: ".popup_type_edit", //Окно редактирования профиля
  formEditProfile: "edit-profile", //Форма в окне редактирования профиля
  //Увеличенное изображение
  windowImage: ".popup_type_image", //Окно показа увеличенной картинки
  formImageTitle: ".popup__caption", //Место для описания в модальном окне
  formImageLink: ".popup__image", //Место на ссылку в модальном окне
  //Создание новой карточки
  windowNewCard: ".popup_type_new-card", //Окно для новой карточки
  counterLike: ".card__like-count", //Для счётчика лайков
  //Остальные элементы
  buttonClose: ".popup__close",
  windowAnimated: "popup_is-animated",
};

//Модалка увеличение картинки
const popupImageForm = document.querySelector(basicConfig.windowImage);
const popupImageFormCloseButton = popupImageForm.querySelector(
  basicConfig.buttonClose
);
const popupImageTitle = popupImageForm.querySelector(
  basicConfig.formImageTitle
);
const popupImageLink = popupImageForm.querySelector(basicConfig.formImageLink);
addAnimated(popupImageForm); //Анимация на окно
popupCloseByOverlay(popupImageForm); //Закрытия окна по оверлею
popupImageFormCloseButton.addEventListener("click", function () {
  closePopup(popupImageForm);
}); //Закрытие окна по крестику

//Модалка редактирование профиля
const popupEditProfile = document.querySelector(basicConfig.windowEditProfile);
const formsTypeEdit = document.forms[basicConfig.formEditProfile];
const popupProfileCloseButton = popupEditProfile.querySelector(
  basicConfig.buttonClose
);
const popupUserNameInput = formsTypeEdit.name; //Новое имя профиля
const popupUserDescriptionInput = formsTypeEdit.description; //новое описание профиля
const currentUserName = document.querySelector(basicConfig.onPageUserName);
const currentUserDescription = document.querySelector(
  basicConfig.onPageUserDescription
);
const curentUserImage = document.querySelector(basicConfig.onPageUserAvatar);

addAnimated(popupEditProfile); //Анимация на окно
popupCloseByOverlay(popupEditProfile); //Закрытия окна по оверлею
modalFormClickListener(
  formsTypeEdit,
  popupEditProfile,
  saveUserDataFromPopupToPage
);
//Submit в окне редактивароя профиля
popupProfileCloseButton.addEventListener("click", function () {
  clearValidation(formsTypeEdit, validationConfig);
  closePopup(popupEditProfile); //Закрытие окна по крестику
});

//Модалка новая карточка
const popupNewCard = document.querySelector(basicConfig.windowNewCard);
const popupNewCardCloseButton = popupNewCard.querySelector(
  basicConfig.buttonClose
);
const formsNewCard = document.forms["new-place"]; //Форма создания новой карточки
const popupNewPlaceInput = formsNewCard["place-name"]; //Название новой карточки
const popupNewLinkInput = formsNewCard.link; //Ссылка на изображение для карточки
addAnimated(popupNewCard); //Анимация на окно
popupCloseByOverlay(popupNewCard); //Закрытия окна по оверлею
modalFormClickListener(formsNewCard, popupNewCard, createNewUserCard);
//Submit в окне новая карточка
popupNewCardCloseButton.addEventListener("click", function () {
  clearValidation(formsTypeEdit, validationConfig);
  closePopup(popupNewCard); //Закрытие окна по крестику
});

//Модалка запрос на удаление
const popupConfirmDelete = document.querySelector(basicConfig.windowDelete);

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
  const saveServerUserProfile = apiPATCHRequest(
    apiParametrs,
    popupUserNameInput.value,
    popupUserDescriptionInput.value
  ); //Отправка на сервер новых данных по профилю
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
  form.classList.add(basicConfig.windowAnimated);
}

//Создание пользовательской карточки
function createNewUserCard() {
  const saveServerUserProfile = apiPOSTRequest(
    apiParametrs.pathCardCollection,
    popupNewPlaceInput.value,
    popupNewLinkInput.value
  ) //Отправка на сервер новых данных по карточке
    .then((res) => {

      console.log(res.likes.length)
      const newCardObject = {
        name: popupNewPlaceInput.value,
        link: popupNewLinkInput.value,
        owner: res.owner,
        like: res.likes.length,
      };
      placesList.prepend(
        createCard(newCardObject, onDeleteCard, onLikeCard, openImagePopup, apiParametrs)
      );
    })
}

enableValidation(validationConfig);

//================================================= API =========================================================
const fromServerUserProfile = await apiGETRequest(apiParametrs.pathProfile); //Получение профиля
const fromServerCardsCollection = await apiGETRequest(apiParametrs.pathCardCollection); //Получение карточек

//Загрузка данных по профилю
userID = fromServerUserProfile._id;
currentUserName.textContent = fromServerUserProfile.name;
currentUserDescription.textContent = fromServerUserProfile.about;
curentUserImage.src = fromServerUserProfile.avatar;

//Загрузка списка карточек из базы
fromServerCardsCollection.forEach((cardData) => {
  placesList.append(
    createCard(cardData, onDeleteCard, onLikeCard, openImagePopup, userID, apiParametrs)
  );
});
