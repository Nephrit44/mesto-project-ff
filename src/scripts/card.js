export { createCard, onLikeCard, onDeleteCard };
import { apiDELETERequest } from "./api.js";

const basicConfig = {
  templateCard: "#card-template", //Заготовка под карточку
  basicCard: ".card", //Клон карточки из заготовки
  placeForImage: ".card__image", //Место на карточке под картинку
  basicCardName: ".card__title", //Заголовок на карточке
  basicCardDeleteButton: ".card__delete-button", //Кнопка для удаления на карточке
  basicCardDeleteButtonHide: "card__delete-button-hide", //Свойство скрывания кнопки удаления не своей карточки
  basicCardLikeButton: ".card__like-button", //Кнопка лайков на карточке
  basicCardLikeCouner: ".card__like-count", //Счётчик лайков на карточке
  //Удаление записи
  windowDelete: ".popup_type_confirmation_delete", //Окно для подтверждения удаления
  showElement: "popup_is-opened", //Вывод элемента на экран
  confirmationDeleteButton: ".popup__confirmation-button", //Кнопка подтверждения удаления
};

const cardTemplate = document.querySelector(basicConfig.templateCard).content;

function createCard(
  cardData,
  onDeleteCard,
  onLikeCard,
  openImagePopup,
  userID,
  apiParametrs
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
  cardLikeCounter.textContent = cardData.like; //Количество лайков
  //Если ID пользователя получение при загрузке профиля совпадает с ID из базы
  //добавляем слушалку на уделение, если нет прячем

  if (userID === cardData.owner._id) {
    cardDeleteButton.addEventListener("click", () =>
      onDeleteCard(copyCard, apiParametrs, cardData._id)
    );
  } else {
    cardDeleteButton.classList.add(basicConfig.basicCardDeleteButtonHide);
  }

  cardLikeButton.addEventListener("click", () => onLikeCard(cardLikeButton));
  cardImage.addEventListener("click", () => openImagePopup(cardData));

  return copyCard;
}

//Для лайкания карточки
function onLikeCard(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

//Удаление элемента
function onDeleteCard(element, apiParametrs, card_id) {
  const windowForDelete = document.querySelector(basicConfig.windowDelete);
  windowForDelete.classList.add(basicConfig.showElement);

  const buttonDelete = windowForDelete.querySelector(
    basicConfig.confirmationDeleteButton
  );
  buttonDelete.addEventListener("click", function () {
    const saveServerUserProfile = apiDELETERequest(
      apiParametrs.pathCardCollection,
      card_id
    ); //Удаление карточки
    console.log(saveServerUserProfile);
  });
  element.remove();
}
