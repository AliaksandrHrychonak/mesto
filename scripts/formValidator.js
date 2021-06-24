class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._submitBotton = config.submitBotton;
    this._buttonValid = config.buttonValid;
    this._inputErrorClass = config.inputErrorClass;
  }

  enableValidation() {
    this._form.Array.from(document.querySelectorAll(config.form));
   
  }

}