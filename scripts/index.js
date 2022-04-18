const popupWindow = document.querySelector(".popup");
const editForm = document.querySelector(".popup__form");
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__title");
const titleInput = document.querySelector('[name="name"]');
const descriptionInput = document.querySelector('input[name="description"]');
const closeButton = document.querySelector(".popup__close");



function togglePopup() {
    if (!popupWindow.classList.contains("popup_true")) {
        titleInput.value = profileName.textContent;
        descriptionInput.value = profileDescription.textContent;
    }

    popupWindow.classList.toggle("popup_true");
}

function formSubmitHandler(event) {
    event.preventDefault();

    profileName.textContent = titleInput.value;
    profileDescription.textContent = descriptionInput.value;

    togglePopup();
}

editButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);
editForm.addEventListener("submit", formSubmitHandler);