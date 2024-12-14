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
  }).then((result) => getResponseData(result));
}

function getResponseData(result) {
  if (!result.ok) {
    throw new Error(`Ошибка запроса ${response.status}`);
  }
  return result.json();
}
