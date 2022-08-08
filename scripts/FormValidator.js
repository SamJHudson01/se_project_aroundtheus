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

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(
            `#${inputElement.id}-error`
        );
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement, errorMessage) {}

    _toggleButtonState() {
        let foundInvalid = false;

        this._inputElements.forEach((inputElement) => {
            if (!inputElement.validity.valid) {
                foundInvalid = true;
            }
        });

        if (foundInvalid) {
            this._submitButton.classList.add(config._inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(config._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    _setEventListeners() {
        this._inputElements.forEach((inputElement) => {
            inputElement.addEventListener("input", (event) => {
                checkInputValidity(this._formElement, inputElement, options);
                toggleButtonState(inputElements, submitButton, options);
            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault();
        });
        setInputFieldEventListeners(element, options);
    }
}

const editFormValidator = new FormValidator();
