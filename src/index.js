import { initialCards } from "./scripts/cards.js";
import { createCard, onLikeCard, onDislikeCard, onDeleteCard, cardBasicConfig } from "./scripts/card.js";
import { openPopup, closePopup, popupCloseByOverlay } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { callFetch } from "./scripts/api.js";
import "./pages/index.css";

export { openImagePopup };
//Общие переменные
const placesList = document.querySelector(".places__list"); //Место куда вставляются карточки
const profileEditButton = document.querySelector(".profile__edit-button"); //Кнопка редактирование профиля
const newCardAddButton = document.querySelector(".profile__add-button"); //Кнопка создание карточки

//Переменные для запросов
let curentUserID = "";
const userURL = "users/me/";
const cardURL = "cards/";
const cardLikes = "cards/likes/"

//Параметры для валидации
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
  //Удаление карточки
  windowDelete: ".popup_type_confirmation_delete", //Окно для подтверждения удаления
  showElement: "popup_is-opened", //Вывод элемента на экран
  confirmationDeleteButton: ".popup__confirmation-button", //Кнопка подтверждения удаления

  errorUpdateUserData: "Произошла ошибка при сохранении данных пользователя",
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
const onPageUserName = document.querySelector(basicConfig.onPageUserName);
const onPageUserDescription = document.querySelector(
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

//Слушалка нажатия на редактирование профиля
profileEditButton.addEventListener("click", function () {
  popupUserNameInput.value = onPageUserName.textContent;
  popupUserDescriptionInput.value = onPageUserDescription.textContent;
  openPopup(popupEditProfile);
});

//Модалка удаления выбранной карточки
const windowForDelete = document.querySelector(basicConfig.windowDelete);
const buttonConfirmationDelete = windowForDelete.querySelector(
  basicConfig.confirmationDeleteButton
);
const windowForDeleteCloseButton = windowForDelete.querySelector(
  basicConfig.buttonClose
);
addAnimated(windowForDelete); //Анимация на окно
popupCloseByOverlay(windowForDelete); //Закрытия окна по оверлею
windowForDeleteCloseButton.addEventListener("click", function () {
  clearValidation(formsTypeEdit, validationConfig);
  closePopup(windowForDelete); //Закрытие окна по крестику
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
  let sendData = {
    name: popupUserNameInput.value,
    about: popupUserDescriptionInput.value,
  };
  try {
    let updateUserData = callFetch(userURL, "PATCH", sendData);

    updateUserData.then((resolve) => {
      onPageUserName.textContent = sendData.name;
      onPageUserDescription.textContent = sendData.about;
      closePopup(popupEditProfile);
    });
  } catch (error) {
    alert(basicConfig.errorUpdateUserData + error);
  }
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
  let sendData = {
    name: popupNewPlaceInput.value,
    link: popupNewLinkInput.value,
  };
  try {
    let test = callFetch(cardURL, "POST", sendData);
    test.then((resolve) => {
      placesList.prepend(
        createCard(
          resolve,
          onDeleteCard,
          cardLikes,
          openImagePopup,
          curentUserID,
          cardDeleteFunction,
          cardLikeFunction
        )
      );
      closePopup(popupNewCard);
    });
  } catch (error) {
    alert(cardBasicConfig.errorCreateCard + error);
  }
}

//Функция удаления выбранной карточки
const cardDeleteFunction = function createPopupConfirmatinDelete(
  cardID,
  removedElemetn
) {
  windowForDelete.classList.add(basicConfig.showElement);
  buttonConfirmationDelete.addEventListener("click", function () {
    callFetch(cardURL + cardID, "DELETE");
    removedElemetn.remove();
    closePopup(windowForDelete);
  });
};

function cardLikeFunction(cardData, cardLikeButton, cardLikeCounter, cardLikes) {
  const chekLiked = cardLikeButton.classList.contains(cardBasicConfig.basicCardLikeUnlike);
  if (chekLiked) {
    onDislikeCard(cardData, cardLikeButton, cardLikeCounter, cardLikes);
  } else {
    onLikeCard(cardData, cardLikeButton, cardLikeCounter, cardLikes);
  }
}

enableValidation(validationConfig);

//================================================= API =========================================================

Promise.all([callFetch(userURL, "GET"), callFetch(cardURL, "GET")])
  .then(([user, cards]) => {
    onPageUserName.textContent = user.name;
    onPageUserDescription.textContent = user.about;
    curentUserImage.src = user.avatar;
    curentUserID = user._id;

    cards.forEach((cardData) => {
      placesList.append(
        createCard(
          cardData,
          onDeleteCard,
          cardLikes,
          openImagePopup,
          curentUserID,
          cardDeleteFunction,
          cardLikeFunction
        )
      );
    });
  })
  .catch((err) => {
    basicConfig.onPageUserName = "Не найден";
    basicConfig.onPageUserDescription = "Не найден";

    initialCards.forEach((card) => {
      placesList.append(
        createCard(card, onDeleteCard, openImagePopup)
      );
    });
  });