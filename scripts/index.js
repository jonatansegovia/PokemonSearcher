const search_term = document.getElementById('search_q');
const search_btn = document.getElementById('search-btn');

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

  const url = `https://pokeapi.co/api/v2/pokemon/${term}`; //url de donde obtengo mis datos, query refiere a un dato que le voy a pasar cuando escriba en la search bar
  const response = await fetch(url); //await le dice que espere la respuesta antes de continuar con otra cosa, dentro le paso la variable "url", para que espere esta respuesta desde ahí

  if (response.status == 404 || response.statusText == 'Not Found') {
    document.getElementById('show_error').classList.add('show');
    document.getElementById('show_error').classList.remove('hidden');
    return;
  }

  const pokemon = await response.json(); //aquí se almacena toda la info que luego voy a poner en mi página
  updateData(pokemon);
};

const updateData = (pokemon) => {
  updateImg.setAttribute(
    'src',
    pokemon.sprites.other.dream_world.front_default
  );

  updateName.innerHTML =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  updateType.innerHTML = `${
    pokemon.types[0].type.name.charAt(0).toUpperCase() +
    pokemon.types[0].type.name.slice(1)
  }`;

  updateWeight.innerHTML = `${pokemon.weight}kg`;

  if (pokemon.height >= 10) {
    updateHeight.innerHTML = `${pokemon.height}m`;
  } else {
    updateHeight.innerHTML = `0.${pokemon.height}0cm`;
  }

  updateAbility.innerHTML = `${
    pokemon.abilities[0].ability.name.charAt(0).toUpperCase() +
    pokemon.name.slice(1)
  }`;

  updateGameIndex.innerHTML = `N° ${pokemon.game_indices[3].game_index}`;
};

search_btn.addEventListener('click', () => getPokemonData(search_term.value));
