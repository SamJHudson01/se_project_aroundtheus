import "./index.css";
import { validationConfig, profileId } from "../utils/constants";

//Import all my classes
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";

//Create all class instances

const initialStateApi = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: profileId,
  },
});

const editUserApi = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  method: "PATCH",
  headers: {
    authorization: profileId,
    "Content-Type": "application/json",
  },
});

const addCardApi = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  method: "POST",
  headers: {
    authorization: profileId,
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__title",
  ".profile__picture"
);

const profileFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-profile-popup")
);

const addCardFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#add-card-popup")
);

const editUserPopup = new PopupWithForm("#edit-profile-popup", (data) => {
  editUserApi.setUserInfo(data);
  editUserApi.getUserInfo((data) => {
    userInfo.setUserInfo(data);
  });
  editUserPopup.close();
});
const cardPreviewPopup = new PopupWithImage("#image-popup");

const addCardPopup = new PopupWithForm("#add-card-popup", (data) => {
  const card = createCard(data);
  addCardApi.addCard(data);
  cardSection.addItem(card);
  addCardPopup.close();
});

const deleteCardPopup = new PopupWithForm("#delete-popup", (data) => {
  deleteCardPopup.close();
});

const cardSection = new Section(
  {
    items: {},
    renderer: (item) => {
      const card = createCard(item);
      cardSection.addItem(card);
    },
  },
  ".photo-grid"
);

//Initialise all class instances

initialStateApi.getInitialCards((data) => {
  data.forEach((item) => {
    // console.log(item);
    const card = createCard(item);
    cardSection.addInitialItem(card);
  });
});

initialStateApi.getUserInfo((data) => {
  userInfo.setUserInfo(data);
  userInfo.setUserAvatar(data.avatar);
});

cardPreviewPopup.setEventListeners();
editUserPopup.setEventListeners();
addCardPopup.setEventListeners();
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
deleteCardPopup.setEventListeners();

//Everything else
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const userNamePopupField = document.querySelector("#owner-name");
const userTitlePopupField = document.querySelector("#owner-about");



editButton.addEventListener("click", () => {
  userNamePopupField.value = userInfo.getUserInfo().name;
  userTitlePopupField.value = userInfo.getUserInfo().about;
  editUserPopup.open();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValidator.toggleButtonState();
});




function createCard(data, profileId) {
  const card = new Card(
    data,
    (imageData) => {
      cardPreviewPopup.open(imageData);
    },
    "#card-template",
    profileId
  ).generateInitialCard(data);
  return card;
}


