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
  cardLikeCounter.textContent = cardData.likes.length; //Количество лайков

  //Если ID пользователя получение при загрузке профиля совпадает с ID из базы
  //добавляем слушалку на уделение, если нет прячем

  if (curentUserID == cardData.owner._id) {
    cardDeleteButton.addEventListener("click", () =>
      onDeleteCard(copyCard, cardDeleteFunction, cardData)
    );
  } else {
    cardDeleteButton.classList.add(basicConfig.basicCardDeleteButtonHide);
  }

  /*Если с моим ID в массиве лайков уже что-то есть. закрасить сердце
  Дополнительно проверяю, что бы lik'ов было не ноль. Иначе length не работает
  */
  if(cardData.likes.length != 0 && curentUserID == cardData.likes[0]._id){
    cardLikeButton.classList.add(basicConfig.basicCardLikeUnlike);
  } else {
    cardLikeButton.classList.remove(basicConfig.basicCardLikeUnlike);
  }
  cardLikeButton.addEventListener("click", () =>
    onLikeCard(
      cardData,
      cardLikeFunction,
      cardLikeButton,
      cardData.likes.length
    )
  );
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
  const test = cardLikeFunction(cardData._id);
  cardLikeButton.classList.add(basicConfig.basicCardLikeUnlike);
  ardLikeCounter.textContent = curentLikeCounter + 1;
}

//Удаление элемента
function onDeleteCard(element, cardDeleteFunction, cardData) {
  const resultFunction = cardDeleteFunction(cardData._id, element);
}
