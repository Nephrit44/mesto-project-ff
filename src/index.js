import { createCard } from "./scripts/card.js";
import { openPopup, closePopup, popupCloseByOverlay } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { callFetch } from "./scripts/api.js";
import "./pages/index.css";

const cardVariables = {
  cardDataID: "",
  cardElement: "",
};

const basicConfig = {
  // ======================== Общие параметры
  cardList: ".places__list", //Место куда вставляются карточки
  showElement: "popup_is-opened", //Вывод элемента на экран
  buttonClose: ".popup__close",
  windowAnimated: "popup_is-animated",

  // ======================== Редактирование профиля
  userProfileEditButton: ".profile__edit-button", //Кнопка редактирование профиля
  windowEditProfile: ".popup_type_edit", //Окно редактирования профиля
  formEditProfile: "edit-profile", //Форма в окне редактирования профиля
  onPageUserName: ".profile__title", //Текущее имя профиля
  onPageUserDescription: ".profile__description", //Текущее описание профиля

  // ======================== Увеличенное изображение
  windowImage: ".popup_type_image", //Окно показа увеличенной картинки
  formImageTitle: ".popup__caption", //Место для описания в модальном окне
  formImageLink: ".popup__image", //Место на ссылку в модальном окне

  // ======================== Создание новой карточки
  createNewCardButton: ".profile__add-button", //Кнопка создание карточки
  windowNewCard: ".popup_type_new-card", //Окно для новой карточки
  counterLike: ".card__like-count", //Для счётчика лайков

  // ======================== Удаление карточки
  onPageUserAvatar: ".profile__image", //Текущая фотка пользователя
  windowDelete: ".popup_type_confirmation_delete", //Окно для подтверждения удаления
  confirmationDeleteButton: ".popup__confirmation-button", //Кнопка подтверждения удаления

  // ======================== Редактирование карточки профиля
  windowAvatar: ".popup_type_avatar-card", //Окно для ввода нового URL на аватарку
  formAvatarProfile: "new-avatar", //Форма в окне для новой аватарки

  // ======================== Ошибки
  errorUpdateUserData: "Произошла ошибка при сохранении данных пользователя. ",
  errorUpdateUserAvatar:
    "Произошла ошибка при обновлении аватарки пользователя. ",
  errorNoUserAvatar: "./images/avatar.jpg",
  errorGetCards: "Данные с карточками не получены. ",
  errorDeleteCard: "При попытке удалить карточку, произошла ошибка. ",
  errorLikeCard: "Произошла ошибка при попытке Лайкнуть карту. ",
  errorDislikeCard: "Произошла ошибка при попытке снять Лайк с карты. ",
  // ======================== Сообщения на элементах
  messageButtonLoading: "Сохранение...",
  messageButtonDefault: "Сохранить",
};

// =============================== Параметры для валидации ==================================
const validationConfig = {
  formSelector: ".popup__form", //Формы в которых ищем
  inputSelector: ".popup__input", //Инпуты в формах
  submitButtonSelector: ".popup__button", //Кнопки submit
  inactiveButtonClass: "popup__button_disabled", //Кнопки submit в состоянии блокитровки
  inputErrorClass: "popup__input_type_error", //Полоска в input
  errorClass: "popup__error_visible", //Span сообщение
};

// =============================== Общие переменные =========================================
const placesList = document.querySelector(basicConfig.cardList);
const profileEditButton = document.querySelector(
  basicConfig.userProfileEditButton
);
const placeForUserAvatar = document.querySelector(basicConfig.onPageUserAvatar);

// =============================== Переменные для API запросов ==============================
let curentUserID = "";
const userURL = "users/me/";
const cardURL = "cards/";
const cardLikesURL = "cards/likes/";
const userAvatar = "avatar/";

// ================================ Модалка увеличение картинки =============================
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
//Закрытие окна по крестику
popupImageFormCloseButton.addEventListener("click", function () {
  closePopup(popupImageForm);
});
//Для увеличения карточки
function imagePopupShow(cardData) {
  popupImageTitle.textContent = cardData.name;
  popupImageLink.src = cardData.link;
  popupImageLink.alt = cardData.name;
  openPopup(popupImageForm);
}

