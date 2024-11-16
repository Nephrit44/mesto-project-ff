//Функция наложения слушателя за пределами PopUP
export function closePopUp_by_freespace(curentPopup){
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