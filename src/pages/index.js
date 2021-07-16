import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { data } from "../components/utils/utils.js";
import { initialCards } from "../components/utils/utils.js";
import {
  popupProfile,
  popupCard,
  buttonEdit,
  buttonAddCard,
  popupFormProfile,
  popupFormCard,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  nameCardInput,
  linkCardInput,
  containerSelector,
  popupImage,
} from "../components/utils/constants.js";

const userInfo = new UserInfo(profileName, profileJob);

const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      defaultCardList.addItem(renderCardItems(item))
    },
  },
  containerSelector
);
defaultCardList.renderItems();

const popupImageW = new PopupWithImage(popupImage);
popupImageW.setEventListeners();

function renderCardItems(item) {
  const card = new Card(item, ".template", handleCardClick);
  return card.generateCard();
}

function handleCardClick(name, link) {
  popupImageW.open(name, link);
}

const formProfile = new PopupWithForm(popupProfile);
formProfile.setEventListeners();
buttonEdit.addEventListener("click", () => {
  formProfile.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  validateProfile.removeMessageError();
});

const formCard = new PopupWithForm(popupCard);
formCard.setEventListeners();
buttonAddCard.addEventListener("click", () => {
  formCard.open();
  validateCard.removeMessageError();
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
  defaultCardList.addNewItem(renderCardItems(data));
  formCard.close();
  validateCard.toggleButtonState();
}

const validateProfile = new FormValidator(data, popupFormProfile);
validateProfile.enableValidation();
const validateCard = new FormValidator(data, popupFormCard);
validateCard.enableValidation();

popupFormProfile.addEventListener("submit", handleProfileFormSubmit);
popupFormCard.addEventListener("submit", submitNewCard);
