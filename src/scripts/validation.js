//======================================== ВАЛИДАЦИЯ ========================================
export { enableValidation, isValid, showInputError, hideInputError, disableButtonsubmit, enableButtonsubmit, clearValidation }
const enableValidation = (options) => {
  const formLists = document.querySelectorAll(options.formSelector);

  formLists.forEach((form) => {
    //Inputs
    const fromInputs = form.querySelectorAll(options.inputSelector);

    fromInputs.forEach((curentInput) => {
      curentInput.addEventListener("input", () => {
        isValid(form, curentInput, options);
      });
    });
  });
};

const isValid = (form, curentInput, options) => {
  const curentFormSubmitButton = form.querySelector(
    options.submitButtonSelector
  ); //Кнопка с текущей формы

  if (curentInput.validity.patternMismatch) {
    curentInput.setCustomValidity(curentInput.dataset.regexpError);
  } else {
    curentInput.setCustomValidity("");
  }

  if (!curentInput.validity.valid) {
    showInputError(form, curentInput, options, curentInput.validationMessage);
    disableButtonsubmit(curentFormSubmitButton, options);
  } else {
    hideInputError(form, curentInput, options);
    enableButtonsubmit(curentFormSubmitButton, options);
  }
};

const showInputError = (form, curentInput, options, errorMessage) => {
  const errorElement = form.querySelector(`.${curentInput.id}-error`);
  errorElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (form, curentInput, options) => {
  const errorElement = form.querySelector(`.${curentInput.id}-error`);
  errorElement.classList.remove(options.inputErrorClass);
  errorElement.textContent = "";
};

const disableButtonsubmit = (curentFormSubmitButton, options) => {
  curentFormSubmitButton.classList.add("popup__button_disabled");
  curentFormSubmitButton.disabled = true;
};

const enableButtonsubmit = (curentFormSubmitButton, options) => {
  curentFormSubmitButton.classList.remove("popup__button_disabled");
  curentFormSubmitButton.disabled = false;
};

function clearValidation(form, options) {
    //Сброс спанов
  const errorClassCollection = form.querySelectorAll(options.errorClass);
  errorClassCollection.forEach((element) => {
    element.textContent = "";
    element.classList.remove(options.inputErrorClass);
  });
  //Сброс кнопки
  const curentFormSubmitButton = form.querySelector(
    options.submitButtonSelector
  ); //Кнопка с текущей формы
  enableButtonsubmit(curentFormSubmitButton, options);
}
