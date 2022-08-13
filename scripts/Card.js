class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _setEventListeners() {
        this._element
            .querySelector(".card__like-button")
            .addEventListener("click", this._handleLikeIcon.bind(this));

        this._element
            .querySelector(".card__delete-button")
            .addEventListener("click", this._handleDeleteCard);

        this._element
            .querySelector(".card__image")
            .addEventListener("click", this._handlePreviewPicture);
    }

    _handleLikeIcon() {
        this._element
            .querySelector(".card__like-button")
            .classList.toggle(".card__like-button_true");
    }

    _handleDeleteCard() {}

    _handlePreviewPicture() {}

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
