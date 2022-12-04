import './css/styles.css';
import Lodash from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', Lodash(onInputEl, DEBOUNCE_DELAY));

function onInputEl(e) {
  const name = e.target.value.trim();
  console.log(name);

  country(name);
}

function country(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(responce => {
      return responce.json();
    })
    .then(renderCountry)
    .catch(error => {
      console.log('error!');
    });
}

function renderCountry(countries) {
  console.log(countries);
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
