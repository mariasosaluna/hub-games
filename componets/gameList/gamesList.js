import './gameListStyle.css';
import { loadPokemon } from './pokemon/pokemon';

const games = [{ id: 'pokeapi', name: 'Poke api' }];
const comeBack = document.querySelector('#home');

comeBack.addEventListener('click', (event) => {
  loadDashboard();
});

const loadDashboard = () => {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = '';
    games.forEach((game) => {
      const card = document.createElement('div');
      card.classList.add(game.id);
      card.classList.add('game-card');
      card.innerHTML = game.name;

      card.addEventListener('click', async () => {
        app.innerHTML = '';
        loadPokemon();
      });

      app.appendChild(card);
    });
  }
};
loadDashboard();
