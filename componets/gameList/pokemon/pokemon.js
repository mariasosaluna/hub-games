import './pokemonStyle.css';

let pokemonTypes = [];
//funcion que recorre y obtiene los pokemon desde from a to y los pinta en pokemon container hijo
const loadPokemon = async (from, to, pokemonContainer) => {
  for (let i = from; i <= to; i++) {
    const pokemonItem = await getData(i);

    const pokemon = document.createElement('div');
    printPokemon(pokemon, pokemonItem);

    pokemonTypes = [...new Set(pokemonTypes)];

    pokemonContainer.appendChild(pokemon);
  }
};

//esta funcion inicia inicia la busqueda de los pokemon, el contenedor donde van y el boton para seguir obteniendo el resto de la lista
export const initPokemon = async () => {
  const app = document.getElementById('app');
  let from = 1;
  let to = 20;
  const pokemonContainer = document.createElement('div');
  pokemonContainer.classList.add('pokemon-container');

  loadPokemon(from, to, pokemonContainer);

  printFilters(pokemonContainer);

  const morePokemonBtn = document.createElement('button');
  morePokemonBtn.classList.add('more-pokemon');
  morePokemonBtn.innerHTML = 'Load more Pokemon';
  morePokemonBtn.addEventListener('click', () => {
    from += 20;
    to += 20;
    loadPokemon(from, to, pokemonContainer);
  });

  app.appendChild(morePokemonBtn);
};

//Funcion que llama los datos de la api y la convierte a json y los retorna
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

//esta funcion imprime el boton para mas info. ademas contiene el evento que muestra o esconde la info segun clicas
const printMoreInfo = (pokemon, pokemonItem) => {
  const infoBtn = document.createElement('button');
  infoBtn.innerHTML = 'more info';
  const infoContainer = document.createElement('div');
  infoContainer.classList.add('hidden');
  infoContainer.innerHTML = `
  Weight:${pokemonItem.weight}
  `;

  pokemon.appendChild(infoBtn);
  pokemon.appendChild(infoContainer);

  infoBtn.addEventListener('click', (e) => {
    if (infoContainer.classList.contains('hidden')) {
      infoContainer.classList.remove('hidden');
    } else {
      infoContainer.classList.add('hidden');
    }
  });
};

//esta funcion imprime cada carta pokemon
const printPokemon = (pokemon, pokemonItem) => {
  pokemon.classList.add('pokemon-card');
  pokemon.classList.add(pokemonItem.types[0].type.name);
  //aqui hace mapeo por tipos y los mete en la array vacia pokemonTypes
  const types = pokemonItem.types.map((item) => {
    pokemonTypes.push(item.type.name);
    return item.type.name;
  });
  pokemon.innerHTML = `
      <div class="pokemon-id">#${pokemonItem.id}</div>
      <div class="name">${pokemonItem.name}</div>
      <img src="${pokemonItem.sprites.front_default}"/>
      <div class="pokemon-types" data-types="${types}">${types}</div>
  `;
  printMoreInfo(pokemon, pokemonItem);
};

//esta funcion contiene tanto el selector de tipos como el input de busqueda de pokemon, se le da una clase y se pinta
const printFilters = (pokemonContainer) => {
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
  // aqui creo cada tipo y lo meto en un option con el valor de cada tipo pokemon
  pokemonTypes.forEach((type) => {
    const option = document.createElement('option');
    option.value = type;
    option.innerHTML = type;
    typeSelect.appendChild(option); //meto las opciones en el selector
  });
  //añado el conteendor de los selectores y el contenedor de las cartas al div principal app y creo 2 variables vacias para los valores de los selectores
  app.appendChild(inputContainer);
  app.appendChild(pokemonContainer);
  let optionSelected = '';
  let optionInput = '';
  //al selector le hago un evento para que cada vez que cada vez que seleccione mi busqueda imprima el valor de la bisqueda en la tarjeta pokemon
  typeSelect.addEventListener('change', (event) => {
    optionSelected = event.target.value;
    const printedPokemon = document.querySelectorAll('.pokemon-card');
    //bucle para los pokemon pintados. Hace desaparecer los que ya he buscado si hago nueva busqueda
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
  //evento para el input que hace lo mismo cada vez que escribo en el buscador un nombre pokemon
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
