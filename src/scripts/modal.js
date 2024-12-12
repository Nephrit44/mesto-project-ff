export { openPopup, closePopup, popupCloseByOverlay, closingPopupPressingEsc };

const modalBasicConfig = {
  showPopup: "popup_is-opened",
};

// функция открытия модального окна
function openPopup(popup) {
  popup.classList.add(modalBasicConfig.showPopup);
  document.addEventListener("keydown", closingPopupPressingEsc);
}
// функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove(modalBasicConfig.showPopup);
  document.removeEventListener("keydown", closingPopupPressingEsc);
}
// функция-обработчик события клика по оверлею
function popupCloseByOverlay(popup) {
  popup.addEventListener("click", function (e) {
    if (e.target.classList.contains(modalBasicConfig.showPopup)) {
      closePopup(popup);
    }
  });
}
// функция-обработчик события нажатия Esc
function closingPopupPressingEsc(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector("." + modalBasicConfig.showPopup);
    closePopup(popup);
  }
}
