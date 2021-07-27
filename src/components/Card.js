export default class Card {
  constructor({ data, userId, cardSelector, handleCardClick, handleLikeClick, handleDeleteCard}) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId
    this._id = data._id
    this._ownerId = data.owner;
    this._cardId = data._id;
    this._likes = data.likes
    this._handleDeleteCard = handleDeleteCard

    this._handleLikeClick = handleLikeClick
    this._handleLikeCard = this._handleLikeCard.bind(this);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeCard() {
    this._handleLikeClick(this._cardId, this._element)
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._imageCard.addEventListener("click", () => {
        this._handleCardClick(this._link, this._name);
      });
    this._buttonLike
      .addEventListener("click", () => {
        this._handleLikeCard();
      });
    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteCard(this);
    })
  }

  _setUserLike() {
    if(this._likes.some((owner) => (this._userId === owner._id ))) {
      this._buttonLike.classList.add('elements__button-like_active')
    }
  }

  _renderButtonDelete() {
    if (this._ownerId._id !== this._userId) {
      this._buttonDelete.style.display = "none"
    } else {
      this._buttonDelete.style.display = "flex"
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._titleCard = this._element.querySelector(".elements__title");
    this._imageCard = this._element.querySelector(".elements__image");
    this._titleCard.textContent = this._name;
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;
    this._buttonDelete = this._element.querySelector(".elements__button-delete");
    this._buttonLike = this._element.querySelector(".elements__button-like");
    this._likesQuantity = this._element.querySelector(".elements__quantity");
    this._likesQuantity.textContent = this._likes.length;
    this._renderButtonDelete()
    this._setUserLike()  
    this._setEventListeners();
    return this._element;
  }
}