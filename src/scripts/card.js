export { createCard };

const cardBasicConfig = {
  templateCard: "#card-template", //Заготовка под карточку
  basicCard: ".card", //Клон карточки из заготовки
  placeForImage: ".card__image", //Место на карточке под картинку
  basicCardName: ".card__title", //Заголовок на карточке
  basicCardDeleteButton: ".card__delete-button", //Кнопка для удаления на карточке
  basicCardDeleteButtonHide: "card__delete-button-hide", //Свойство скрывания кнопки удаления не своей карточки
  basicCardLikeButton: ".card__like-button", //Кнопка лайков на карточке
  basicCardLikeCouner: ".card__like-count", //Счётчик лайков на карточке
  basicCardLikeUnlike: "card__like-button_is-active", //Статус Лайка. Чёрное сердце
  errorLike: "Во время установки Like, произошла ошибка",
  errorDislike: "Во время удаления Like, произошла ошибка",
  errorCreateCard: "Произошла ошибка при создании карточки",
};

const cardTemplate = document.querySelector(cardBasicConfig.templateCard).content;
function createCard(
  cardData,
  openImagePopup,
  cardLikeFunction,
  curentUserID,
  onDeleteCard,
) {
  const copyCard = cardTemplate
    .querySelector(cardBasicConfig.basicCard)
    .cloneNode(true);
  const cardImage = copyCard.querySelector(cardBasicConfig.placeForImage);
  const cardTitle = copyCard.querySelector(cardBasicConfig.basicCardName);
  const cardDeleteButton = copyCard.querySelector(cardBasicConfig.basicCardDeleteButton);
  const cardLikeButton = copyCard.querySelector(cardBasicConfig.basicCardLikeButton);
  const cardLikeCounter = copyCard.querySelector(cardBasicConfig.basicCardLikeCouner);

  cardTitle.textContent = cardData.name; //Имя картинки
  cardImage.src = cardData.link; //Ссылка на картинку
  cardImage.alt = cardData.name; //Альтернативное описание картинки

  if (typeof cardData.likes.length === "undefined") {
    cardLikeCounter.textContent = 0;
  } else {
    cardLikeCounter.textContent = cardData.likes.length; //Количество лайков
  }

  if (curentUserID != cardData.owner._id) {
    cardDeleteButton.classList.add(cardBasicConfig.basicCardDeleteButtonHide);
  }
  
  //100. "Прикручиваем" функцию для передачитекущих данных к кнопке с корзинкой
  cardDeleteButton.addEventListener("click", function() {
    onDeleteCard(cardData, copyCard);
  });   

  //200. Если ранее лайк стоял. Красим сердце
  if (cardData.likes.some((likeRecord) => likeRecord._id === curentUserID)) {
    cardLikeButton.classList.add(cardBasicConfig.basicCardLikeUnlike);
  }
  /*
  201. создаётся функция в которую прикрепляем текущую карточку, прикрепляем функции с 
  лайком и дизлайком + ссылку где лежат лайки
  */
  cardLikeButton.addEventListener("click", () => {
    cardLikeFunction(cardData, cardLikeButton, cardLikeCounter, cardBasicConfig);
  });

  cardImage.addEventListener("click", () => openImagePopup(cardData));

  return copyCard;
}


