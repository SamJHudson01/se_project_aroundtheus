import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector(".popup__image");
        this._popupCaption = this._popup.querySelector(".popup__caption");
    }

    open(data) {
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupCaption.textContent = data.name;
        console.log(this._popupImage.src);
        console.log(this._popupImage.alt);
        super.open();
    }   
}