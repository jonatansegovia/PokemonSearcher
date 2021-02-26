const search_term = document.getElementById('search_q');
const search_btn = document.getElementById('search-btn');
search_term.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    search_btn.click();
  }
});

const updateImg = document.getElementById('update_img');
const updateName = document.getElementById('update_name');
const updateType = document.getElementById('update_type');
const updateWeight = document.getElementById('update_weight');
const updateHeight = document.getElementById('update_height');
const updateAbility = document.getElementById('update_ability');
const updateGameIndex = document.getElementById('update_game-index');

const getPokemonData = async (term) => {
  document.getElementById('show_error').classList.remove('show');
  document.getElementById('show_error').classList.add('hidden');

  const cleanTerm = term.toLowerCase().trim();
  if (cleanTerm) {
    const url = `https://pokeapi.co/api/v2/pokemon/${cleanTerm}`; //url de donde obtengo mis datos, query refiere a un dato que le voy a pasar cuando escriba en la search bar
    const response = await fetch(url); //await le dice que espere la respuesta antes de continuar con otra cosa, dentro le paso la variable "url", para que espere esta respuesta desde ahí

    if (response.status == 404 || response.statusText == 'Not Found') {
      document.getElementById('show_error').classList.add('show');
      document.getElementById('show_error').classList.remove('hidden');
      return;
    }

    const pokemon = await response.json(); //aquí se almacena toda la info que luego voy a poner en mi página
    updateData(pokemon);
  }
};

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const updateData = (pokemon) => {
  updateImg.setAttribute(
    'src',
    pokemon.sprites.other.dream_world.front_default
  );

  updateName.innerHTML = capitalize(pokemon.name);
  updateType.innerHTML = capitalize(pokemon.types[0].type.name);
  updateWeight.innerHTML = `${pokemon.weight / 8}kg`;

  if (pokemon.height >= 10) {
    const meters = pokemon.height / 10;
    updateHeight.innerHTML = `${meters} m`;
  } else {
    const centimeters = pokemon.height * 10;
    updateHeight.innerHTML = `${centimeters} cm`;
  }

  updateAbility.innerHTML = capitalize(pokemon.abilities[0].ability.name);
  updateGameIndex.innerHTML = `N° ${pokemon.game_indices[3].game_index}`;
};

search_btn.addEventListener('click', () => getPokemonData(search_term.value));

window.addEventListener('load', () => {
  getPokemonData('golduck');
});
