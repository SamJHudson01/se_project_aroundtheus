import "./index.css";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { openPopup, closePopup, closeWithEscape, togglePopupCloseEventListeners } from "../components/utils.js";


const editProfilePopupWindow = document.querySelector("#edit-profile-popup");
const addPlacePopupWindow = document.querySelector("#add-card-popup");
const editForm = document.querySelector("#edit-profile-form");
const addPlaceForm = document.querySelector("#add-place-form");
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__title");
const titleInput = document.querySelector('[name="name"]');
const descriptionInput = document.querySelector('input[name="description"]');
const placeURL = document.querySelector('[name="url"]');
const placeTitle = document.querySelector('[name="title"]');
const closeButtons = document.querySelectorAll(".popup__close");
const addButton = document.querySelector(".profile__add-button");
const cardList = document.querySelector(".photo-grid");
const formSubmitButton = document.querySelector("#add-place-submit-button");
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

const editFormElement = editProfilePopupWindow.querySelector(".popup__form");
const addFormElement = addPlacePopupWindow.querySelector(".popup__form");
const editFormValidator = new FormValidator(validationConfig, editFormElement);
const addFormValidator = new FormValidator(validationConfig, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();


function handleEditProfileFormSubmit(event) {
    event.preventDefault();

    profileName.textContent = titleInput.value;
    profileDescription.textContent = descriptionInput.value;

    closePopup(editProfilePopupWindow);
}

function handleNewPlaceFormSubmit(event) {
    event.preventDefault();

    const newObject = {
        url: placeURL.value,
        title: placeTitle.value,
    };

    renderCard(newObject, cardList);
    closePopup(addPlacePopupWindow);
    addFormValidator.toggleButtonState();
    placeURL.value = "";
    placeTitle.value = "";
}

editButton.addEventListener("click", () => {
    titleInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openPopup(editProfilePopupWindow);
});

addButton.addEventListener("click", () => {
    openPopup(addPlacePopupWindow);
});

closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
        const popup = closeButton.closest(".popup");
        closePopup(popup);
    });
});
editForm.addEventListener("submit", handleEditProfileFormSubmit);
addPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);


function addCardToPage(card) {
    cardList.prepend(card);
}

const renderCard = (data, wrap) => {
    const card = new Card(data, '#card-template').generateCard();
    // wrap.prepend(createCard(data));
    wrap.prepend(card);

}


initialCards.forEach(card => renderCard(card, cardList));
togglePopupCloseEventListeners(); 



