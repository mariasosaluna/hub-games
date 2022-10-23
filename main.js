//Esta es la pagina principal donde importamos el resto de funcionalidad y
import './style.css';
import './componets/login';
import './componets/random-color';
import './componets/gameList/gamesList';

const currentUser = window.localStorage.getItem('user');

const h1 = document.getElementById('dashboard-title');
if (h1) {
  h1.innerHTML = `Bienvenid@ ${currentUser} !`;
}
