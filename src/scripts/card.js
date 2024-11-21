
export { createCard, onLikeCard, onDeleteCard };

const cardTemplate = document.querySelector("#card-template").content; //Макет под карточки

function createCard(cardData, onDeleteCard, onLikeCard, openImagePopup) {
  const copyCard = cardTemplate.querySelector(".card").cloneNode(true); //Сделали копию карточки
  const cardImage = copyCard.querySelector(".card__image"); //Нашли картинку
  const cardTitle = copyCard.querySelector(".card__title"); //Нашли заголовок
  const cardDeleteButton = copyCard.querySelector(".card__delete-button"); //Нашли кнопку с удалением
  const cardLikeButton = copyCard.querySelector(".card__like-button"); //Нашли кнопку для лайков

  cardTitle.textContent = cardData.name; //Имя картинки
  cardImage.src = cardData.link; //Ссылка на картинку
  cardImage.alt = cardData.name; //Альтернативное описание картинки

  cardDeleteButton.addEventListener('click', () => onDeleteCard(copyCard));
  cardLikeButton.addEventListener('click', () => onLikeCard(cardLikeButton));
  cardImage.addEventListener('click', () => openImagePopup(copyCard));

  return copyCard;
}

//Для лайкания карточки
function onLikeCard(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

//Удаление элемента
function onDeleteCard(element) {
  element.remove();
}