import { initialCards } from "./cards.js";
import "../pages/index.css";
/*
    СОДЕРЖАНИЕ:

1. Глобальные переменные
2. Вывод карточек на страницу
3. Создание карточек из макета
4. Обработка удаления указанного элемента

*/

//1. Глобальные переменные
const cardTemplate = document.querySelector("#card-template").content; //Макет под карточки
const placesList = document.querySelector(".places__list"); //Место куда пихаем

//2. Вывод карточек на страницу
function loadCard() {
  initialCards.forEach((item) => {
    placesList.append(createCard(item, deleteElement));
  });
}
loadCard();

//3. Создание карточек из макета
function createCard(cardContent, callbackDeleteElement) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); //Сделали копию карточки

  const cardImage = cardElement.querySelector(".card__image"); //Нашли картинку
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.alt;

  const cardTitle = cardElement.querySelector(".card__title"); //Нашли заголовок
  cardTitle.textContent = cardContent.name;

  const deleteButton = cardElement.querySelector(".card__delete-button"); //Нашли кнопку с удалением
  deleteButton.addEventListener("click", function (evt) {
    callbackDeleteElement(evt.target.parentElement);
  });

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (e) {
      e.target.classList.toggle("card__like-button_is-active");
    });

  return cardElement;
}

//4. Обработка удаления указанного элемента
function deleteElement(element) {
  element.remove();
}

//Функция навешивания слушалок для открытия модальных окон

document.addEventListener("click", function (e) {
  //console.log(e.target.parentElement.lastChild.textContent)

  switch (e.target.classList.value) {
    case "profile__edit-button": {
      addClass_ShowModal("popup_type_edit");
      break;
    }
    case "profile__add-button": {
      addClass_ShowModal("popup_type_new-card");
      break;
    }
    case "card__image": {
      addClass_ShowModal("popup_type_image", e.target.src, e.target.parentElement.lastChild.textContent);
      break;
    }
  }

});

function addClass_ShowModal(modal, currentIMG, cardDescription) {
  const $_modal = document.querySelector(`.${modal}`);
  //console.log(currentIMG)

  $_modal.classList.add("popup_is-opened"); //Открываем модалку
  
  const $_btn_close_modal = $_modal.querySelector(".popup__close"); //Ищем крестик
  //Закрытие по кнопке крестик
  $_btn_close_modal.addEventListener(
    "click",
    function () {
      remove_class_for_close($_modal);
    },
    { once: true }
  );

  document.addEventListener(
    "keydown",
    function (e) {
      if (e.key == "Escape" && $_modal.classList.contains("popup_is-opened")) {
        remove_class_for_close($_modal);
      }
    },
    { once: true }
  );

  //В этом же окне вешаем слушалку на открытое окно и закрываем если кликнул за пределы form
  $_modal.addEventListener(
    "click",
    function (e) {
      if (e.target.classList.contains("popup_is-opened")) {
        remove_class_for_close($_modal);
      }
    },
    { once: true }
  );

  //Ищем картинку и  подпись
  if(currentIMG !== 'undefined'){
    $_modal.querySelector('.popup__image').src = currentIMG;
    $_modal.querySelector('.popup__caption').textContent = cardDescription;
  }
}

//Функция подгрузки текущей информации в открытое окно по редактированию профиля
function load_profile_data(edit_modal) {
  const $_userName = document.querySelector(".profile__title").textContent;
  const $_userDescription = document.querySelector(
    ".profile__description"
  ).textContent;

  edit_modal.querySelector('input[name="name"]').value = $_userName;
  edit_modal.querySelector('input[name="description"]').value =
    $_userDescription;
}

//Универсальная цункция закрытия модалок
function remove_class_for_close(openedForm) {
  openedForm.classList.remove("popup_is-opened");
}

const formElement = document.forms["edit-profile"];

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = formElement.elements.name.value;
  const jobInput = formElement.elements.description.value;

  document.querySelector(".profile__title").textContent = nameInput;
  document.querySelector(".profile__description").textContent = jobInput;

  remove_class_for_close(formElement.parentElement.parentElement);
}

formElement.addEventListener("submit", handleFormSubmit);

const formElementNewCard = document.forms["new-place"];

function handleFormSubmit2(evt) {
  evt.preventDefault();

  const cardName = formElementNewCard.elements["place-name"].value;
  const cardLink = formElementNewCard.elements.link.value;

  const $_newUserCaRD = {
    name: cardName,
    link: cardLink,
  };

  initialCards.push($_newUserCaRD);
  loadCard();
  remove_class_for_close(formElement.parentElement.parentElement);
}

formElementNewCard.addEventListener("submit", handleFormSubmit2);
