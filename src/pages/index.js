import "./index.css";
import { initialCards, validationConfig } from "../utils/constants";

//Import all my classes
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

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
      const card = createCard(item);
      cardSection.addItem(card);
    },
  },
  ".photo-grid"
);

const addCardPopup = new PopupWithForm("#add-card-popup", (data) => {
  const card = createCard(data);
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
const userNamePopupField = document.querySelector("#owner-name");
const userTitlePopupField = document.querySelector("#owner-about");

editButton.addEventListener("click", () => {
  userNamePopupField.value = userInfo.getUserInfo().name;
  userTitlePopupField.value = userInfo.getUserInfo().description;
  editUserPopup.open();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValidator.toggleButtonState();
});

function createCard(data) {
  const card = new Card(
    data,
    (imageData) => {
      cardPreviewPopup.open(imageData);
    },
    "#card-template"
  ).generateCard();
  return card;
}
