import Card  from "./card.js";
import FormValidator from "./formValidator.js";
import { data } from "./formValidator.js";

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
export const popups = document.querySelectorAll(".popup");
const popupForm = document.querySelector(".popup__container");
const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_card");
// button
const buttonEdit = document.querySelector(".profile__button-edit");
const buttonAddCard = document.querySelector(".profile__button-add");
const buttonSubmitNewCard = document.querySelector(
  ".popup__button-save_submit_card"
);
// formElement
const formElement = popupForm.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_value_name");
const jobInput = document.querySelector(".popup__input_value_job");
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");
const nameCardInput = document.querySelector(".popup__input_value_title");
const linkCardInput = document.querySelector(".popup__input_value_image");
const popupFormCard = document.querySelector(".popup__form_card");
const popupFormProfile = document.querySelector(".popup__form_profile");
//cards
const list = document.querySelector(".elements__item");
//import

export function openModal(modal) {
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
  const newElement = renderElement(data);
  list.prepend(newElement);
  popupFormCard.reset();
  closePopup(popupCard);
  buttonSubmitNewCard.classList.add("popup__button-save_disable");
  buttonSubmitNewCard.setAttribute("disabled", true);
}

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
    const cardElement = renderElement(item);
    list.append(cardElement);
  });
};
renderElements();

const validateProfile = new FormValidator(data, popupFormProfile);
validateProfile.enableValidation();
const validateCard = new FormValidator(data, popupFormCard);
validateCard.enableValidation();

buttonEdit.addEventListener("click", () => openModal(popupProfile));
buttonAddCard.addEventListener("click", () => openModal(popupCard));
formElement.addEventListener("submit", formSubmitHandler);
popupFormCard.addEventListener("submit", submitNewCard);
