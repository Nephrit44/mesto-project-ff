export function apiRequest(path, requestParametr, regKey) {
    return fetch(path + requestParametr, {
    method: "GET",
    headers: {
      authorization: regKey,
      "Content-Type": "application/json",
    },
  }).then((res) => getResponseData(res));
}

function getResponseData(data) {
  if (!data.ok) {
    return Promise.reject(`Ошибка: ${data.status}`);
  }
  return data.json();
}