// ================================ Модалка редактирование профиля ==========================
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
const popupEditProfileButtonSubmit = popupEditProfile.querySelector(
  validationConfig.submitButtonSelector
);
addAnimated(popupEditProfile); //Анимация на окно
popupCloseByOverlay(popupEditProfile); //Закрытия окна по оверлею
clickListnerOnModalForm(formsTypeEdit, saveUserDataFromPopupToPage);
popupProfileCloseButton.addEventListener("click", function () {
  clearValidation(formsTypeEdit, validationConfig);
  closePopup(popupEditProfile); //Закрытие окна по крестику
});

//Слушалка нажатия на редактирование профиля
profileEditButton.addEventListener("click", function () {
  popupUserNameInput.value = onPageUserName.textContent;
  popupUserDescriptionInput.value = onPageUserDescription.textContent;
  openPopup(popupEditProfile);
});

//Выводим новые данные пользователя на страницу
function saveUserDataFromPopupToPage() {
  const sendData = {
    name: popupUserNameInput.value,
    about: popupUserDescriptionInput.value,
  };
  popupEditProfileButtonSubmit.textContent = basicConfig.messageButtonLoading;
  callFetch(userURL, "PATCH", sendData)
    .then((result) => {
      onPageUserName.textContent = sendData.name;
      onPageUserDescription.textContent = sendData.about;
      closePopup(popupEditProfile);
    })
    .catch((error) => console.log(basicConfig.errorUpdateUserData + rejected))
    .finally(() => {
      popupEditProfileButtonSubmit.textContent =
        basicConfig.messageButtonDefault;
    });
}

// =============================== Модалка новая карточка ===================================
const popupNewCard = document.querySelector(basicConfig.windowNewCard);
const popupNewCardCloseButton = popupNewCard.querySelector(
  basicConfig.buttonClose
);
const newCardAddButton = document.querySelector(
  basicConfig.createNewCardButton
);
const formsNewCard = document.forms["new-place"]; //Форма создания новой карточки
const popupNewPlaceInput = formsNewCard["place-name"]; //Название новой карточки
const popupNewLinkInput = formsNewCard.link; //Ссылка на изображение для карточки
const popupNewCardButtonSubmit = popupNewCard.querySelector(
  validationConfig.submitButtonSelector
);
addAnimated(popupNewCard); //Анимация на окно
popupCloseByOverlay(popupNewCard); //Закрытия окна по оверлею
clickListnerOnModalForm(formsNewCard, createNewUserCard);
popupNewCardCloseButton.addEventListener("click", function () {
  closePopup(popupNewCard); //Закрытие окна по крестику
});
//Создание новой карточки
newCardAddButton.addEventListener("click", function () {
  clearValidation(formsNewCard, validationConfig);
  resetForm(formsNewCard);
  openPopup(popupNewCard);
});
//Создание пользовательской карточки
function createNewUserCard() {
  const sendData = {
    name: popupNewPlaceInput.value,
    link: popupNewLinkInput.value,
  };
  popupNewCardButtonSubmit.textContent = basicConfig.messageButtonLoading;
  callFetch(cardURL, "POST", sendData)
    .then((result) => {
      placesList.prepend(
        createCard(
          result,
          imagePopupShow,
          likeCardFunction,
          curentUserID,
          deleteCard
        )
      );
      closePopup(popupNewCard);
    })
    .catch((error) => console.log(basicConfig.errorUpdateUserAvatar + error))
    .finally(() => {
      popupNewCardButtonSubmit.textContent = basicConfig.messageButtonDefault;
    });
}

//Функция лайкания
function likeCardFunction(
  cardData,
  cardLikeButton,
  cardLikeCounter,
  cardBasicConfig
) {
  const chekLiked = cardLikeButton.classList.contains(
    cardBasicConfig.basicCardLikeUnlike
  );
  if (chekLiked) {
    onDislikeCard(cardData, cardLikeButton, cardLikeCounter, cardBasicConfig);
  } else {
    onLikeCard(cardData, cardLikeButton, cardLikeCounter, cardBasicConfig);
  }
}

// =============================== Модалка удаления выбранной карточки ======================
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
  closePopup(windowForDelete); //Закрытие окна по крестику
});

/*
101. Функция прнимает данные прикрученные к карточке во время создания (100) и сохраняем во временную переменную
и открываем окно для удаления
*/
function deleteCard(cardData, copyCard) {
  cardVariables.cardDataID = cardData._id;
  cardVariables.cardElement = copyCard;
  openPopup(windowForDelete);
}

//102. Слушаем нажатие на кнопку в окне для удаления и передаём данные полученные в 101
buttonConfirmationDelete.addEventListener("click", function () {
  deleteCardFunction(
    cardURL,
    cardVariables.cardDataID,
    cardVariables.cardElement
  );
});

