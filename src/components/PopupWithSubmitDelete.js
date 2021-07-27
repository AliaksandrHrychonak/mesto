import Popup from "./Popup.js"

export default class PopupWithSubmitDelete extends Popup {
  constructor({popupSelector, handleButtonDelete}) {
    super(popupSelector)
    this._handleButtonDelete = handleButtonDelete;
    this._deleteButton = this._popup.querySelector('.popup__button-save_type_delete')
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', this._handleDeleteCardDelete)
  }
  _handleDeleteCardDelete = () => {
    this._handleButtonDelete()
  }
}