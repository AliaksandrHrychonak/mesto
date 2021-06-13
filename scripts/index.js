const initialCards = [{
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
// popup
const popup = document.querySelector(".popup_opened");
const popupForm = document.querySelector(".popup__container");

const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_card");
const popupImage = document.querySelector(".popup_type_image");
const cardPopupTitle = document.querySelector(".popup__description");
const cardPopupImage = document.querySelector(".popup__image");
// button
const buttonEdit = document.querySelector(".profile__button-edit");
const buttonCloseProfile = document.querySelector(
  ".popup__button-close_profile"
);
const buttonCloseCard = document.querySelector(".popup__button-close_card");
const buttonCloseImage = document.querySelector(".popup__button-close_image");
const buttonAddCard = document.querySelector(".profile__button-add");
const buttonLike = document.querySelector(".elements__button-like");
const buttonDeleteCard = document.querySelector(".elements__button_delete");
const buttonSubmitNewCard = document.querySelector(
  ".popup__button-save_submit_card"
);
// formElement
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_value_name");
const jobInput = document.querySelector(".popup__input_value_job");
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");
const nameCardInput = document.querySelector(".popup__input_value_title");
const linkCardInput = document.querySelector(".popup__input_value_image");
const cardInputsForm = document.querySelector(".popup__form_card");

const elementsImage = document.querySelector(".elements__image");

const itemTemplate = document.querySelector(".template");
const list = document.querySelector(".elements__item");

function openModal(modal) {
  document.addEventListener('keydown', handleEscUp);
  modal.classList.add("popup_opened");
}

function closePopup(modal) {
  document.removeEventListener('keydown', handleEscUp);
  modal.classList.remove("popup_opened");
}

const handleEscUp = (evt) => {
  // evt.preventDefault();
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

function deleteCard(element) {
  element.target.closest(".elements__card").remove();
}

function likeCard(element) {
  element.target.classList.toggle("button_like_active");
}

function cardAdd(name, link) {
  const card = itemTemplate.content
    .querySelector(".elements__card")
    .cloneNode(true);
  const buttonLike = card.querySelector(".elements__button-like");
  const buttonDeleteCard = card.querySelector(".elements__button_delete");
  const imageCard = card.querySelector(".elements__image");
  const titleCard = card.querySelector(".elements__title");
  imageCard.alt = name;
  imageCard.src = link;
  titleCard.textContent = name;
  buttonLike.addEventListener("click", likeCard);
  buttonDeleteCard.addEventListener("click", deleteCard);
  imageCard.addEventListener("click", () => openImageCard(name, link));
  buttonCloseImage.addEventListener("click", () => closeImageCard(name, link));
  return card;
}

initialCards.forEach(function (element) {
  const newCard = cardAdd(element["name"], element["link"]);
  list.append(newCard);
});

function submitNewCard(evt) {
  evt.preventDefault();
  list.prepend(cardAdd(nameCardInput.value, linkCardInput.value));
  cardInputsForm.reset();
  closePopup(popupCard);
}

function openImageCard(name, link) {
  openModal(popupImage);
  cardPopupImage.alt = name;
  cardPopupImage.src = link;
  cardPopupTitle.textContent = name;
}

function closeImageCard() {
  closePopup(popupImage);
}

buttonEdit.addEventListener("click", () => openModal(popupProfile));
buttonAddCard.addEventListener("click", () => openModal(popupCard));

buttonCloseCard.addEventListener("click", () => closePopup(popupCard));
buttonCloseProfile.addEventListener("click", () => closePopup(popupProfile));

formElement.addEventListener("submit", formSubmitHandler);
buttonSubmitNewCard.addEventListener("click", submitNewCard);

popupProfile.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup_opened")
  ) {
    closePopup(popupProfile);
  }
});

popupCard.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
     evt.target.classList.contains("popup_opened")
  ) {
    closePopup(popupCard);
  }
});

popupImage.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup_opened")
  ) {
    closeImageCard();
  }
});

// Слушатель событий, закрывающий модальное окно по нажатию на Esc, добавляется при открытии модального окна и удаляется при его закрытии.

// Слушатель submit для формы карточки