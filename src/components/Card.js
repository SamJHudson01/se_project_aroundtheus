class Card {
  constructor(data, handleImageClick, cardSelector) {
    this._name = data.title;
    this._link = data.url;

    this._cardSelector = cardSelector;
    this._likeButton = null;
    this._deleteButton = null;
    this._cardImage = null;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => this._handleLike());

    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._deleteButton.addEventListener("click", () => this._handleDelete());

    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick({ link: this._link, name: this._name })
    );
  }

  _handleLike() {
    this._likeButton.classList.toggle("card__like-button_true");
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}

export default Card;
