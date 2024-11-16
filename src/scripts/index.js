import { initialCards } from "./cards.js";
import { showPopup } from "./popup/show_popup.js";
import { closePopUp_by_button } from "./popup/close_popup_by_button.js";
import { closePopUp_by_ESC } from "./popup/close_popup_by_esc.js";
import { closePopUp_by_freespace } from "./popup/close_popup_by_freespace.js";
import { load_profile_data } from "./load_user_data.js";
import { update_profile_data } from "./update_user_data.js"

import "../pages/index.css";

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
  //console.log(e.target.parentElement.querySelector(".profile__title").textContent);

  switch (e.target.classList.value) { //Определяем, что за кнопку я нажал

    case "profile__edit-button": {
      /*
      Редактирование профиля
      1. Получить соответствующий попап и показать его +
      3. Обработать кнопку закрытия по крестику
      4. Обработка закрытия по любому месту кроме формы попапа
      5. Обработка закрытия по кнопке ESC
      6. Получить данные со страницы и вставить в попап
      7. Обработка кнопки save
      */
      const $_curentPopup = document.querySelector(".popup_type_edit");

      showPopup($_curentPopup);
      closePopUp_by_button($_curentPopup); 
      closePopUp_by_ESC($_curentPopup); 
      closePopUp_by_freespace($_curentPopup); 
      load_profile_data($_curentPopup);
      update_profile_data($_curentPopup); 
      break;
    }

    case "profile__add-button": {
      addClass_ShowModal1("popup_type_new-card");
      break;
    }
    case "card__image": {
      addClass_ShowModal1(
        "popup_type_image",
        e.target.src,
        e.target.parentElement.lastChild.textContent
      );
      break;
    }
  }
});




function addClass_ShowModal(modal, currentIMG, cardDescription) {
  const $_modal = document.querySelector(`.${modal}`);
  //console.log(currentIMG)





  //В этом же окне вешаем слушалку на открытое окно и закрываем если кликнул за пределы form


  //Ищем картинку и  подпись
  if (currentIMG !== "undefined") {
    $_modal.querySelector(".popup__image").src = currentIMG;
    $_modal.querySelector(".popup__caption").textContent = cardDescription;
  }
}


