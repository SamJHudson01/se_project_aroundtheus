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
import ConfirmDeleteCardPopup from "../components/ConfirmDeleteCardPopup";

//Create all class instances

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
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

const changeAvatarFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#change-avatar-popup")
);

const editUserPopup = new PopupWithForm("#edit-profile-popup", (data) => {
  api.setUserInfo(data);
  api.getUserInfo((data) => {
    userInfo.setUserInfo(data);
  });
  editUserPopup.close();
});
const cardPreviewPopup = new PopupWithImage("#image-popup");

// const addCardPopup = new PopupWithForm("#add-card-popup", (data) => {
//   api.addCard(data, (data) => {
//     const card = createCard(data);
//     cardSection.addItem(card);
//   });
//   addCardPopup.close();
// });

const addCardPopup = new PopupWithForm("#add-card-popup", (data) => {
  addCardPopup.renderLoading(true, "Saving...");
  api.addCard(data, (data) => {
    const card = createCard(data);
    cardSection.addItem(card);
    addCardPopup.close();
    addCardPopup.renderLoading(false, "Create");
  });
});

const deleteCardPopup = new ConfirmDeleteCardPopup(
  "#delete-popup",
  (id, element) => {
    deleteCardPopup.close();
    api.deleteCard(id, element);
  }
);

const editAvatarPopup = new PopupWithForm("#change-avatar-popup", (data) => {
  editAvatarPopup.renderLoading(true, "Saving...");
  api.changeAvatar(data)
  .then((result) => {
    userInfo.setUserAvatar(result.avatar);
    editAvatarPopup.close();
    editAvatarPopup.renderLoading(false, "Save");
  })
  .catch((err) => {
    console.log(err);
  });
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

Promise.all([api.getInitialCards(), api.getUserInfo()]).then((values) => {
  values[0].forEach((item) => {
    const card = createCard(item);
    cardSection.addInitialItem(card);
  });

  userInfo.setUserInfo(values[1]);
  userInfo.setUserAvatar(values[1].avatar);
});

//

cardPreviewPopup.setEventListeners();
editUserPopup.setEventListeners();
addCardPopup.setEventListeners();
changeAvatarFormValidator.enableValidation();
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
deleteCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();

//Everything else
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const userNamePopupField = document.querySelector("#owner-name");
const userTitlePopupField = document.querySelector("#owner-about");
const changeAvatarButton = document.querySelector(
  ".profile__image-edit-button"
);

editButton.addEventListener("click", () => {
  userNamePopupField.value = userInfo.getUserInfo().name;
  userTitlePopupField.value = userInfo.getUserInfo().about;
  console.log(userInfo.getUserInfo().about);
  editUserPopup.open();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValidator.toggleButtonState();
});

changeAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
});

function createCard(data, profileId) {
  const card = new Card(
    data,
    (imageData) => {
      cardPreviewPopup.open(imageData);
    },
    "#card-template",
    profileId,
    (id, element) => {
      deleteCardPopup.open(id, element);
    },
    (id, False, element) => {
      api.toggleLike(id, False, element);
    }
  ).generateInitialCard(data);
  return card;
}
