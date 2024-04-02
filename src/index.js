import './styles/main.css';
import './styles/reset-css.css';
import countryCodes from 'country-codes-list';
import postalCodes from 'postal-codes-js';
import emailValidator from 'email-validator';

const countryList = countryCodes.customList('countryCode', '{countryNameEn}');
const countryNames = Object.values(countryList);
const inputs = document.querySelectorAll('input');

const countryInput = document.querySelector('#country');

function populateCountryOptions() {
  countryNames.forEach((element) => {
    const optionElement = document.createElement('option');
    optionElement.textContent = element;
    countryInput.appendChild(optionElement);
  });
}

populateCountryOptions();

const zipInput = document.querySelector('#zip-code');
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
  if (typeof postalValidity === 'string') {
    zipInput.classList.remove('input-valid', 'input-focus-valid');
    zipInput.classList.add('input-invalid', 'input-focus-invalid');
  } else {
    zipInput.classList.remove('input-invalid', 'input-focus-invalid');
    zipInput.classList.add('input-valid', 'input-focus-valid');
  }
}

inputs.forEach((input) => {
  input.addEventListener('blur', () => {
    input.classList.remove('input-focus-valid', 'input-focus-invalid');
  });
});

zipInput.addEventListener('input', checkZipValidity);
zipInput.addEventListener('focus', checkZipValidity);
