import './css/styles.css';
import country from './fetchCountries';
import Lodash from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info');
const listOfCountries = document.querySelector('.country-list');

inputEl.addEventListener('input', Lodash(onInputEl, DEBOUNCE_DELAY));

function onInputEl(e) {
  const name = e.target.value.trim();
  console.log(name);

  if (name === '') {
    countryInfoEl.innerHTML = '';
    listOfCountries.innerHTML = '';
  }

  country(name)
    .then(renderCountry)
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      listOfCountries.innerHTML = '';
      countryInfoEl.innerHTML = '';
    });
}

function renderCountry(countries) {
  console.log(countries.length);

  if (countries.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length >= 2 && countries.length <= 10) {
    const listMarkup = countries
      .map(({ flags, name }) => {
        return `<li>
        <img src="${flags.svg}" alt="${name.official}" width="30">
        <p class="name">${name.official}</p></li>`;
      })
      .join('');
    listOfCountries.innerHTML = listMarkup;
    countryInfoEl.innerHTML = '';
  } else {
    const markup = countries
      .map(({ name, capital, population, flags, languages }) => {
        return ` <img src="${flags.svg}" alt="${name.official}" width="50"> 
      <h1 class="name">${name.official}</h1>
        <p><b>Capital:</b> ${capital}</p>
         <p><b>Population:</b> ${population}</p>
         <p><b>Languages:</b> ${Object.values(languages)}</p>`;
      })
      .join('');
    countryInfoEl.innerHTML = markup;
    listOfCountries.innerHTML = '';
  }
}
