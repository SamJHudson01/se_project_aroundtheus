class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
        this._inputElements = [
            ...this._formElement.querySelectorAll(this._inputSelector),
        ];
        this._submitButton = this._formElement.querySelector(
            this._submitButtonSelector
        );
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(
            `#${inputElement.id}-error`
        );
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const messageElement = this._formElement.querySelector(
            `#${inputElement.id}-error`
        );
        inputElement.classList.remove(this._inputErrorClass);
        messageElement.textContent = "";
        messageElement.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    toggleButtonState() {
        const foundInvalid = this._inputElements.some(
            (el) => !el.validity.valid
        );
        if (foundInvalid) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    _setEventListeners() {
        this._inputElements.forEach((inputElement) => {
            inputElement.addEventListener("input", (event) => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
        
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault();
        });
        this._setEventListeners();
    }
}

export default FormValidator;
