export default function country(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(responce => {
    return responce.json();
  });
}

import Notiflix from 'notiflix';
