const search_term = document.getElementById('search_q');
const search_btn = document.getElementById('search-btn');
search_term.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    search_btn.click();
  }
});

const UPDATE_IMG = document.getElementById('img');
const UPDATE_NAME = document.getElementById('name');
const UPDATE_TYPE = document.getElementById('type');
const UPDATE_WEIGHT = document.getElementById('weight');
const UPDATE_HEIGHT = document.getElementById('height');
const UPDATE_ABILITY = document.getElementById('ability');
const UPDATE_GAME_INDEX = document.getElementById('game-index');

const getPokemonData = async (term) => {
  document.getElementById('show_error').classList.remove('show');
  document.getElementById('show_error').classList.add('hidden');

  const cleanTerm = term.toLowerCase().trim();
  if (cleanTerm) {
    const url = `https://pokeapi.co/api/v2/pokemon/${cleanTerm}`;
    const response = await fetch(url);

    if (response.status == 404 || response.statusText == 'Not Found') {
      document.getElementById('show_error').classList.add('show');
      document.getElementById('show_error').classList.remove('hidden');
      return;
    }

    const pokemon = await response.json();
    updateData(pokemon);
  }
};

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const updateData = (pokemon) => {
  UPDATE_IMG.setAttribute(
    'src',
    pokemon.sprites.other['official-artwork'].front_default
  );

  UPDATE_NAME.innerHTML = capitalize(pokemon.name);
  UPDATE_TYPE.innerHTML = capitalize(pokemon.types[0].type.name);
  UPDATE_WEIGHT.innerHTML = `${pokemon.weight / 8}kg`;

  if (pokemon.height >= 10) {
    const meters = pokemon.height / 10;
    UPDATE_HEIGHT.innerHTML = `${meters} m`;
  } else {
    const centimeters = pokemon.height * 10;
    UPDATE_HEIGHT.innerHTML = `${centimeters} cm`;
  }

  UPDATE_ABILITY.innerHTML = capitalize(pokemon.abilities[0].ability.name);
  UPDATE_GAME_INDEX.innerHTML = `N° ${pokemon.game_indices[3].game_index}`;
};

search_btn.addEventListener('click', () => getPokemonData(search_term.value));

window.addEventListener('load', () => {
  getPokemonData('golduck');
});
