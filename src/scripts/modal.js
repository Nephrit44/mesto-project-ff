export {
  openPopup,
  closePopup
};

//Открытие указанного попапа
function openPopup(curentPopup) {
  curentPopup.classList.add("popup_is-opened");
}

//Закрытие указанного попапа
function closePopup(curentPopup) {
  curentPopup.classList.remove("popup_is-opened");
}
