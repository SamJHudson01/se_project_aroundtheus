const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

function showInputError(formElement, inputElement, options) {
    const messageElement = formElement.querySelector(
        `#${inputElement.id}-error`
    );
    inputElement.classList.add(options.inputErrorClass);
    messageElement.textContent = inputElement.validationMessage;
    messageElement.classList.add(options.errorClass);
}

function hideInputError(formElement, inputElement, options) {
    const messageElement = formElement.querySelector(
        `#${inputElement.id}-error`
    );
    inputElement.classList.remove(options.inputErrorClass);
    messageElement.textContent = "";
    messageElement.classList.remove(options.errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, options);
    } else {
        hideInputError(formElement, inputElement, options);
    }
}

function toggleButtonState(inputElements, submitButton, options) {
    let foundInvalid = false;

    inputElements.forEach((inputElement) => {
        if (!inputElement.validity.valid) {
            foundInvalid = true;
        }
    });

    if (foundInvalid) {
        submitButton.classList.add(options.inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(options.inactiveButtonClass);
        submitButton.disabled = false;
    }
}

function setInputFieldEventListeners(formElement, options) {
    const inputElements = [
        ...formElement.querySelectorAll(options.inputSelector),
    ];
    const submitButton = formElement.querySelector(
        options.submitButtonSelector
    );

    inputElements.forEach((inputElement) => {
        inputElement.addEventListener("input", (event) => {
            checkInputValidity(formElement, inputElement, options);
            toggleButtonState(inputElements, submitButton, options);
        });
    });
}

function enableValidation(options) {
    const formElements = Array.from(
        document.querySelectorAll(options.formSelector)
    );
    formElements.forEach((element) => {
        element.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        setInputFieldEventListeners(element, options);
    });
}

enableValidation(config);
