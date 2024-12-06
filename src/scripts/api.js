export { apiGETRequest, apiPATCHRequest }


// ============= Получение данных =================
function apiGETRequest(
  path,
  requestParametr,
  regKey,
) {
  return fetch(path + requestParametr, {
    method: "GET",
    headers: {
      authorization: regKey,
      "Content-Type": "application/json",
    },
   
  }).then((res) => getResponseData(res));
}

// ============= Отправка данных =================
function apiPATCHRequest(
    path,
    requestParametr,
    regKey,
    newUserName,
    newUserDescription
  ) {
    return fetch(path + requestParametr, {
      method: "PATCH",
      headers: {
        authorization: regKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newUserName,
        about: newUserDescription
      })
    }).then((res) => getResponseData(res));
  }

function getResponseData(data) {
  if (!data.ok) {
    return Promise.reject(`Ошибка: ${data.status}`);
  }
  return data.json();
}

