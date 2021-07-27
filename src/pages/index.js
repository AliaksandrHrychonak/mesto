import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithSubmitDelete from "../components/PopupWithSubmitDelete.js";
import {
  popupProfile,
  popupCard,
  popupAvatar,
  profileAvatarEdit,
  popupWithDeleteCard,
  buttonEdit,
  buttonAddCard,
  popupFormProfile,
  popupFormCard,
  popupFormAvatar,
  nameInput,
  infoInput,
  containerSelector,
  popupImage,
  name,
  info,
  avatar,
  data
} from "../utils/constants.js";

function loadApi(popupSelector, load) {
  if (load === true) {
    const buttonSubmitPopup = popupSelector.querySelector('.popup__button-save')
    buttonSubmitPopup.textContent = 'Сохранение...'
  } else {
    const buttonSubmitPopup = popupSelector.querySelector('.popup__button-save')
    buttonSubmitPopup.textContent = 'Сохранить'
  }
}
const userInfo = new UserInfo(name, info, avatar)
let userId
let defaultCardList

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-26",
  headers: {
    "content-type": "application/json",
    authorization: "6a8d306b-88c2-4559-b9fb-ed6535e42e98",
  },
});

api.getUserInfo()
  .then((data) => {
    userId = data._id;
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    api.getInitialCards()
    .then((data) => {
      defaultCardList = new Section({
        items: data,
        renderer: (item) => {
          defaultCardList.addItem(renderCardItems(item));
        },
        containerSelector: containerSelector,
      }, );
      defaultCardList.renderItems();
    })
    .catch((err) => {
      console.log(err);
    });
  })
  .catch((err) => {
    console.log(err)
  })

function renderCardItems(data) {
  const card = new Card({
    data: data,
    userId: userId,
    cardSelector: ".template",
    handleCardClick: (name, link) => {
      popupImageW.open(name, link);
    },
    handleLikeClick: (cardId, element) => {
      const buttonLike = element.querySelector(".elements__button-like");
      const likeQuantity = element.querySelector(".elements__quantity");
      if (!buttonLike.classList.contains("elements__button-like_active")) {
        api.likeCard(cardId)
          .then((data) => {
            buttonLike.classList.add("elements__button-like_active");
            likeQuantity.textContent = data.likes.length;
            return
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.deleteLikeCard(cardId)
          .then((data) => {
            buttonLike.classList.remove("elements__button-like_active");
            likeQuantity.textContent = data.likes.length;
            return
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleDeleteCard: (objectThisCard) => {
      popupWithSubmitDelete.objectThisCard = objectThisCard;
      popupWithSubmitDelete.open()
      console.log(objectThisCard)
    },
  });
  return card.generateCard();
}

const popupWithSubmitDelete = new PopupWithSubmitDelete({
  popupSelector: '.popup_type_delete',
  handleButtonDelete: () => {
    const cardId = popupWithSubmitDelete.objectThisCard._cardId
    api.deleteCard(cardId)
      .then(() => {
        popupWithSubmitDelete.objectThisCard.deleteCard();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithSubmitDelete.close();
      })
  },
});
popupWithSubmitDelete.setEventListeners();

const formAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (info) => {
    loadApi(popupAvatar, true)
    api
      .setAvatar(info.avatar)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loadApi(popupAvatar, false)
        formAvatar.close()
      })
  },
});
formAvatar.setEventListener();

const formProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (info) => {
    loadApi(popupProfile, true)
    api.setUserInfo(info.name, info.info)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loadApi(popupProfile, false)
        formProfile.close()
      })
  },
});
formProfile.setEventListener();

const popupImageW = new PopupWithImage('.popup_type_image');
popupImageW.setEventListeners();

const formCard = new PopupWithForm({
  popupSelector: '.popup_type_card',
  handleFormSubmit: (data) => {
    loadApi(popupCard, true)
    api.postCard(data.name, data.image)
      .then((data) => {
        defaultCardList.addNewItem(renderCardItems(data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loadApi(popupCard, false)
        formCard.close()
      })
  },
});
formCard.setEventListener();

const validateProfile = new FormValidator(data, popupFormProfile);
validateProfile.enableValidation();
const validateCard = new FormValidator(data, popupFormCard);
validateCard.enableValidation();
const validateAvatar = new FormValidator(data, popupFormAvatar);
validateAvatar.enableValidation();

buttonEdit.addEventListener("click", () => {
  formProfile.open();
  const infoObject = userInfo.getUserInfo();
  nameInput.value = infoObject.name;
  infoInput.value = infoObject.info;
  validateProfile.removeMessageError();
  validateProfile.toggleButtonState();
});
buttonAddCard.addEventListener("click", () => {
  formCard.open();
  validateCard.removeMessageError();
  validateCard.toggleButtonState();
});
profileAvatarEdit.addEventListener("click", () => {
  formAvatar.open();
  validateAvatar.removeMessageError();
  validateAvatar.toggleButtonState();
});