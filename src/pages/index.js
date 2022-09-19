import "./index.css";

//Import all my classes
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { openPopup, closePopup, closeWithEscape, togglePopupCloseEventListeners } from "../components/utils.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";


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
const CardPreviewPopup = new PopupWithImage(".popup__content_type-image");
const CardSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, (imageData) => {
            CardPreviewPopup.open(imageData);
        } , '#card-template').generateCard();
        CardSection.addItem(card);
    }
}, ".photo-grid");






//Initialise all class instances
CardSection.renderItems();
CardPreviewPopup.setEventListeners();

//Everything else

