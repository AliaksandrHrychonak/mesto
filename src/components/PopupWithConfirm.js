import Popup from "./Popup.js"

export default class PopupWithConfirm extends Popup {
  constructor({popupSelector, handleButtonDelete}) {
    super(popupSelector)
    this._handleButtonDelete = handleButtonDelete;
    this._deleteButton = popupSelector.querySelector('.popup__button_type_conf')
  }

  _setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard()
      super.close();
    })

  }

  _deleteCard = () => {
    this._handleButtonDelete();
  }

  open() {
    this._setEventListeners();
    super.open();
  }

}