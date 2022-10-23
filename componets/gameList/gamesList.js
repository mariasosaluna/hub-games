import './gameListStyle.css';
import { initPokemon } from './pokemon/pokemon';
import { initQuiz } from './quiz-game/quiz';

const games = [
  { id: 'pokeapi', name: 'Poke api' },
  { id: 'quiz-game', name: 'Friki quiz' },
];
const comeBack = document.querySelector('#home');
//Esta funcion es para volver al tablero de juegos
comeBack.addEventListener('click', (event) => {
  loadDashboard();
});
//treigo el div contenedor de juegos app
const loadDashboard = () => {
  const app = document.getElementById('app');
  const gameListContainer = document.createElement('div');
  gameListContainer.classList.add('game-list-container');
  if (app) {
    app.innerHTML = '';
    games.forEach((game) => {
      const card = document.createElement('div');
      card.classList.add(game.id);
      card.classList.add('game-card');
      card.innerHTML = game.name;

      card.addEventListener('click', async () => {
        app.innerHTML = '';
        if (game.id == 'pokeapi') {
          initPokemon();
        }
        if (game.id == 'quiz-game') {
          initQuiz();
        }
      });
      gameListContainer.appendChild(card);
      app.appendChild(gameListContainer);
    });
  }
};
loadDashboard();
