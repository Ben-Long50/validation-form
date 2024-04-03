import './styles/main.css';
import './styles/reset-css.css';
import countryCodes from 'country-codes-list';
import postalCodes from 'postal-codes-js';
import emailValidator from 'email-validator';
import Validator from 'passcode-validator';

const email = document.querySelector('#email');
const countryList = countryCodes.customList('countryCode', '{countryNameEn}');
const countryNames = Object.values(countryList);
const inputs = document.querySelectorAll('input');
const countryInput = document.querySelector('#country');
const zipInput = document.querySelector('#zip-code');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#password-confirm');
const resetButton = document.querySelector('button[type="reset"]');

function populateCountryOptions() {
  countryNames.forEach((element) => {
    const optionElement = document.createElement('option');
    optionElement.textContent = element;
    countryInput.appendChild(optionElement);
  });
}

populateCountryOptions();

function checkEmailValidity() {
  const emailInput = email.value;
  const emailValidity = emailValidator.validate(emailInput);
  const errorMessage = email.parentNode.querySelector('.error');
  if (emailValidity === false) {
    email.classList.remove('input-valid', 'input-focus-valid');
    email.classList.add('input-invalid', 'input-focus-invalid');
    errorMessage.textContent = 'Enter a valid email';
  } else {
    email.classList.remove('input-invalid', 'input-focus-invalid');
    email.classList.add('input-valid', 'input-focus-valid');
    errorMessage.textContent = '';
  }
}

function checkCountryValidity() {
  const countryValue = countryInput.value;
  if (typeof countryValue === 'string' && countryValue.length !== 0) {
    countryInput.classList.remove('input-invalid', 'input-focus-invalid');
    countryInput.classList.add('input-valid', 'input-focus-valid');
  } else {
    countryInput.classList.remove('input-valid', 'input-focus-valid');
    countryInput.classList.add('input-invalid', 'input-focus-invalid');
  }
}

let countryCode = '';

zipInput.addEventListener('click', () => {
  Object.entries(countryList).forEach(([key, value]) => {
    if (value === countryInput.value) {
      countryCode = key;
    }
  });
});

function checkZipValidity() {
  const postalValidity = postalCodes.validate(countryCode, zipInput.value);
  const errorMessage = zipInput.parentNode.querySelector('.error');
  if (typeof postalValidity === 'string') {
    zipInput.classList.remove('input-valid', 'input-focus-valid');
    zipInput.classList.add('input-invalid', 'input-focus-invalid');
    errorMessage.textContent = postalValidity;
  } else {
    zipInput.classList.remove('input-invalid', 'input-focus-invalid');
    zipInput.classList.add('input-valid', 'input-focus-valid');
    errorMessage.textContent = '';
  }
}

const passValidator = new Validator()
  .length(8, 30)
  .upperCase()
  .lowerCase()
  .specialChar()
  .build();

function checkPasswordValidity() {
  const passwordInput = password.value;
  const errorMessage = password.parentNode.querySelector('.error');
  const { rules, isValid } = passValidator.validate(passwordInput);
  const uncompletedRules = rules.map((rule) => !rule.isCompleted());
  console.log(uncompletedRules);
  if (isValid === false) {
    password.classList.remove('input-valid', 'input-focus-valid');
    password.classList.add('input-invalid', 'input-focus-invalid');
    errorMessage.textContent =
      'Your password must be between 8-30 characters and contain one uppercase, one lowercase and one special symbol';
  } else {
    password.classList.remove('input-invalid', 'input-focus-invalid');
    password.classList.add('input-valid', 'input-focus-valid');
    errorMessage.textContent = '';
  }
}

function checkPasswordConfirm() {
  const firstPassword = password.value;
  const secondPassword = passwordConfirm.value;
  const errorMessage = passwordConfirm.parentNode.querySelector('.error');
  if (firstPassword !== secondPassword) {
    passwordConfirm.classList.remove('input-valid', 'input-focus-valid');
    passwordConfirm.classList.add('input-invalid', 'input-focus-invalid');
    errorMessage.textContent = 'Your passwords do not match';
  } else {
    passwordConfirm.classList.remove('input-invalid', 'input-focus-invalid');
    passwordConfirm.classList.add('input-valid', 'input-focus-valid');
    errorMessage.textContent = '';
  }
}

inputs.forEach((input) => {
  input.addEventListener('blur', () => {
    input.classList.remove('input-focus-valid', 'input-focus-invalid');
  });
});

countryInput.addEventListener('blur', () => {
  countryInput.classList.remove('input-focus-valid', 'input-focus-invalid');
});

email.addEventListener('input', checkEmailValidity);
email.addEventListener('focus', checkEmailValidity);
countryInput.addEventListener('input', checkCountryValidity);
countryInput.addEventListener('focus', checkCountryValidity);
zipInput.addEventListener('input', checkZipValidity);
zipInput.addEventListener('focus', checkZipValidity);
password.addEventListener('input', checkPasswordValidity);
password.addEventListener('focus', checkPasswordValidity);
passwordConfirm.addEventListener('input', checkPasswordConfirm);
passwordConfirm.addEventListener('focus', checkPasswordConfirm);

resetButton.addEventListener('click', () => {
  email.classList.remove('input-valid', 'input-invalid');
  countryInput.classList.remove('input-valid', 'input-invalid');
  zipInput.classList.remove('input-valid', 'input-invalid');
  password.classList.remove('input-valid', 'input-invalid');
  passwordConfirm.classList.remove('input-valid', 'input-invalid');
  const errorMessages = document.querySelectorAll('.error');
  errorMessages.forEach((message) => {
    message.textContent = '';
  });
});
