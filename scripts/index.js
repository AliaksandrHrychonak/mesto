// popup
let buttonEdit = document.querySelector('.profile__button-edit');
let buttonClosePopup = document.querySelector('.popup__button-close');
let popupDefoult = document.querySelector('.popup');
// formElement
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_value_name');
let jobInput = document.querySelector('.popup__input_value_job');
let profileName = document.querySelector('.profile__info-title');
let profileJob = document.querySelector('.profile__info-subtitle');

function openPopup () {
  popupDefoult.classList.add('popup_opened');
}

function closePopup () {
  popupDefoult.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', openPopup);

buttonClosePopup.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
profileName.textContent = nameInput.value;
profileJob.textContent = jobInput.value;
closePopup ();
}

formElement.addEventListener('submit', formSubmitHandler);
