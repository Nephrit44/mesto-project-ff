// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content; //Макет под карточки
const placesList = document.querySelector('.places__list'); //Место куда пихаем
const showPopUpNewcard = document.querySelector('.popup_type_new-card'); //Форма новой карточки
const showPopUpProfile = document.querySelector('.popup_type_edit')
let cardCollectionOnDysplay = '';

//function - все карточки на стол (Этот код только для отображения карточек из базы)
function loadCardCollection(initialCards) {
  initialCards.forEach((element) => {
    const cardCopy = cardTemplate.querySelector('.card').cloneNode(true); //Сделали копию
    cardCopy.querySelector('.card__image').src = element.link;
    cardCopy.querySelector('.card__title').textContent = element.name;
    placesList.append(cardCopy);

  });
}

loadCardCollection(initialCards); //вызов - Покажи все карты, которые есть в базе

//Блок обработки событий по карточке
placesList.addEventListener('click', function (evt) {
    switch (evt.target.classList.value){
        case 'card__delete-button': { //Удаление выбранной карточки  
            evt.target.parentElement.remove();
            break;
        }
        case 'card__like-button': { //Обработка кнопки card__like-button
            evt.target.classList.add('card__like-button_is-active');
            break;
        }
        case 'card__like-button card__like-button_is-active': {
            evt.target.classList.remove('card__like-button_is-active');
            break;
        }
    }

})

//Обработка кнопки вызова диалогового окна для добавления новой карточки
const addNewButton = document.querySelector('.profile__add-button');
addNewButton.addEventListener('click', function () {
  showPopUpNewcard.classList.add('popup_is-opened');
  openedPopUP_action(showPopUpNewcard.dataset.formname); //Работа с вызванной формой + передача имени формы
});


//Обработка кнопки Сохранить во всплывающем окне 
function openedPopUP_action(formName){
    switch(formName){
        case 'newCard':{ //Форма новая карточка
            const openedFormNow = document.querySelector(`[data-formname="${formName}"]`);
            openedFormNow.addEventListener('submit', function (evt){
                evt.preventDefault();
                const cardCopy = cardTemplate.querySelector('.card').cloneNode(true); //Сделали копию
                cardCopy.querySelector('.card__image').src = openedFormNow.querySelector('input[name="link"]').value;
                cardCopy.querySelector('.card__title').textContent = openedFormNow.querySelector('input[name="place-name"]').value;
                placesList.append(cardCopy);
            })
        }
            break;
        case 'editProfile': {//Форма редактирование профиля

            const openedFormNow = document.querySelector(`[data-formname="${formName}"]`)
            openedFormNow.addEventListener('submit', function (evt){
                evt.preventDefault();
                document.querySelector('.profile__title').textContent = openedFormNow.querySelector('.popup__input_type_name').value;
                document.querySelector('.profile__description').textContent = openedFormNow.querySelector('.popup__input_type_description').value;
                openedFormNow.classList.remove('popup_is-opened');
            })

        }
            break;
    }
}


//Обработка кнопки закрытия любого popUP-окна
const popUpClose = document.querySelectorAll('.popup__close');
popUpClose.forEach((element) => {

    element.addEventListener('click', function(){
        const openedFormPopUp = document.querySelector(`[data-formname = "${element.dataset.closeform}"]`)        
        openedFormPopUp.classList.remove('popup_is-opened');
    })

})


//Редактирование профиля
const prifileEditButton = document.querySelector('.profile__edit-button');
prifileEditButton.addEventListener('click', function() {
    showPopUpProfile.classList.add('popup_is-opened'); //Работа с вызванной формой + передача имени формы
    openedPopUP_action(showPopUpProfile.dataset.formname);
    //Вставляем в открывшуюся форму текущие значения
    showPopUpProfile.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;
    showPopUpProfile.querySelector('.popup__input_type_description').value = document.querySelector('.profile__description').textContent;
})
