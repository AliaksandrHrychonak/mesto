const initialCards = [
  {
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
const popups = document.querySelectorAll(".popup");
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
const buttonSubmitNewCard = document.querySelector(
  ".popup__button-save_submit_card"
);
const buttonCardSave = document.querySelector(".popup__button-save");
// formElement
const formElement = popupForm.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_value_name");
const jobInput = document.querySelector(".popup__input_value_job");
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");
const nameCardInput = document.querySelector(".popup__input_value_title");
const linkCardInput = document.querySelector(".popup__input_value_image");
const popupFormCard = document.querySelector(".popup__form_card");
//cards
const elementsImage = document.querySelector(".elements__image");
const list = document.querySelector(".elements__item");
//template
const itemTemplate = document.querySelector(".template");
//import
import { Card } from "./card.js";

function openModal(modal) {
  document.addEventListener("keydown", handleEscUp);
  modal.classList.add("popup_opened");
}

function closePopup(modal) {
  document.removeEventListener("keydown", handleEscUp);
  modal.classList.remove("popup_opened");
}

const handleEscUp = (evt) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

function submitNewCard(evt) {
  evt.preventDefault();
  const data = {};
  data.link = linkCardInput.value;
  data.name = nameCardInput.value;
  const newElement = renderElement(data)
  list.prepend(newElement);
  popupFormCard.reset();
  closePopup(popupCard);
  buttonSubmitNewCard.classList.add("popup__button-save_disable");
  buttonSubmitNewCard.setAttribute("disabled", true);
}

buttonEdit.addEventListener("click", () => openModal(popupProfile));
buttonAddCard.addEventListener("click", () => openModal(popupCard));
formElement.addEventListener("submit", formSubmitHandler);
popupFormCard.addEventListener("submit", submitNewCard);

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__button-close")) {
      closePopup(popup);
    }
  });
});

function renderElement(item) {
  const card = new Card(item, ".template");
  return card.generateCard();
}

const renderElements = () => {
  initialCards.forEach((item) => {
    const cardElement = renderElement(item)
    list.append(cardElement);
  });
};
renderElements();
