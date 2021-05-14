// popup
let buttonEdit = document.querySelector('.profile__button-edit');
let buttonClosePopup = document.querySelector('.popup__button-close');
let popupDefoult = document.querySelector('.popup');
let buttonSaveProfile = document.querySelector('.popup__button-save');
// formElement
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_value_name');
let jobInput = document.querySelector('.popup__input_value_job');
let profileName = document.querySelector('.profile__info-title');
let profileJob = document.querySelector('.profile__info-subtitle');

popupDefoult.classList.remove('popup_opened');

buttonEdit.addEventListener('click', () => {
  popupDefoult.classList.toggle('popup_opened');
});

buttonClosePopup.addEventListener('click', () => {
  popupDefoult.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
    evt.preventDefault();
profileName.textContent = nameInput.value;
profileJob.textContent = jobInput.value;

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

buttonSaveProfile.addEventListener('click', () => {
  popupDefoult.classList.remove('popup_opened');
});
