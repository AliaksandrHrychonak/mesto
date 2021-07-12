import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { data } from "../components/utils/utils.js";
import { initialCards } from "../components/utils/utils.js";
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
const errorName = document.getElementById("name-profile-error");
const errorJob = document.getElementById("job-profile-error");
//cards
const containerSelector = document.querySelector(".elements__item");
const popupImage = document.querySelector(".popup_type_image");

const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".template", handleCardClick);
      const cardElement = card.generateCard();
      defaultCardList.addItem(cardElement);
    },
  },
  containerSelector
);
defaultCardList.renderItems();

const popupImageW = new PopupWithImage(popupImage);
popupImageW.setEventListeners();

function handleCardClick(name, link) {
  popupImageW.open(name, link);
}

const formProfile = new PopupWithForm(popupProfile);
formProfile.setEventListeners();
buttonEdit.addEventListener("click", () => {
  formProfile.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  errorJob.textContent = "";
  errorName.textContent = "";
  nameInput.classList.remove("popup__input_border_disabled");
  jobInput.classList.remove("popup__input_border_disabled");
});

const formCard = new PopupWithForm(popupCard);
formCard.setEventListeners();
buttonAddCard.addEventListener("click", () => {
  formCard.open();
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  formProfile.close();
}

function submitNewCard(evt) {
  evt.preventDefault();
  const data = {};
  data.link = linkCardInput.value;
  data.name = nameCardInput.value;
  const cardNew = new Card(data, ".template", handleCardClick);
  const newElement = cardNew.generateCard(data);
  containerSelector.prepend(newElement);
  popupFormCard.reset();
  formCard.close();
  validateCard.toggleButtonState();
}

const validateProfile = new FormValidator(data, popupFormProfile);
validateProfile.enableValidation();
const validateCard = new FormValidator(data, popupFormCard);
validateCard.enableValidation();

popupFormProfile.addEventListener("submit", handleProfileFormSubmit);
popupFormCard.addEventListener("submit", submitNewCard);
