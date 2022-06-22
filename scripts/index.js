const editProfilePopupWindow = document.querySelector('#edit-profile-popup');
const addPlacePopupWindow = document.querySelector('#add-card-popup');
const imagePopupWindow = document.querySelector('#image-popup');
const editForm = document.querySelector('#edit-profile-form');
const addPlaceForm = document.querySelector('#add-place-form');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__title');
const titleInput = document.querySelector('[name="name"]');
const descriptionInput = document.querySelector('input[name="description"]');
const placeURL = document.querySelector('[name="url"]');
const placeTitle = document.querySelector('[name="title"]');
const closeButtons = document.querySelectorAll('.popup__close');
const addButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#card-template');
const cardList = document.querySelector('.photo-grid');
const initialCards = [
    { 'title': 'Delicious Cake', 'url': 'https://images.unsplash.com/photo-1655552360629-2cbbb116727f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { 'title': 'Lake Louise', 'url': 'https://code.s3.yandex.net/web-code/lake-louise.jpg' },
    { 'title': 'Bald Mountains', 'url': 'https://code.s3.yandex.net/web-code/bald-mountains.jpg' },
    { 'title': 'Latemar', 'url': 'https://code.s3.yandex.net/web-code/latemar.jpg' },
    { 'title': 'Vanoise National Park', 'url': 'https://code.s3.yandex.net/web-code/vanoise.jpg' },
    { 'title': 'Lago di Braies', 'url': 'https://code.s3.yandex.net/web-code/lago.jpg' },
]


titleInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;

function closePopup(popup) {
    popup.classList.remove('popup_true');
}



function openPopup(popup) {
    popup.classList.add('popup_true');
}


function handleEditProfileFormSubmit(event) {
    event.preventDefault();

    profileName.textContent = titleInput.value;
    profileDescription.textContent = descriptionInput.value;

    closePopup(editProfilePopupWindow);

    titleInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}

function handleNewPlaceFormSubmit(event) {
    event.preventDefault();

    const newObject = {
        url: placeURL.value,
        title: placeTitle.value
    }


    renderCard(newObject);
    closePopup(addPlacePopupWindow);
}

editButton.addEventListener('click', () => {
    openPopup(editProfilePopupWindow);
});

addButton.addEventListener('click', () => {
    openPopup(addPlacePopupWindow);
});

closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        const popup = closeButton.closest('.popup');
        closePopup(popup);
    })
})
editForm.addEventListener('submit', handleEditProfileFormSubmit);
addPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);



function createCard(data) {
    const card = cardTemplate.content.querySelector('.card').cloneNode(true);
    const imageElement = card.querySelector('.card__image');
    const titleElement = card.querySelector('.card__title');
    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');

    imageElement.src = data.url;
    titleElement.textContent = data.title;

    function toggleLikeButton(button) {
        if (button.classList.contains('card__like-button')) {
            button.classList.remove('card__like-button');
            button.classList.add('card__like-button_true');
        } else {
            button.classList.add('card__like-button');
            button.classList.remove('card__like-button_true');
        }
    }

    function deleteCard() {
        card.classList.remove('card');
        card.classList.add('card_removed');
    }

    likeButton.addEventListener('click', () => {
        toggleLikeButton(likeButton)
    });

    deleteButton.addEventListener('click', () => {
        deleteCard()
    });

    imageElement.addEventListener('click', () => {
        const popupImage = imagePopupWindow.querySelector('.popup__image');
        popupImage.src = data.url;
        const popupCaption = imagePopupWindow.querySelector('.popup__caption');
        popupCaption.textContent = data.title;
        openPopup(imagePopupWindow);
    })
    return card;
}

function addCardToPage(card) {
    cardList.prepend(card);
}

function renderCard(data) {
    addCardToPage(createCard(data));
}

initialCards.forEach(renderCard);