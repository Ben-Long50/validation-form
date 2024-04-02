import './styles/main.css';
import './styles/reset-css.css';
import countryCodes from 'country-codes-list';
import postalCodes from 'postal-codes-js';

const countryList = countryCodes.customList('countryCode', '{countryNameEn}');
const countryNames = Object.values(countryList);

console.log(countryNames);
const countryInput = document.querySelector('#country');

function populateCountryOptions() {
  countryNames.forEach((element) => {
    const optionElement = document.createElement('option');
    optionElement.textContent = element;
    countryInput.appendChild(optionElement);
  });
}

populateCountryOptions();
