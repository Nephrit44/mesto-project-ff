// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

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
initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteElement));
});

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

  return cardElement;
}

//4. Обработка удаления указанного элемента
function deleteElement (element){
  element.remove();
} 