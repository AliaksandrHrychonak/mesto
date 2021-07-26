import Popup from "./Popup.js"

export default class PopupWithSubmitDelete extends Popup {
  constructor({popupSelector, handleButtonDelete}) {
    super(popupSelector)
    this._handleButtonDelete = handleButtonDelete;
    this._deleteButton = this._popupSelector.querySelector('.popup__button_type_conf')
  }

  _setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', this._handleDeleteCardDelete)
  }

  _handleDeleteCardDelete = () => {
    this._handleButtonDelete()
  }

  open() {
    this._setEventListeners();
    super.open();
  }

}