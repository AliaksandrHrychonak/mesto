import Popup from "./Popup.js"

export default class PopupWithConfirm extends Popup {
  constructor({popupSelector, handleButtonConfirm}) {
    super(popupSelector)
    this._handleButtonConfirm = handleButtonConfirm;
    this._deleteButton = this._popupSelector.querySelector('.popup__button_type_conf')
  }

  _setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', this._handleDeleteCardConfirm)
  }

  _handleDeleteCardConfirm = () => {
    this._handleButtonConfirm()
  }

  open() {
    this._setEventListeners();
    super.open();
  }

}