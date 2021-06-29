export default class FormValidator {
  constructor(data, form) {
    this._submitBotton = data.submitBotton;
    this._buttonValid = data.buttonValid;
    this._inputErrorClass = data.inputErrorClass;
    this._form = form;
    this._input = data.input;
    this._inputs = Array.from(this._form.querySelectorAll(this._input));
  }

  _setInputError = (input) => {
    if (input.checkValidity()) {
      input.classList.remove(this._inputErrorClass);
    } else {
      input.classList.add(this._inputErrorClass);
    }
  };

  toggleButtonState = () => {
    if (this._form.checkValidity()) {
      this._form.querySelector(this._submitBotton).classList.remove(this._buttonValid);
      this._form.querySelector(this._submitBotton).removeAttribute("disabled");
    } else {
      this._form.querySelector(this._submitBotton).classList.add(this._buttonValid);
      this._form.querySelector(this._submitBotton).setAttribute("disabled", true);
    }
  };

  _setMessageError = (input) => {
    const errorMessage = this._form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = input.validationMessage;
  };

  enableValidation = () => {
    this._form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  _setEventListeners = () => {
    this.toggleButtonState();
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._setInputError(input);
        this.toggleButtonState();
        this._setMessageError(input);
      });
    });
  }
}
