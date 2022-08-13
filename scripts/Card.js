class Card {
    constructor(data, cardSelector) {
        this._name = data.title;
        this._link = data.url;

        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {}

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__title').textContent = this._name;
         
        return this._element;

    }
}

export default Card;