//Функция наложения слушателя по кнопке ESC
export function closePopUp_by_ESC(curentPopup){
  document.addEventListener(
    "keydown",
    function (e) {
      if (e.key == "Escape" && curentPopup.classList.contains("popup_is-opened")) {
        curentPopup.classList.remove("popup_is-opened");
      }
    },
    { once: true }
  );
}