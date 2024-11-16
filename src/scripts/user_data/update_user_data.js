import { close_popup_default } from "./popup/close_popup_default.js";
export function update_profile_data(curentPopup) {
  /*
    1. Слушаем кнопку и реагируем на неё
    2. Получаем информация о input в текущем окне c помощью form
    3. Обновляем данные на страничке
    4. Закрываем форму
    */
  curentPopup.addEventListener("submit", function (e) {
    e.preventDefault();
    const new_user_title = document.forms["edit-profile"].name.value;
    const new_user_description =
      document.forms["edit-profile"].description.value;
    document.querySelector(".profile__title").textContent = new_user_title;
    document.querySelector(".profile__description").textContent =
      new_user_description;
    close_popup_default(curentPopup);
  });
}
