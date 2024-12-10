import { forEach } from "core-js/core/array";

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
  cardLikeFunction
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
  }else{
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
  };

  console.log(cardData)
  /*
    1. Нажал на сердце +
    2. Посмотри есть ли в like твой ID, второй постановки like не допускается.
    3. Нет лайка - ставь и крась сердце 
  */
   if(curentUserID == cardData.owner._id){

    cardLikeButton.classList.add(basicConfig.basicCardLikeUnlike);
    cardLikeButton.addEventListener("click", () =>
      onLikeCard(
        cardData,
        cardLikeFunction,
        cardLikeButton,
        cardData.likes.length,
      )
    );
  } else {
    cardLikeButton.classList.remove(basicConfig.basicCardLikeUnlike);
  }

  cardImage.addEventListener("click", () => openImagePopup(cardData));

  return copyCard;
}

//Для лайкания карточки
function onLikeCard(
  cardData,
  cardLikeFunction,
  cardLikeButton,
  curentLikeCounter
) {
  //const cardLikeAddReport = cardLikeFunction(cardData._id);

    //cardLikeButton.classList.add(basicConfig.basicCardLikeUnlike);
    //cardLikeCounter.textContent = curentLikeCounter + 1;

}

//Удаление элемента
function onDeleteCard(element, cardDeleteFunction, cardData) {
  const resultFunction = cardDeleteFunction(cardData._id, element);
}


//Проверка ставил ли я лайк ранее
function checkingMyLikesForReplays(cardData, curentUserID) {
  cardData.forEach((value) => {
    console.log(value)
  })
}