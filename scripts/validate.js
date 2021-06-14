function enableValidation(config) {
  const form = document.querySelector(config.form);
  form.addEventListener('submit', formSubmit);
  form.addEventListener('input', (event) => formInput(event, config));
}

function formSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
}

function formInput(event, config) {
  const input = event.target;
  const form = event.currentTarget;
  setCustomError(input, config);
  setFieldError(input);
  setButtonToggle(form, config);
}

function setCustomError(input, config) {
  const validity = input.validity;
  input.setCustomValidity('')
  if(validity.tooShort || validity.tooLong) {
    const itemLength = input.value.length
    input.setCustomValidity(`Минимальное количество символов: 2. Длинна текста сейчас: ${itemLength} символ.`)
  } if( input.value.length === 0) {
    input.setCustomValidity(config.erorrText);
    return
  } if(validity.typeMismatch) {
    input.setCustomValidity(config.erorrLink)
  }
}

function setFieldError(input) {
  const p = document.querySelector(`#${input.id}-error`);
  p.textContent = input.validationMessage;
}

function setButtonToggle(form, config) {
  const button = form.querySelector(config.submitBotton);
  const formIsValid = form.checkValidity();

  if(formIsValid) {
    button.classList.remove(config.buttonValid)
    button.removeAttribute('disabled')
  } else {
    button.classList.add(config.buttonValid)
    button.setAttribute('disabled', true)
  }
}


enableValidation({
  form: '.popup__form[name="popup-form-card"]',
  submitBotton: '.popup__button-save',
  buttonValid: 'popup__button-save_disable',
  erorrText: 'Вы пропустили это поле.',
  erorrLink: 'Введите адрес сайта.',
});

enableValidation({
  form: '.popup__form[name="popup-form-profile"]',
  submitBotton: '.popup__button-save',
  buttonValid: 'popup__button-save_disable',
  erorrText: 'Вы пропустили это поле.',
});