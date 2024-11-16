export {
  closePopUp_by_button,
  closePopUp_by_ESC,
  closePopUp_by_freespace,
  showPopup,
};

//Функция наложения слушателя на крестик
function closePopUp_by_button(curentPopup) {
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
function closePopUp_by_ESC(curentPopup) {
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
function closePopUp_by_freespace(curentPopup) {
  curentPopup.addEventListener(
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
function showPopup(curentPopup) {
  curentPopup.classList.add("popup_is-opened");
}
