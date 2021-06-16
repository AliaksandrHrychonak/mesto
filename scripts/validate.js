function enableValidation(config) {
  const form = Array.from(document.querySelectorAll(config.form));
  form.forEach((element) => {
    element.addEventListener("submit", handleFormSubmit);
    element.addEventListener("input", (event) => handleFormInput(event, config));
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
}

function handleFormInput(event, config) {
  const input = event.target;
  const form = event.currentTarget;
  checkInputValidity(input, form, config);
  setMessageError(input);
  setInputError(input, config);
  toggleButtonState(form, config);
}

function checkInputValidity(input, form, config) {
  const validity = input.validity.valid;
  if (!validity) {
    setMessageError(input);
    setInputError(input, config);
    toggleButtonState(form, config);
  }
}

function setMessageError(input) {
  const p = document.querySelector(`#${input.id}-error`);
  p.textContent = input.validationMessage;
}

function toggleButtonState(form, config) {
  const button = form.querySelector(config.submitBotton);
  const IsValid = form.checkValidity();
  if (IsValid) {
    button.classList.remove(config.buttonValid);
    button.removeAttribute("disabled");
  } else {
    button.classList.add(config.buttonValid);
    button.setAttribute("disabled", true);
  }
}

function setInputError(input, config) {
  const inputValidity = input.checkValidity();
  if (inputValidity) {
    input.classList.remove(config.inputErrorClass);
  } else {
    input.classList.add(config.inputErrorClass);
  }
}

enableValidation({
  form: ".popup__form",
  submitBotton: ".popup__button-save",
  buttonValid: "popup__button-save_disable",
  inputErrorClass: "popup__input_border_disabled",
});
