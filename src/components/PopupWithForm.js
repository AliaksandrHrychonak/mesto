import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll(".popup__input");
    this._ObjectValues = {};
    this._inputList.forEach(
      (input) => (this._ObjectValues[input.name] = input.value)
    );
    console.log(this._ObjectValues);
    return this._ObjectValues;
  }

  setEventListener() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      console.log(this._getInputValues())
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
