//======================================== ВАЛИДАЦИЯ ========================================
export {
  enableValidation,
  clearValidation,
};

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
  curentInput.classList.add(options.inputErrorClass); //Полоска
  errorElement.classList.add(options.errorClass); //Span для сообщения
  errorElement.textContent = errorMessage;
};

const hideInputError = (form, curentInput, options) => {
  const errorElement = form.querySelector(`.${curentInput.id}-error`);
  curentInput.classList.remove(options.inputErrorClass); //Полоска
  errorElement.classList.remove(options.errorClass); //Span для сообщения
  errorElement.textContent = "";
};

const disableButtonsubmit = (curentFormSubmitButton, options) => {
  curentFormSubmitButton.classList.add(options.inactiveButtonClass);
  curentFormSubmitButton.disabled = true;
};

const enableButtonsubmit = (curentFormSubmitButton, options) => {
  curentFormSubmitButton.classList.remove(options.inactiveButtonClass);
  curentFormSubmitButton.disabled = false;
};

function clearValidation(form, options) {
  //Сброс спанов
  const inputCollection = form.querySelectorAll(options.inputSelector);
  inputCollection.forEach((element) => {
    hideInputError(form, element, options);
  });
  //Сброс кнопки
  const curentFormSubmitButton = form.querySelector(
    options.submitButtonSelector
  ); //Кнопка с текущей формы
  enableButtonsubmit(curentFormSubmitButton, options);
}
