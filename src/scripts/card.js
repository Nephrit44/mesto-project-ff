export { createCard, onLikeCard, onDislikeCard, onDeleteCard };
import { callFetch } from "./api.js";

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
  errorLike: "Во время установки Like, произошла ошибка",
  errorDislike: "Во время удаления Like, произошла ошибка",
};

const cardTemplate = document.querySelector(basicConfig.templateCard).content;

function createCard(
  cardData,
  onDeleteCard,
  cardLikes, 
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

  cardLikeButton.addEventListener("click", () => {
    cardLikeFunction(cardData, cardLikeButton, cardLikeCounter, cardLikes);
  });

  cardImage.addEventListener("click", () => openImagePopup(cardData));

  return copyCard;
}

//Удаление элемента
function onDeleteCard(element, cardDeleteFunction, cardData) {
  const resultFunction = cardDeleteFunction(cardData._id, element);
}

//Для лайкания карточки
function onLikeCard(cardData, cardLikeButton,  cardLikeCounter, cardLikes) {
  const cardLikeAddReport = callFetch(cardLikes + cardData._id, "PUT");
  cardLikeAddReport.then((res) => {
    cardLikeButton.classList.add(basicConfig.basicCardLikeUnlike);
    cardLikeCounter.textContent = res.likes.length;
  })
};

//Для дизлайкания карточки
function onDislikeCard(cardData, cardLikeButton, cardLikeCounter, cardLikes) {
  const cardDislikeAddReport = callFetch(cardLikes + cardData._id, "DELETE");
  cardDislikeAddReport.then((res) => {
    cardLikeButton.classList.remove(basicConfig.basicCardLikeUnlike);
    cardLikeCounter.textContent = res.likes.length;
  })
};

//============================================================================================================

