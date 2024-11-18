export {
  closePopUpByButton,
  closePopUpByESC,
  closePopUpByOverlay,
  openPopup,
  closePopup
};

//Функция наложения слушателя на крестик
function closePopUpByButton(curentPopup) {
  const buttonClosePopupCard = curentPopup.querySelector(".popup__close"); 
  buttonClosePopupCard.addEventListener("click", function(){
    closePopup(curentPopup);
  });
}

//Функция наложения слушателя по кнопке ESC
function closePopUpByESC(curentPopup) {
  document.addEventListener("keydown", function (e) {
    if (
      e.key == "Escape" &&
      curentPopup.classList.contains("popup_is-opened")
    ) {
      closePopup(curentPopup);
      document.removeEventListener("click", closePopUpByESC);
    }
  });
}

//Функция наложения слушателя за пределами PopUP
function closePopUpByOverlay(curentPopup) {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("popup_is-opened")) {
      closePopup(curentPopup);
      document.removeEventListener("click", closePopUpByOverlay);
    }
  });
}

//Открытие указанного попапа
function openPopup(curentPopup) {
  curentPopup.classList.add("popup_is-opened");
}

//Закрытие указанного попапа
function closePopup(curentPopup) {
  curentPopup.classList.remove("popup_is-opened");
}
