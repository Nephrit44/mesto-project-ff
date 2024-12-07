export { apiGETRequest, apiPATCHRequest, apiPOSTRequest, apiDELETERequest  };
const regKey = "321598a9-d89b-4d5f-b00c-2b7762da8c14";

// ============= Получение данных пользователя или карточек =================
function apiGETRequest(apiParametrs) {
  return fetch(apiParametrs, {
    method: "GET",
    headers: {
      authorization: regKey,
      "Content-Type": "application/json",
    },
  }).then((res) => getResponseData(res));
}

// ============= Отправка новых данных пользователя на сервер =================
function apiPATCHRequest(
  apiParametrs,
  newUserName,
  newUserDescription
) {
  return fetch(apiParametrs, {
    method: "PATCH",
    headers: {
      authorization: regKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newUserName,
      about: newUserDescription,
    }),
  }).then((res) => getResponseData(res));
}

// ============= Добавление новой карточки на сервер =================
function apiPOSTRequest(
  apiParametrs,
  newCardName,
  newCardLink
) {
  return fetch(apiParametrs, {
    method: "POST",
    headers: {
      authorization: regKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newCardName,
      link: newCardLink,
    }),
  }).then((res) => getResponseData(res));
}

// ============= Удаление выбранной карточки на сервере =================
function apiDELETERequest(
  apiParametrs,
  card_id,
) {
  return fetch(apiParametrs + card_id, {
    method: "DELETE",
    headers: {
      authorization: regKey,
      "Content-Type": "application/json",
    }
  }).then((res) => getResponseData(res));
}

function getResponseData(data) {
  if (!data.ok) {
    return Promise.reject(`Ошибка: ${data.status}`);
  }
  return data.json();
}
