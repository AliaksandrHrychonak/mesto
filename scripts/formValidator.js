export const data = {
  input: ".popup__input",
  submitBotton: ".popup__button-save",
  buttonValid: "popup__button-save_disable",
  inputErrorClass: "popup__input_border_disabled",
};

export default class FormValidator {
  constructor(data, form) {
    this._submitBotton = data.submitBotton;
    this._buttonValid = data.buttonValid;
    this._inputErrorClass = data.inputErrorClass;
    this._form = form;
    this._input = data.input;
  }

  _setInputError = (input) => {
    if (input.checkValidity()) {
      input.classList.remove(this._inputErrorClass);
    } else {
      input.classList.add(this._inputErrorClass);
    }
  };

  _toggleButtonState = (form, submitBotton) => {
    if (this._form.checkValidity()) {
      submitBotton.classList.remove(this._buttonValid);
      submitBotton.removeAttribute("disabled");
    } else {
      submitBotton.classList.add(this._buttonValid);
      submitBotton.setAttribute("disabled", true);
    }
  };

  _setMessageError = (input) => {
    const p = document.querySelector(`#${input.id}-error`);
    p.textContent = input.validationMessage;
  };

  enableValidation = () => {
    this._form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  _setEventListeners(form) {
    const inputs = Array.from(this._form.querySelectorAll(this._input));
    const buttonSubmitForm = this._form.querySelector(this._submitBotton);
    this._toggleButtonState(form, buttonSubmitForm);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._setInputError(input);
        this._toggleButtonState(form, buttonSubmitForm);
        this._setMessageError(input);
      });
    });
  }
}
