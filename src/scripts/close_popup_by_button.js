//Функция наложения слушателя на крестик
export function closePopUp_by_button(curentPopup) {
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
