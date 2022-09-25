import "./index.css";

//Import all my classes
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

//All constants to be used
const initialCards = [
  {
    title: "Delicious Cake",
    url: "https://images.unsplash.com/photo-1655552360629-2cbbb116727f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    title: "Lake Louise",
    url: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    title: "Bald Mountains",
    url: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    url: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    title: "Vanoise National Park",
    url: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    url: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//Create all class instances

const profileFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-profile-popup")
);

const addCardFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#add-card-popup")
);

const userInfo = new UserInfo(".profile__name", ".profile__title");
const editUserPopup = new PopupWithForm("#edit-profile-popup", (data) => {
  userInfo.setUserInfo(data);
  console.log(data);
  editUserPopup.close();
});
const cardPreviewPopup = new PopupWithImage("#image-popup");
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        (imageData) => {
          cardPreviewPopup.open(imageData);
        },
        "#card-template"
      ).generateCard();
      cardSection.addItem(card);
    },
  },
  ".photo-grid"
);

const addCardPopup = new PopupWithForm("#add-card-popup", (data) => {
  const card = new Card(
    data,
    (imageData) => {
      cardPreviewPopup.open(imageData);
    },
    "#card-template"
  ).generateCard();
  cardSection.addItem(card);
  addCardPopup.close();
});

//Initialise all class instances
cardSection.renderItems();
cardPreviewPopup.setEventListeners();
editUserPopup.setEventListeners();
addCardPopup.setEventListeners();
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//Everything else
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

editButton.addEventListener("click", () => {
  editUserPopup.open();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValidator.toggleButtonState();
});
