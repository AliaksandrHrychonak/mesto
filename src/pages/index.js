import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  data
} from "../components/utils/utils.js";
import {
  initialCards
} from "../components/utils/utils.js";
import {
  popupProfile,
  popupCard,
  popupAvatar,
  popupConfirm,
  avatarProfile,
  buttonEdit,
  buttonAddCard,
  popupFormProfile,
  popupFormCard,
  popupFormAvatar,
  nameInput,
  infoInput,
  profileName,
  profileJob,
  nameCardInput,
  linkCardInput,
  containerSelector,
  popupImage,
  name,
  info,
  avatar,
} from "../components/utils/constants.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    'content-type': 'application/json',
    authorization: '6a8d306b-88c2-4559-b9fb-ed6535e42e98',
  }
});

const userInfo = new UserInfo(name, info, avatar);
let userId;
api.getUserInfo()
  .then((data) => {
    userId = data._id;
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err);
  })

let defaultCardList
api.getInitialCards()
  .then((data) => {
    defaultCardList = new Section({
      items: data,
      renderer: (item) => {
        defaultCardList.addItem(renderCardItems(item))
      }
    }, containerSelector);
    defaultCardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  })

function renderCardItems(data) {
  const card = new Card({
    data: data,
    cardSelector: ".template",
    userId: userId,
    handleCardClick: (name, link) => {
      popupImageW.open(name, link);
    },
    handleLikeClick: (id) => {
      return api.LikeCard(id)
    },
  });

  card.setLike(card.generateCard());
  card.checkLike(card.generateCard());
  return card.generateCard();
}

const formAvatar = new PopupWithForm({
  popupSelector: popupAvatar,
  handleFormSubmit: (info) => {
    api.setAvatar(info.avatarLink)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err)
      })
  }
});
formAvatar.setEventListener()

const formProfile = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: (info) => {
    api.setUserInfo(info.name, info.info)
      .then((data) => {
        console.log(data)
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
    }
});
formProfile.setEventListener();

const popupImageW = new PopupWithImage(popupImage);
popupImageW.setEventListeners();

const formCard = new PopupWithForm({
  popupSelector: popupCard,
  handleFormSubmit: (data) => {
    api.postCard(data.name, data.link)
    .then((data) => {
      const cardElement = generateCard(data);
      defaultCardList.addNewItem(cardElement);
    })
    .catch((err) => {
        console.log(err);
    })
  }
});
formCard.setEventListener();

// function handleProfileFormSubmit(evt) {
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   formProfile.close();
// }
// function submitNewCard() {
//   const data = {};
//   data.link = linkCardInput.value;
//   data.name = nameCardInput.value;
//   defaultCardList.addNewItem(renderCardItems(data));
//   formCard.close();
//   validateCard.toggleButtonState();
// }
//popupFormProfile.addEventListener("submit", handleProfileFormSubmit);
// popupFormCard.addEventListener("submit", submitNewCard);


const validateProfile = new FormValidator(data, popupFormProfile);
validateProfile.enableValidation();
const validateCard = new FormValidator(data, popupFormCard);
validateCard.enableValidation();
const validateAvatar = new FormValidator(data, popupFormAvatar);
validateAvatar.enableValidation()


buttonEdit.addEventListener("click", () => {
  formProfile.open();
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  infoInput.value = profileData.info;
  validateProfile.removeMessageError();
});
buttonAddCard.addEventListener("click", () => {
  formCard.open();
  validateCard.removeMessageError();
});
avatarProfile.addEventListener("click", () => {
  formAvatar.open()
})
