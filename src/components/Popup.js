export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._popupButtonClose = this._popup.querySelector(".popup__button-close");
    this.close = this.close.bind(this);
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.removeEventListener("keydown", this._handleEscClose);
    this._popup.classList.remove("popup_opened");
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  };

  setEventListeners() {
    this._popupButtonClose.addEventListener("click", this.close);
    document.addEventListener("mousedown", this._handleOverlayClose);
    document.addEventListener("keydown", this._handleEscClose);
  }
}
