import { onDeleteCard } from "../index.js";

export {
  showSelectedIMG,
  createCard,
  loadProfileData,
  updateProfileData,
};

import {
  closePopUpByButton,
  closePopUpByESC,
  closePopUpByOverlay,
  openPopup,
  closePopup,
} from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content; //Макет под карточки
const newCardForm = document.forms["new-place"]; //Форма в новой карточке

console.log(newCardForm);

function createCard(cardData, onDeleteCard, onLikeCard, openImagePopup) {
  const copyCard = cardTemplate.querySelector(".card").cloneNode(true); //Сделали копию карточки
  const cardImage = copyCard.querySelector(".card__image"); //Нашли картинку
  const cardTitle = copyCard.querySelector(".card__title"); //Нашли заголовок
  const cardDeleteButton = copyCard.querySelector(".card__delete-button"); //Нашли кнопку с удалением
  const cardLikeButton = copyCard.querySelector(".card__like-button"); //Нашли кнопку для лайков

  cardTitle.textContent = cardData.name; //Имя картинки
  cardImage.src = cardData.link; //Ссылка на картинку
  cardImage.alt = cardData.name; //Alt на картинку, такой же как Имя

  cardDeleteButton.addEventListener('click', () => onDeleteCard(copyCard));
  cardLikeButton.addEventListener('click', () => onLikeCard(copyCard));
  cardImage.addEventListener('click', () => openImagePopup(copyCard));

  return copyCard;
}











function showSelectedIMG(curentPopup, currentCardIMG, currentCardTitle) {
  curentPopup.querySelector(".popup__image").src = currentCardIMG;
  curentPopup.querySelector(".popup__caption").textContent = currentCardTitle;
}

//Функция подгрузки текущей информации в открытое окно по редактированию профиля
function loadProfileData(curentPopup) {
  const profTitle = document.querySelector(".profile__title").textContent;
  const profDescrition = document.querySelector(
    ".profile__description"
  ).textContent;

  curentPopup.querySelector('input[name="name"]').value = profTitle;
  curentPopup.querySelector('input[name="description"]').value = profDescrition;
}

function updateProfileData(curentPopup) {
  /*
    1. Слушаем кнопку и реагируем на неё
    2. Получаем информация о input в текущем окне c помощью form
    3. Обновляем данные на страничке
    4. Закрываем форму
    */
  curentPopup.addEventListener("submit", function (e) {
    e.preventDefault();
    const new_user_title = document.forms["edit-profile"].name.value;
    const new_user_description =
      document.forms["edit-profile"].description.value;
    document.querySelector(".profile__title").textContent = new_user_title;
    document.querySelector(".profile__description").textContent =
      new_user_description;
    closePopup(curentPopup);
  });
}

/*
function addUserCard(curentPopup, placesList) {
  //closePopUpByButton(curentPopup);
  //closePopUpByESC(curentPopup);
  //closePopUpByOverlay(curentPopup);

  
  const $_placeName = newCardForm["place-name"].value; //Значение имени из формы новая карточка
  const $_link = newCardForm.link.value; //Значение ссылки из формы новая карточка

  console.log($_placeName)

  newCardForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newCard = {};

    newCard.name = $_placeName;
    newCard.link = $_link;

    placesList.prepend(createCard(newCard, func_deleteElement));
    closePopup(curentPopup);
  });
}
*/