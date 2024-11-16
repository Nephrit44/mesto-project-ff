//Функция подгрузки текущей информации в открытое окно по редактированию профиля
export function load_profile_data(curentPopup, profTitle, profDescrition) {
    curentPopup.querySelector('input[name="name"]').value = profTitle;
    curentPopup.querySelector('input[name="description"]').value = profDescrition;
  }