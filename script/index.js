
let buttonEdit = document.querySelector('.profile__button-edit');
let buttonClosePopup = document.querySelector('.popup__button-close');
let popupDefoult = document.querySelector('.popup');

buttonEdit.addEventListener('click', () => {
  document.querySelector('.popup').classList.toggle('popup_opened');
});

buttonClosePopup.addEventListener('click', () => {
  document.querySelector('.popup').classList.remove('popup_opened');
});
