// popup
let popupProfile = document.querySelector('.popup_type_profile');
let popupCard = document.querySelector('.popup_type_card');
let popupImage = document.querySelector('.popup_type_image');
// button
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonCloseProfile = document.querySelector('.profile_close');
const buttonCloseCard = document.querySelector('.card_close')
const buttonAddCard = document.querySelector('.profile__button-add')
const buttonLike = document.querySelector('.elements__button-like')
const buttonDeleteCard = document.querySelector('.elements__button_delete')
// formElement
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_value_name');
let jobInput = document.querySelector('.popup__input_value_job');
let profileName = document.querySelector('.profile__info-title');
let profileJob = document.querySelector('.profile__info-subtitle');

function toggleModal(modal) {
  modal.classList.toggle('popup_opened')
}

function closePopup (modal) {
  modal.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup ();
}

buttonEdit.addEventListener('click', () => toggleModal(popupProfile))
buttonAddCard.addEventListener('click', () => toggleModal(popupCard))

buttonCloseCard.addEventListener('click', () => closePopup(popupCard))
buttonCloseProfile.addEventListener('click',() => closePopup(popupProfile));

formElement.addEventListener('submit', formSubmitHandler);


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const itemTemplate = document.querySelector('.template').content;
const list = document.querySelector('elements__list');
const buttonSubmitCard = document.querySelector('popup__button-create');

function renderItems() {
  initialCards.forEach(renderItem);
}

function renderItem(text){
  const htmlElement = itemTemplate.cloneNode(true);
  htmlElement.querySelector('.elements__title').innerText = text;
  setEventListeners(htmlElement);

  list.appendChild(htmlElement);

}

// function handleSubmit() {
//   renderItem(formInput.value);
// }
// // удаление карточки
// function handleDelete(evt) {
//   evt.target.closest('.elements__card').remove();
// }

// function setEventListeners(element) {
//   element.querySelector('.elements__button_delete').addEventListener('click', handleDelete)
// }


// // buttonSubmitCard.addEventListener('click', handleSubmit);

// renderItems();



