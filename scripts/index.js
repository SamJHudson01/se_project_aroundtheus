const popupWindow = document.querySelector(".popup");
const editForm = document.querySelector(".popup__form");
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__title");
const titleInput = document.querySelector(".popup__input-type-name");
const descriptionInput = document.querySelector(".popup__input-type-description");
const closeButton = document.querySelector(".popup__close");
const saveButton = document.querySelector(".popup__save-button");



function togglePopup() {
    if (!popupWindow.classList.contains("popup__is_open")) {
        titleInput.value = profileName.textContent;
        descriptionInput.value = profileDescription.textContent;
    }

    popupWindow.classList.toggle("popup__is_open");
}

function formSubmitHandler(event) {
    event.preventDefault();

    profileName.textContent = titleInput.value;
    profileDescription.textContent = descriptionInput.value;

    togglePopup();
}

editButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);
saveButton.addEventListener("click", formSubmitHandler);