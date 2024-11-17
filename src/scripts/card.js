const cardTemplate = document.querySelector("#card-template").content; //Макет под карточки

export {
  showSelectedIMG,
  createCard,
  loadProfileData,
  updateProfileData,
  addUserCard,
  deleteElement,
};

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

  cardElement.querySelector(".card__like-button").addEventListener(
    "click",
    function (e) {
      e.target.classList.toggle("card__like-button_is-active");
    },
    { once: true }
  );

  return cardElement;
}

function showSelectedIMG(curentPopup, currentCardIMG, currentCardTitle) {
  curentPopup.querySelector(".popup__image").src = currentCardIMG;
  curentPopup.querySelector(".popup__caption").textContent = currentCardTitle;
}

//Функция подгрузки текущей информации в открытое окно по редактированию профиля
function loadProfileData(curentPopup) {
  const profTitle = document.querySelector(".profile__title").textContent;
  const profDescrition = document.querySelector(
    ".profile__description"
  ).textContent;

  curentPopup.querySelector('input[name="name"]').value = profTitle;
  curentPopup.querySelector('input[name="description"]').value = profDescrition;
}

function updateProfileData(curentPopup) {
  /*
    1. Слушаем кнопку и реагируем на неё
    2. Получаем информация о input в текущем окне c помощью form
    3. Обновляем данные на страничке
    4. Закрываем форму
    */
  curentPopup.addEventListener("submit", function (e) {
    e.preventDefault();
    const new_user_title = document.forms["edit-profile"].name.value;
    const new_user_description =
      document.forms["edit-profile"].description.value;
    document.querySelector(".profile__title").textContent = new_user_title;
    document.querySelector(".profile__description").textContent =
      new_user_description;
    curentPopup.classList.remove("popup_is-opened");
  });
}

function addUserCard(curentPopup, placesList) {
  curentPopup.querySelector('input[name="place-name"]').value = "";
  curentPopup.querySelector('input[name="link"]').value = "";
  curentPopup.addEventListener(
    "submit",
    function (e) {
      e.preventDefault();
      const newCard = {};
      const $_placeName = document.forms["new-place"]["place-name"].value;
      const $_link = document.forms["new-place"].link.value;

      (newCard.name = $_placeName),
        (newCard.link = $_link),
        placesList.prepend(createCard(newCard, deleteElement));

      curentPopup.classList.remove("popup_is-opened");
    },
    { once: true }
  );
}

//4. Обработка удаления указанного элемента
function deleteElement(element) {
  element.remove();
}
