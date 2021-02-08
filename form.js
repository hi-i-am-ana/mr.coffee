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

// Select close modal window button
const closeModalButton = document.getElementById('close-modal-button');

// Create variable to save validation status
let validForm;

contactForm.onsubmit = (event) => {
  // Get values of input fields
  const surnameValue = surname.value;
  const nameValue = name.value;
  const phoneValue = phone.value;
  const emailValue = email.value;
  const messageValue = message.value;

  event.preventDefault();
  clearValidation();

  // Validate surname (not empty & valid format)
  if (!inputEmptyValidation(surnameValue)) {
    surnameEmptyAlert.style.display = 'block';
    surname.style.border = 'solid 1px red';
    validForm = false;
  } else if (!inputNameValidation(surnameValue)) {
    surnameFormatAlert.style.display = 'block';
    surname.style.border = 'solid 1px red';
    validForm = false;
  };

  // Validate name (not empty & valid format)
  if (!inputEmptyValidation(nameValue)) {
    nameEmptyAlert.style.display = 'block';
    name.style.border = 'solid 1px red';
    validForm = false;
  } else if (!inputNameValidation(nameValue)) {
    nameFormatAlert.style.display = 'block';
    name.style.border = 'solid 1px red';
    validForm = false;
  };

  // Validate phone (valid format)
  if (!inputPhoneValidation(phoneValue) && inputEmptyValidation(phoneValue)) {
    phoneFormatAlert.style.display = 'block';
    phone.style.border = 'solid 1px red';
    validForm = false;
  };

  // Validate email (not empty & valid format)
  if (!inputEmptyValidation(emailValue)) {
    emailEmptyAlert.style.display = 'block';
    email.style.border = 'solid 1px red';
    validForm = false;
  } else if (!inputEmailValidation(emailValue)) {
    emailFormatAlert.style.display = 'block';
    email.style.border = 'solid 1px red';
    validForm = false;
  };

  // Validate message (not empty)
  if (!inputEmptyValidation(messageValue)) {
    messageEmptyAlert.style.display = 'block';
    message.style.border = 'solid 1px red';
    validForm = false;
  };

  if (validForm) {
    console.log(`${surname.name}: ${surnameValue}`);
    console.log(`${name.name}: ${nameValue}`);
    console.log(`${email.name}: ${emailValue}`);
    console.log(`${phone.name}: ${phoneValue}`);
    console.log(`${message.name}: ${messageValue}`);

    event.target.reset();
    clearValidation();

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  };
};

closeModalButton.onclick = () => {
  modal.style.display = 'none';
  document.body.style.overflow = '';
};

const inputEmptyValidation = (inputValue) => inputValue !== '';

const inputNameValidation = (inputValue) => {
  const nameRegex = /^[a-zA-Z][^0-9_.,!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/;
  return nameRegex.test(inputValue);
};

const inputPhoneValidation = (inputValue) => {
  const phoneRegex = /^\d{10,}$/;
  return phoneRegex.test(inputValue);
};

const inputEmailValidation = (inputValue) => {
  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(inputValue);
};

const clearValidation = () => {
  validForm = true;

  surnameEmptyAlert.style.display = 'none';
  surnameFormatAlert.style.display = 'none';
  nameEmptyAlert.style.display = 'none';
  nameFormatAlert.style.display = 'none';
  emailEmptyAlert.style.display = 'none';
  emailFormatAlert.style.display = 'none';
  phoneFormatAlert.style.display = 'none';
  messageEmptyAlert.style.display = 'none';

  surname.style.border = '';
  name.style.border = '';
  phone.style.border = '';
  email.style.border = '';
  message.style.border = '';
};