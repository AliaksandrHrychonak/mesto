
let buttonEdit = document.querySelector('.profile__button-edit');
let popupDefoult = document.querySelector('.popup');

buttonEdit.addEventListener('click', () => {
  document.querySelector('.popup').classList.toggle('popup_opened');
});

document.querySelector('.popup__button-close').addEventListener('click', () => {
  document.querySelector('.popup').classList.remove('popup_opened');
});
