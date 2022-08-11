class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", () => {
            this._toggleLikeButton(likeButton);
        });

        this._deleteButton.addEventListener("click", () => {
            this._handleDeleteCard();
        });

        imageElement.addEventListener("click", () => {
            popupImage.src = data.url;
            popupImage.alt = data.title;
            popupCaption.textContent = data.title;
            openPopup(imagePopupWindow);
        });
    }

    _toggleLikeButton() {}

    _handleDeleteCard() {}

    _getTemplate() {
        document
            .querySelector(this.cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);
    }

    getView() {
        this._element = this._getTemplate();

        this.__element.querySelector(
            ".card__image"
        ).style.backgroundImage = `url(${this._link})`;
        this._element.querySelector(".card__title").textContent = this._text;

        this._setEventListeners();
    }
}

export default Card;
