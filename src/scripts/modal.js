export { openPopup, closePopup, popupCloseButton, popupCloseByESC, popupCloseByOverlay};

//Открытие указанного попапа
function openPopup(curentPopup) {
  curentPopup.classList.add("popup_is-opened"); 
}

function closePopup(curentPopup) {
  curentPopup.classList.remove("popup_is-opened");
  curentPopup.removeEventListener("click", openPopup);
}

//Кнопка закрытия окна 
function popupCloseButton(button, openedForm){
  button.addEventListener("click", function(){
    closePopup(openedForm);
  });
}

//Закрытие по ESC
function popupCloseByESC(openedForm){
  document.addEventListener("keydown", function(e){
    if (e.key == "Escape") {
      closePopup(openedForm);
    }
  });
}

//Закрытие по оверлею
function popupCloseByOverlay(openedForm){
  openedForm.addEventListener("click", function(e){
    if(e.target.classList.contains("popup_is-opened")){
      closePopup(openedForm);
    }
  });
}