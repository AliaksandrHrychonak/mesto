
let buttonEdit = document.querySelector('.profile__button-edit');
let buttonClosePopup = document.querySelector('.popup__button-close');
let popupDefoult = document.querySelector('.popup');

popupDefoult.classList.remove('popup_opened');

buttonEdit.addEventListener('click', () => {
  popupDefoult.classList.toggle('popup_opened');
});

buttonClosePopup.addEventListener('click', () => {
  popupDefoult.classList.remove('popup_opened');
});
