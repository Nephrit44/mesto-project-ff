//Функция подгрузки текущей информации в открытое окно по редактированию профиля
export function load_profile_data(curentPopup) {
  profTitle = document.querySelector(".profile__title").textContent,
  profDescrition = document.querySelector(".profile__description").textContent;

  curentPopup.querySelector('input[name="name"]').value = profTitle;
  curentPopup.querySelector('input[name="description"]').value = profDescrition;
}
