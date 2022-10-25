import { profileId } from "../utils/constants";

class Card {
  constructor(data, handleImageClick, cardSelector, profileId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._profileID = profileId;

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

  generateInitialCard(data) {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    console.log(data)
    if (data.owner._id !== "8d814e3f6930e2ea2f332d3d" || !data.owner._id) {
      this._deleteButton.style.display = "none";
    }
    this._element.querySelector(".card__title").textContent = this._name;
    if (this._likes) {
      this._element.querySelector(".card__like-count").textContent =
        this._likes.length;
    } else {
      this._element.querySelector(".card__like-count").textContent = 0;
    }

    return this._element;
  }

  generateNewCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__like-count").textContent = 0;

    return this._element;
  }
}

export default Card;
