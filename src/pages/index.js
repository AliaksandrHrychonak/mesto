import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import {
  popupProfile,
  popupCard,
  popupAvatar,
  profileAvatarEdit,
  popupConfirmDel,
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
} from "../components/utils/constants.js";

function loadApi (popupSelector) {
  const buttonSubmitPopup = popupSelector.querySelector('.popup__button-save')
  buttonSubmitPopup.textContent = 'Сохранение...'
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
  });


api.getInitialCards()
  .then((data) => {
    defaultCardList = new Section(
      {
        items: data,
        renderer: (item) => {
          defaultCardList.addItem(renderCardItems(item));
        },
        containerSelector: containerSelector,
      },
    );
    defaultCardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

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
        api.LikeCard(cardId)
        .then((data) => {
          buttonLike.classList.add("elements__button-like_active");
          likeQuantity.textContent = data.likes.length;
          return
        });
      } else {
        api.DeleteLikeCard(cardId)
        .then((data) => {
          buttonLike.classList.remove("elements__button-like_active");
          likeQuantity.textContent = data.likes.length;
          return
        });
      }
    },
    handleDeleteCard: (objectThisCard) => {
      popupConfirmDelete.objectThisCard = objectThisCard;
      popupConfirmDelete.open()
    },
  });
  return card.generateCard();
}

const popupConfirmDelete = new PopupWithConfirm({
  popupSelector: popupConfirmDel,
  handleButtonConfirm: () => {
    const cardId = popupConfirmDelete.objectThisCard._cardId
    api.deleteCard(cardId)
      .then(() => {
        popupConfirmDelete.objectThisCard.deleteCard();
        popupConfirmDelete.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
popupConfirmDelete.setEventListeners();

const formAvatar = new PopupWithForm({
  popupSelector: popupAvatar,
  handleFormSubmit: (info) => {
    loadApi(popupAvatar)
    api
      .setAvatar(info.avatar)
      .then((data) => {
        console.log(data.avatar);
        userInfo.setUserInfo(data.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
formAvatar.setEventListener();

const formProfile = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: (info) => {
    loadApi(popupProfile)
    api.setUserInfo(info.name, info.info)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
formProfile.setEventListener();

const popupImageW = new PopupWithImage(popupImage);
popupImageW.setEventListeners();

const formCard = new PopupWithForm({
  popupSelector: popupCard,
  handleFormSubmit: (data) => {
    loadApi(popupCard)
    api.postCard(data.name, data.image)
      .then((data) => {
        defaultCardList.addNewItem(renderCardItems(data));
      })
      .catch((err) => {
        console.log(err);
      });
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

profileAvatarEdit.addEventListener('mouseenter', () => {
  profileAvatarEdit.classList.add('profile__avatar-edit_type_active')
})
profileAvatarEdit.addEventListener('mouseleave', () => {
  profileAvatarEdit.classList.remove('profile__avatar-edit_type_active')
});


