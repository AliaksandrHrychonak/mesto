import Card  from "./Card.js";
import FormValidator from "./FormValidator.js";
import { data } from "./utils.js";
import { initialCards } from "./utils.js";
// popup
export const popups = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_card");
// button
const buttonEdit = document.querySelector(".profile__button-edit");
const buttonAddCard = document.querySelector(".profile__button-add");
// formElement
const popupFormCard = document.querySelector(".popup__form_card");
const popupFormProfile = document.querySelector(".popup__form_profile");
const nameInput = document.querySelector(".popup__input_value_name");
const jobInput = document.querySelector(".popup__input_value_job");
const profileName = document.querySelector(".profile__info-title");
const profileJob = document.querySelector(".profile__info-subtitle");
const nameCardInput = document.querySelector(".popup__input_value_title");
const linkCardInput = document.querySelector(".popup__input_value_image");
const errorName = document.getElementById("name-profile-error")
const errorJob = document.getElementById("job-profile-error")
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

function handleProfileFormSubmit(evt) {
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
  validateCard.toggleButtonState()
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
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

buttonEdit.addEventListener("click", () => {
  openModal(popupProfile)
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  errorJob.textContent = '';
  errorName.textContent = '';
  nameInput.classList.remove("popup__input_border_disabled")
  jobInput.classList.remove("popup__input_border_disabled")
});
buttonAddCard.addEventListener("click", () => openModal(popupCard));
popupFormProfile.addEventListener("submit", handleProfileFormSubmit);
popupFormCard.addEventListener("submit", submitNewCard);
