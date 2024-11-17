export {
  closePopUpByButton,
  closePopUpByESC,
  closePopUpByOverlay,
  showPopUp,
};

//Функция наложения слушателя на крестик
function closePopUpByButton(curentPopup) {
  const $_btn_close_modal = curentPopup.querySelector(".popup__close"); //Ищем крестик
  //Закрытие по кнопке крестик
  $_btn_close_modal.addEventListener(
    "click",
    function () {
      curentPopup.classList.remove("popup_is-opened");
    },
    { once: true }
  );
}

//Функция наложения слушателя по кнопке ESC
function closePopUpByESC(curentPopup) {
  document.addEventListener(
    "keydown",
    function (e) {
      if (
        e.key == "Escape" &&
        curentPopup.classList.contains("popup_is-opened")
      ) {
        curentPopup.classList.remove("popup_is-opened");
      }
    },
    { once: true }
  );
}

//Функция наложения слушателя за пределами PopUP
function closePopUpByOverlay(curentPopup) {
  document.addEventListener(
    "click",
    function (e) {
      if (e.target.classList.contains("popup_is-opened")) {
        curentPopup.classList.remove("popup_is-opened");
      }
    },
    { once: true }
  );
}

//Функция открытия
function showPopUp(curentPopup) {
  curentPopup.classList.add("popup_is-animated", "popup_is-opened");
}
