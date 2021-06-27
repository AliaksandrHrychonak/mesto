import { openModal } from "./index.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    this._element = cardElement;
  }

  _handleOpenPopup() {
    this._popupElement = document.querySelector(".popup_type_image");
    openModal(this._popupElement);
    this._popupElement.querySelector(".popup__description").textContent =
      this._name;
    this._popupElement.querySelector(".popup__image").src = this._link;
    this._popupElement.querySelector(".popup__image").alt = this._name;
  }

  _handleLikeCard() {
    this._element
      .querySelector(".elements__button-like")
      .classList.toggle("button_like_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });
    this._element
      .querySelector(".elements__button-like")
      .addEventListener("click", () => {
        this._handleLikeCard();
      });
    this._element
      .querySelector(".elements__button_delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".elements__title").textContent = this._name;
    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__image").alt = this._name;
    return this._element;
  }
}
