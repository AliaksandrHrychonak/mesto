export default class Card {
  constructor({ data, cardSelector, userId, handleCardClick, handleLikeClick, handleDeleteCard}) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._userId = userId
    this._id = data._id
    this._likes = data.likes

    this._handleLikeClick = handleLikeClick
    this._handleDeleteCard = handleDeleteCard
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeCard() {
    this._handleLikeClick(this._cardId, this.handleLike)
      .then((data) => {
        this._buttonLike.classList.toggle('elements__button-like_active');
        this.handleLiked = !this.handkeLiked;
        this._likesCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
  }


  setLike() {
    if (this._likes.some(person => person._id === this._UserId)) {
      this._buttonLike.classList.add('elements__button-like_active');
    }
  }

  checkLike() {
    this._likesCounter.textContent = this._likes.length;
    console.log(this._likes.length)
  }

  _handleDeleteCard() {
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
    this._buttonDelete
      .addEventListener("click", () => {
        this._handleDeleteCard(this);
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    

    this._titleCard = this._element.querySelector(".elements__title")
    this._imageCard = this._element.querySelector(".elements__image")
    this._imageCard = this._element.querySelector(".elements__image")
    this._titleCard.textContent = this._name;
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;

    this._buttonDelete = this._element.querySelector(".elements__button-delete")
    this._buttonLike = this._element.querySelector(".elements__button-like")
    this._likesCounter = this._element.querySelector(".elements__quantity");


    this._setEventListeners();
    return this._element;
  }
}