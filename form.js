const contactForm = document.getElementById('contact-form');

// Select input fields
const surname = document.getElementById('surname');
const name = document.getElementById('name');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const message = document.getElementById('message');

// Select validation alerts
const surnameEmptyAlert = document.getElementById('surname-empty-alert');
const surnameFormatAlert = document.getElementById('surname-format-alert');
const nameEmptyAlert = document.getElementById('name-empty-alert');
const nameFormatAlert = document.getElementById('name-format-alert');
const phoneFormatAlert = document.getElementById('phone-format-alert');
const emailEmptyAlert = document.getElementById('email-empty-alert');
const emailFormatAlert = document.getElementById('email-format-alert');
const messageEmptyAlert = document.getElementById('message-empty-alert');

const submitButton = document.getElementById('submit-button');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal-button');

// Create object to:
// 1) define if input needs to be checked if it's not empty
// 2) define if input needs to be checked if it has valid format
// 2) save validation status of each input
let formValidStatus = {
  surname: {
    emptyValidation: true,
    formatValidation: true,
    validationStatus: false,
  },
  name: {
    emptyValidation: true,
    formatValidation: true,
    validationStatus: false,
  },
  phone: {
    emptyValidation: false,
    formatValidation: true,
    validationStatus: true,
  },  
  email: {
    emptyValidation: true,
    formatValidation: true,
    validationStatus: false,
  },
  message: {
    emptyValidation: true,
    formatValidation: false,
    validationStatus: false,
  },
};

// Declare functions for input validation
const inputEmptyValidation = (inputValue) => inputValue !== '';

const inputNameValidation = (inputValue) => {
  const nameRegex = /^[a-zA-Z][^0-9_.,!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/;
  return nameRegex.test(inputValue);
};

const inputPhoneValidation = (inputValue) => {
  const phoneRegex = /^\d{10,}$/;
  return phoneRegex.test(inputValue)  || inputValue === '';
};

const inputEmailValidation = (inputValue) => {
  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(inputValue);
};

// Declare event handler function for oninput event listeners for inputs
const inputValidation = (event, fieldEmptyAlert, fieldFormatAlert, inputEmptyValidation, inputFormatValidation, input) => {
    input.emptyValidation ? fieldEmptyAlert.style.display = 'none' : false;
    input.formatValidation ? fieldFormatAlert.style.display = 'none' : false;

  if (input.emptyValidation && !inputEmptyValidation(event.target.value)) {
    fieldEmptyAlert.style.display = 'block';
    event.target.style.border = 'solid 1px red';
    input.validationStatus = false;
    submitButton.setAttribute('disabled', 'true');
  } else if (input.formatValidation && !inputFormatValidation(event.target.value)) {
    fieldFormatAlert.style.display = 'block';
    event.target.style.border = 'solid 1px red';
    input.validationStatus = false;
    submitButton.setAttribute('disabled', 'true');
  } else {
    input.emptyValidation ? fieldEmptyAlert.style.display = 'none' : false;
    input.formatValidation ? fieldFormatAlert.style.display = 'none' : false;
    event.target.style.border = '';
    input.validationStatus = true;
  };

  !Object.values(formValidStatus).some(input => (input.validationStatus !== true)) ? submitButton.removeAttribute('disabled') : false;
}

// Add oninput event listeners for inputs
surname.addEventListener('input', (event) => inputValidation(event, surnameEmptyAlert, surnameFormatAlert, inputEmptyValidation, inputNameValidation, formValidStatus.surname));
name.addEventListener('input', (event) => inputValidation(event, nameEmptyAlert, nameFormatAlert, inputEmptyValidation, inputNameValidation, formValidStatus.name));
phone.addEventListener('input', (event) => inputValidation(event, '', phoneFormatAlert, '', inputPhoneValidation, formValidStatus.phone));
email.addEventListener('input', (event) => inputValidation(event, emailEmptyAlert, emailFormatAlert, inputEmptyValidation, inputEmailValidation, formValidStatus.email));
message.addEventListener('input', (event) => inputValidation(event, messageEmptyAlert, '', inputEmptyValidation, '', formValidStatus.message));

// Add form onsubmit event listener
contactForm.onsubmit = (event) => {
  event.preventDefault();
  
  console.log(`${surname.name}: ${surname.value}`);
  console.log(`${name.name}: ${name.value}`);
  console.log(`${email.name}: ${email.value}`);
  console.log(`${phone.name}: ${phone.value}`);
  console.log(`${message.name}: ${message.value}`);

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  event.target.reset();

  formValidStatus.surname.validationStatus = false;
  formValidStatus.name.validationStatus = false;
  formValidStatus.phone.validationStatus = true;
  formValidStatus.email.validationStatus = false;
  formValidStatus.message.validationStatus = false;
  submitButton.setAttribute('disabled', 'true');
};

// Add close modal button onclick event listener
closeModalButton.onclick = () => {
  modal.style.display = 'none';
  document.body.style.overflow = '';
};