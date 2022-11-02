import Popup from "./Popup";

export default class ConfirmDeleteCardPopup extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector);
    this._deleteCard = deleteCard;
    this._id = null;
    this._card = null;
    this._form = this._popup.querySelector(".popup__form");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._deleteCard(this._id, this._card);
      });
  }

  open(id, card) {
    this._id = id;
    this._card = card;
    super.open();
  }

  close() {
    this._card.remove();
    this._card = null;
    super.close();
  }

  getId() {
    return this._id;
  }
}
