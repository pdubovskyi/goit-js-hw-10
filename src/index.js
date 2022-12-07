import './css/styles.css';
import country from './fetchCountries';
import Lodash from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info');
const listOfCountries = document.querySelector('country-list');

inputEl.addEventListener('input', Lodash(onInputEl, DEBOUNCE_DELAY));

function onInputEl(e) {
  const name = e.target.value.trim();
  console.log(name);

  country(name)
    .then(renderCountry)
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

// country()
//   .then(renderCountry)
//   .catch(error => {
//     console.log('error!');
//   });

// function country(name) {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//   ).then(responce => {
//     return responce.json();
//   });
// }

function renderCountry(countries) {
  console.log(countries.length);

  if (countries.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  if (countries.length >= 2 && countries.length <= 10) {
    const listMarkup = countries
      .map(({ flags, name }) => {
        return `<li>
        <img src="${flags.svg}" alt="${name.official}" width="10">
        <p>${name.official}</p></li>`;
      })
      .join('');
    listOfCountries.innerHTML = listMarkup;
    return;
  }

  const markup = countries
    .map(({ name, capital, population, flags, languages }) => {
      return ` <img src="${flags.svg}" alt="${name.official}" width="50"> 
      <h1>${name.official}</h1>
        <p><b>Capital:</b> ${capital}</p>
         <p><b>Population:</b> ${population}</p>
         <p><b>Languages:</b> ${Object.values(languages)}</p>`;
    })
    .join('');

  countryInfoEl.innerHTML = markup;
}
