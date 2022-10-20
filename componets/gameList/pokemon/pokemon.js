import './pokemonStyle.css';

let pokemonTypes = [];

const getData = async (pokemonIndex) => {
  try {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`
    );
    const dataToJson = await data.json();
    return dataToJson;
  } catch (error) {
    return templateError(error);
  }
};

export const loadPokemon = async () => {
  const app = document.getElementById('app');

  const pokemonContainer = document.createElement('div');
  pokemonContainer.classList.add('pokemon-container');
  for (let i = 1; i <= 151; i++) {
    const pokemonItem = await getData(i);

    const pokemon = document.createElement('div');
    pokemon.classList.add('pokemon-card');
    pokemon.classList.add(pokemonItem.types[0].type.name);
    const types = pokemonItem.types.map((item) => {
      pokemonTypes.push(item.type.name);
      return item.type.name;
    });

    console.log(types);
    pokemon.innerHTML = `
        <div class="pokemon-id">#${pokemonItem.id}</div>
        <div class="name">${pokemonItem.name}</div>
        <img src="${pokemonItem.sprites.front_default}"/>
        <div class="pokemon-weight">Weight:${pokemonItem.weight}</div>
        <div class="pokemon-types" data-types="${types}">${types}</div>
    `;

    pokemonTypes = [...new Set(pokemonTypes)];

    pokemonContainer.appendChild(pokemon);
  }

  const typeSelect = document.createElement('select');
  const basicOption = document.createElement('option');
  const searchInput = document.createElement('input');
  const inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container');

  typeSelect.classList.add('typeSelect');
  searchInput.classList.add('searchInput');
  basicOption.value = '';
  basicOption.innerHTML = 'All types';
  searchInput.placeholder = 'search your pokemon';
  typeSelect.appendChild(basicOption);
  inputContainer.appendChild(typeSelect);
  inputContainer.appendChild(searchInput);

  pokemonTypes.forEach((type) => {
    const option = document.createElement('option');
    option.value = type;
    option.innerHTML = type;
    typeSelect.appendChild(option);
  });

  app.appendChild(inputContainer);
  app.appendChild(pokemonContainer);
  let optionSelected = '';
  let optionInput = '';
  typeSelect.addEventListener('change', (event) => {
    optionSelected = event.target.value;
    const printedPokemon = document.querySelectorAll('.pokemon-card');

    printedPokemon.forEach((element) => {
      if (
        !element.innerHTML.includes(optionSelected) ||
        !element.innerHTML.includes(optionInput)
      ) {
        element.classList.add('hidden');
      } else {
        element.classList.remove('hidden');
      }
    });
  });

  searchInput.addEventListener('input', (event) => {
    optionInput = event.target.value;
    const printedPokemon = document.querySelectorAll('.pokemon-card');

    printedPokemon.forEach((element) => {
      if (
        !element.innerHTML.includes(optionInput) ||
        !element.innerHTML.includes(optionSelected)
      ) {
        element.classList.add('hidden');
      } else {
        element.classList.remove('hidden');
      }
    });
  });
};
