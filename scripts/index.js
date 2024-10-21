// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

/*
    СОДЕРЖАНИЕ:
1. Глобальные переменные
2. Вывод преустановленныех карточек на экран.
3. Функционал для работы с карточками
    3.1. Удаление карточек
    3.2. Поставить лайк
    3.3. Снять лайк
4. Обработка нажатия на кнопку с плюсом, для открытия всплывающего окна
5. Обработка кнопки сохранить во всплывающих окнах
    5.1. Добавление новой карточки
    5.2. Изменение профиля карточки
6. Обработка кнопки закрытия карточки в любом PopUp-окне
7. Обработка кнопки вызова всплывающего окна для редактирования профиля
*/

//1. Глобальные переменные
const cardTemplate = document.querySelector("#card-template").content; //Макет под карточки
const placesList = document.querySelector(".places__list"); //Место куда пихаем
const showPopUpNewcard = document.querySelector(".popup_type_new-card"); //Форма новой карточки
const showPopUpProfile = document.querySelector(".popup_type_edit"); //Форма редактирования профиля

//2. Вывод преустановленныех карточек на экран.
function loadCardCollection(initialCards) {
  initialCards.forEach((element) => {
    const cardCopy = cardTemplate.querySelector(".card").cloneNode(true); //Сделали копию
    cardCopy.querySelector(".card__image").src = element.link;
    cardCopy.querySelector(".card__title").textContent = element.name;
    placesList.append(cardCopy);
  });
}
loadCardCollection(initialCards); //вызов - Покажи все карты, которые есть в базе

//3. Функционал для работы с карточками
placesList.addEventListener("click", function (evt) {
  switch (evt.target.classList.value) {
    case "card__delete-button": {
      //3.1. Удаление карточек
      evt.target.parentElement.remove();
      break;
    }
    case "card__like-button": {
      //3.2. Поставить лайк
      evt.target.classList.add("card__like-button_is-active");
      break;
    }
    case "card__like-button card__like-button_is-active": {
      //3.3. Снять лайк
      evt.target.classList.remove("card__like-button_is-active");
      break;
    }
  }
});

//4. Обработка нажатия на кнопку с плюсом, для открытия всплывающего окна
document
  .querySelector(".profile__add-button")
  .addEventListener("click", function () {
    showPopUpNewcard.classList.add("popup_is-opened");
    pressSaveButton_in_popUp(showPopUpNewcard.dataset.formname); //Работа с вызванной формой + передача имени формы
  });

//5. Обработка кнопки сохранить во всплывающих окнах
function pressSaveButton_in_popUp(formName) {
  switch (formName) {
    case "newCard":
      {
        //5.1. Добавление новой карточки
        const openedFormNow = document.querySelector(
          `[data-formname="${formName}"]`
        );
        openedFormNow.addEventListener("submit", function (evt) {
          evt.preventDefault();
          const cardCopy = cardTemplate.querySelector(".card").cloneNode(true); //Сделали копию
          cardCopy.querySelector(".card__image").src =
            openedFormNow.querySelector('input[name="link"]').value;
          cardCopy.querySelector(".card__title").textContent =
            openedFormNow.querySelector('input[name="place-name"]').value;
          placesList.append(cardCopy);
        });
      }
      break;
    case "editProfile":
      {
        //5.2. Изменение профиля карточки

        const openedFormNow = document.querySelector(
          `[data-formname="${formName}"]`
        );
        openedFormNow.addEventListener("submit", function (evt) {
          evt.preventDefault();
          document.querySelector(".profile__title").textContent =
            openedFormNow.querySelector(".popup__input_type_name").value;
          document.querySelector(".profile__description").textContent =
            openedFormNow.querySelector(".popup__input_type_description").value;
          openedFormNow.classList.remove("popup_is-opened");
        });
      }
      break;
  }
}

//6. Обработка кнопки закрытия карточки в любом PopUp-окне
const popUpClose = document.querySelectorAll(".popup__close");
popUpClose.forEach((element) => {
  element.addEventListener("click", function () {
    const openedFormPopUp = document.querySelector(
      `[data-formname = "${element.dataset.closeform}"]`
    );
    openedFormPopUp.classList.remove("popup_is-opened");
  });
});

//7. Обработка кнопки вызова всплывающего окна для редактирования профиля
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", function () {
    showPopUpProfile.classList.add("popup_is-opened"); //Работа с вызванной формой + передача имени формы
    pressSaveButton_in_popUp(showPopUpProfile.dataset.formname);
    //Вставляем в открывшуюся форму текущие значения
    showPopUpProfile.querySelector(".popup__input_type_name").value =
      document.querySelector(".profile__title").textContent;
    showPopUpProfile.querySelector(".popup__input_type_description").value =
      document.querySelector(".profile__description").textContent;
  });