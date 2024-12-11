export { createCard, onLikeCard, onDeleteCard };

const basicConfig = {
  templateCard: "#card-template", //Заготовка под карточку
  basicCard: ".card", //Клон карточки из заготовки
  placeForImage: ".card__image", //Место на карточке под картинку
  basicCardName: ".card__title", //Заголовок на карточке
  basicCardDeleteButton: ".card__delete-button", //Кнопка для удаления на карточке
  basicCardDeleteButtonHide: "card__delete-button-hide", //Свойство скрывания кнопки удаления не своей карточки
  basicCardLikeButton: ".card__like-button", //Кнопка лайков на карточке
  basicCardLikeCouner: ".card__like-count", //Счётчик лайков на карточке
  basicCardLikeUnlike: "card__like-button_is-active", //Статус Лайка. Чёрное сердце
};

const cardTemplate = document.querySelector(basicConfig.templateCard).content;

function createCard(
  cardData,
  onDeleteCard,
  onLikeCard,
  openImagePopup,
  curentUserID,
  cardDeleteFunction,
  cardLikeFunction,
  cardDislikeFunction
) {
  const copyCard = cardTemplate
    .querySelector(basicConfig.basicCard)
    .cloneNode(true);
  const cardImage = copyCard.querySelector(basicConfig.placeForImage);
  const cardTitle = copyCard.querySelector(basicConfig.basicCardName);
  const cardDeleteButton = copyCard.querySelector(
    basicConfig.basicCardDeleteButton
  );
  const cardLikeButton = copyCard.querySelector(
    basicConfig.basicCardLikeButton
  );
  const cardLikeCounter = copyCard.querySelector(
    basicConfig.basicCardLikeCouner
  );

  cardTitle.textContent = cardData.name; //Имя картинки
  cardImage.src = cardData.link; //Ссылка на картинку
  cardImage.alt = cardData.name; //Альтернативное описание картинки
  if (typeof cardData.likes.length === "undefined") {
    cardLikeCounter.textContent = 0;
  } else {
    cardLikeCounter.textContent = cardData.likes.length; //Количество лайков
  }

  //Если ID пользователя получение при загрузке профиля совпадает с ID из базы
  //добавляем слушалку на уделение, если нет прячем

  if (curentUserID == cardData.owner._id) {
    cardDeleteButton.addEventListener("click", () =>
      onDeleteCard(copyCard, cardDeleteFunction, cardData)
    );
  } else {
    cardDeleteButton.classList.add(basicConfig.basicCardDeleteButtonHide);
  }

  //Сморит дела ли я лайки ранее и если да, то красим
  const chekRepeat = findDouble(cardData, curentUserID);
  if (chekRepeat) {
    cardLikeButton.classList.add(basicConfig.basicCardLikeUnlike);
  }

  cardLikeButton.addEventListener("click", () => {
    const chekRepeat = findDouble(cardData, curentUserID);
    if (chekRepeat) {
      onDislikeCard(cardData, cardDislikeFunction, cardLikeButton, cardData.likes.length, cardLikeCounter)
      cardLikeButton.classList.remove(basicConfig.basicCardLikeUnlike);
    } else {
      //Нет. Ставим
      onLikeCard(cardData, cardLikeFunction, cardLikeButton, cardData.likes.length, cardLikeCounter);
      cardLikeButton.classList.add(basicConfig.basicCardLikeUnlike);
    }
  });

  cardImage.addEventListener("click", () => openImagePopup(cardData));

  return copyCard;
}

//Удаление элемента
function onDeleteCard(element, cardDeleteFunction, cardData) {
  const resultFunction = cardDeleteFunction(cardData._id, element);
}

//Для лайкания карточки
function onLikeCard(cardData, cardLikeFunction, cardLikeButton, curentLikeCounter, cardLikeCounter) {
  const cardLikeAddReport = cardLikeFunction(cardData._id);
  cardLikeButton.classList.add(basicConfig.basicCardLikeUnlike);
  cardLikeCounter.textContent = curentLikeCounter + 1;
}

//Для дизлайкания карточки
function onDislikeCard(cardData, cardDislikeFunction, cardLikeButton, curentLikeCounter, cardLikeCounter) {
  const cardDislikeAddReport = cardDislikeFunction(cardData._id);
  cardLikeButton.classList.remove(basicConfig.basicCardLikeUnlike);
  cardLikeCounter.textContent = curentLikeCounter - 1;
}

//Функция поиска уже установденных мною лайков
function findDouble(cardArray, curentUserID) {
  for (let i = 0; i <= cardArray.likes.length - 1; i++) {
    if (cardArray.likes[i]._id === curentUserID) {
      return true;
    }
  }

  /*
  Для себя:
  При попытке использовать forEach в этом файле в заголовке появляется вот такая строка
  import { forEach } from "core-js/core/array";
  После её добавления весь проект падает. Решения, пока, нет.
  Обращай внимание если появляется ошибка:
  ERROR in ./src/scripts/card.js 1:0-45
  Module not found: Error: Can't resolve 'core-js/core/array' in '/home/igor/Документы/mesto-project-ff/src/scripts'
  */
}
