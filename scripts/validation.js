// config file to store name of all relevent classes
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function showInputError(formElement, inputElement, options) {
  const messageElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  messageElement.textContent = inputElement.validationMessage;
  messageElement.classList.add(options.errorClass);
}

function hideInputError(formElement, inputElement, options) {}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

// set event listeners for all the inputs on a particular form. Takes the form element and the config file as arguments.
function setInputFieldEventListeners(formElement, options) {
  // create a new array of all the forms input elements by finding all the elements within the form that have the class .popup__input
  const inputElements = [
    ...formElement.querySelectorAll(options.inputSelector),
  ];
  // iterate over the array of form input elements and add an event listener of type 'input'. Haven't finished this yet
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (event) => {
      checkInputValidity(formElement, inputElement, options);
    });
  });
}

function enableValidation(options) {
  // creates a new array of all forms in the document by finding all elements with the .popup_form class.
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );
  // iterates through the array of forms and adds a submission event listener on each one
  formElements.forEach((element) => {
    element.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    // use the setInputFieldEventListeners function created above to set the individual field event input listeners
    setInputFieldEventListeners(element, options);
  });
}

enableValidation(config);
