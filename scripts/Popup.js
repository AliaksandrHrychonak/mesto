export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupButtonClose = this._popupSelector.querySelector('.popup__button-close');
    this.close = this.close.bind(this);
  }

  open() {
    this.setEventListeners();
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this.removeEventListeners();
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        this.close();
    } 
  } 

  setEventListeners() {
    this._popupButtonClose.addEventListener('click', this.close);
    document.addEventListener('mousedown', this._handleOverlayClose);
    document.addEventListener('keydown', this._handleEscClose);
  }
  removeEventListeners() {
    this._popupButtonClose.removeEventListener('click', this.close);
    document.removeEventListener('mousedown', this._handleOverlayClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}