import { profileId } from "../utils/constants";

class Card {
  constructor(
    data,
    handleImageClick,
    cardSelector,
    profileId,
    handleDeleteClick,
    handleLike
  ) {
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
    this._handleDeleteClick = handleDeleteClick;
    this._handleLike = handleLike;
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
    this._likeButton.addEventListener("click", () => {
      this._handleLike(
        this._id,
        this._likeButton.classList.contains("card__like-button_true"),
        this._element
      );
    });

    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id, this._element);
    });

    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick({ link: this._link, name: this._name })
    );
  }

  generateInitialCard(data) {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    if (data.owner._id !== "8d814e3f6930e2ea2f332d3d" || !data.owner._id) {
      this._deleteButton.style.display = "none";
    }

    if (data.likes.some((like) => like._id === "8d814e3f6930e2ea2f332d3d")) {
      this._likeButton.classList.add("card__like-button_true");
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
