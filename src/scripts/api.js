export { callFetch };

const accessKey = "321598a9-d89b-4d5f-b00c-2b7762da8c14";
const baseURL = "https://nomoreparties.co/v1/wff-cohort-28/";

function callFetch(queryURL, queryMethod, sendData) {
  const mergeURL = (baseURL + queryURL).replaceAll(" ", "");

  return fetch(mergeURL, {
    method: queryMethod,
    headers: {
      authorization: accessKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка запроса");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
}

let sendData = {
  name: "TEST",
  link: "https://media.istockphoto.com/id/2154066815/ru/векторная/прозрачные-руки-сделанные-из-букв-печатающих-иллюстрацию.jpg?s=2048x2048&w=is&k=20&c=vRharkKqF-vclWrUhJmmNoK4IFX53WZr9Dkwl81o7P4=",
};
