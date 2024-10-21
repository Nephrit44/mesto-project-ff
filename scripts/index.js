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
    3.4. Изображение на всеь экран
4. Обработка нажатия на кнопку с плюсом, для открытия всплывающего окна
5. Обработка кнопки закрытия карточки в любом PopUp-окне
6. Обработка кнопки вызова всплывающего окна для редактирования профиля
*/

//1. Глобальные переменные
const cardTemplate = document.querySelector("#card-template").content; //Макет под карточки
const placesList = document.querySelector(".places__list"); //Место куда пихаем
const showPopUpNewcard = document.querySelector(".popup_type_new-card"); //Форма новой карточки
const showPopUpProfile = document.querySelector(".popup_type_edit"); //Форма редактирования профиля
const showPopUpImage = document.querySelector('.popup_type_image'); //Форма для большой картинки

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
    case "card__image":{
      //3.4. Изображение на всеь экран
      showPopUpImage.classList.add('popup_is-opened');
      showPopUpImage.querySelector('.popup__image').src = evt.target.src;
      break;
    }
  }
});

//4. Добавление новой кастомной карточки
document.querySelector(".profile__add-button").addEventListener("click", function () {
    showPopUpNewcard.classList.add("popup_is-opened");

    showPopUpNewcard.addEventListener("submit", function (evt) {
      evt.preventDefault();
      const cardCopy = cardTemplate.querySelector(".card").cloneNode(true); //Сделали копию
      cardCopy.querySelector(".card__image").src = showPopUpNewcard.querySelector('input[name="link"]').value;
      cardCopy.querySelector(".card__title").textContent = showPopUpNewcard.querySelector('input[name="place-name"]').value;
      showPopUpNewcard.querySelector('input[name="link"]').value = '';
      showPopUpNewcard.querySelector('input[name="place-name"]').value = '';
      showPopUpNewcard.classList.remove('popup_is-opened');
      placesList.append(cardCopy);
    });
  });

//5. Обработка кнопки закрытия карточки в любом PopUp-окне
document.querySelector(".page__content").addEventListener('click', function(evt){

  const popUppopup_form_collection = document.querySelectorAll('.popup');

  popUppopup_form_collection.forEach((element) => {
    element.querySelector('.popup__close').addEventListener('click', function (evt){
      element.classList.remove('popup_is-opened');
    })
  })

})

//6. Изменение профиля карточки
document.querySelector(".profile__edit-button").addEventListener("click", function () {
    showPopUpProfile.classList.add("popup_is-opened"); 
    //Вставляем в открывшуюся форму текущие значения
    showPopUpProfile.querySelector(".popup__input_type_name").value = document.querySelector(".profile__title").textContent;
    showPopUpProfile.querySelector(".popup__input_type_description").value = document.querySelector(".profile__description").textContent;
      
        showPopUpProfile.addEventListener("submit", function (evt) {
      evt.preventDefault();
      
      document.querySelector(".profile__title").textContent = showPopUpProfile.querySelector(".popup__input_type_name").value;
      document.querySelector(".profile__description").textContent = showPopUpProfile.querySelector(".popup__input_type_description").value;  
      showPopUpProfile.querySelector(".popup__input_type_name").value = '';
      showPopUpProfile.querySelector(".popup__input_type_description").value = '';  
      showPopUpProfile.classList.remove("popup_is-opened"); 
    })
  });

