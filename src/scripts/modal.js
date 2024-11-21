export { openPopup, closePopup, popupCloseByOverlay, closingPopupPressingEsc };


// функция открытия модального окна
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closingPopupPressingEsc);
}
// функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closingPopupPressingEsc);
}
// функция-обработчик события клика по оверлею
function popupCloseByOverlay(popup) {
  popup.addEventListener("click", function(e){
    if(e.target.classList.contains("popup_is-opened")){
      closePopup(popup);
    }
  });
}
// функция-обработчик события нажатия Esc
function closingPopupPressingEsc(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
} 