//103. Функция удаления выбранной карточки по данным из 102
function deleteCardFunction(cardURL, cardID, removedElemetn) {
  callFetch(cardURL + cardID, "DELETE")
    .then((result) => {
      removedElemetn.remove();
      closePopup(windowForDelete);
    })
    .catch((error) => {
      console.log(basicConfig.errorDeleteCard + error);
    });
}

// ============================== Модалка редактирования фотографии профиля =================
const windowForChangeAvatar = document.querySelector(basicConfig.windowAvatar);
const windowForChangeAvatarCloseButton = windowForChangeAvatar.querySelector(
  basicConfig.buttonClose
);
const formsAvatarEdit = document.forms[basicConfig.formAvatarProfile];
const newURLUserAvatar = formsAvatarEdit["avatar-link"];
addAnimated(windowForChangeAvatar); //Анимация на окно
popupCloseByOverlay(windowForChangeAvatar); //Закрытия окна по оверлею

placeForUserAvatar.addEventListener("click", function () {
  resetForm(formsAvatarEdit);
  openPopup(windowForChangeAvatar);
});

windowForChangeAvatarCloseButton.addEventListener("click", function () {
  clearValidation(formsAvatarEdit, validationConfig);
  closePopup(windowForChangeAvatar); //Закрытие окна по крестику
});

clickListnerOnModalForm(formsAvatarEdit, saveUserAvatarFromPopupToPage);

//Сохраняем новую аватарку польлзователя
function saveUserAvatarFromPopupToPage() {
  let sendData = {
    avatar: newURLUserAvatar.value,
  };
  callFetch(userURL + userAvatar, "PATCH", sendData)
    .then((result) => {
      popupNewCardButtonSubmit.textContent = basicConfig.messageButtonLoading;
      placeForUserAvatar.style.backgroundImage = "url('" + result.avatar + "')";
      closePopup(windowForChangeAvatar);
    })
    .catch((error) => {
      console.log(basicConfig.errorUpdateUserAvatar + error);
    })
    .finally(() => {
      popupNewCardButtonSubmit.textContent = basicConfig.messageButtonDefault;
    });
}

// ============================= Общие функции =============================================
//Слушалка на модальные формы
function clickListnerOnModalForm(curentForm, actionFunction) {
  curentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    actionFunction();
  });
}

//Сброс формы в Default
function resetForm(formName) {
  formName.reset();
}

//Добавление стиля с плавностями
function addAnimated(form) {
  form.classList.add(basicConfig.windowAnimated);
}

enableValidation(validationConfig);

//================================================= API =========================================================
//Получение текщего пользователя и коллекции карточек
Promise.all([callFetch(userURL, "GET"), callFetch(cardURL, "GET")])

  .then(([user, cards]) => {
    onPageUserName.textContent = user.name;
    onPageUserDescription.textContent = user.about;
    curentUserImage.src = user.avatar;
    curentUserID = user._id;
    placeForUserAvatar.style.backgroundImage = "url('" + user.avatar + "')";

    cards.forEach((cardData) => {
      placesList.append(
        createCard(
          cardData,
          imagePopupShow,
          likeCardFunction,
          curentUserID,
          deleteCard
        )
      );
    });
  })
  .catch((error) => {
    console.log(basicConfig.errorGetCards + error);

    basicConfig.onPageUserName = "Не найден";
    basicConfig.onPageUserDescription = "Не найден";
  });

//Для лайкания карточки
function onLikeCard(
  cardData,
  cardLikeButton,
  cardLikeCounter,
  cardBasicConfig
) {
  callFetch(cardLikesURL + cardData._id, "PUT")
    .then((res) => {
      cardLikeButton.classList.add(cardBasicConfig.basicCardLikeUnlike);
      cardLikeCounter.textContent = res.likes.length;
    })
    .catch((error) => {
      console.log(basicConfig.errorLikeCard + error);
    })
    .finally(() => {});
}

//Для дизлайкания карточки
function onDislikeCard(
  cardData,
  cardLikeButton,
  cardLikeCounter,
  cardBasicConfig
) {
  callFetch(cardLikesURL + cardData._id, "DELETE")
    .then((res) => {
      cardLikeButton.classList.remove(cardBasicConfig.basicCardLikeUnlike);
      cardLikeCounter.textContent = res.likes.length;
    })
    .catch((error) => {
      console.log(basicConfig.errorDislikeCard + error);
    })
    .finally(() => {});
}
