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
