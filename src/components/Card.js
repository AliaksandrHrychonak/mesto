export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    this._element = cardElement;
  }

  _handleLikeCard() {
    this._element
      .querySelector(".elements__button-like")
      .classList.toggle("elements__button-like_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        console.log(this._name);
        this._handleCardClick(this._link, this._name)
      });
    this._element
      .querySelector(".elements__button-like")
      .addEventListener("click", () => {
        this._handleLikeCard();
      });
    this._element
      .querySelector(".elements__button-delete")
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