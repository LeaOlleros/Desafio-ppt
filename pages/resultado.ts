import state from '../src/state';
import { goTo } from '../src/routes';

const app = document.getElementById("app");

export function renderResultado() {
  if (!app) {
    console.log("Application not detected");
    return;
  }

  const currentState = state.getState();
  
  // Asegúrate de que haya al menos un resultado en el historial
  const lastGame = currentState.history[currentState.history.length - 1];
  const resultado = lastGame ? lastGame.result : "Sin resultado"; // Último resultado o mensaje por defecto
  const userResults = currentState.currentGame.myPlay; // Tu jugada
  const iaResults = currentState.currentGame.computerPlay; // Jugada de la computadora

  app.innerHTML = `
    <div class="results-page">
      <h1 class="resultado-actual">${resultado}</h1>
      <div class="container-img-played"></div>

      <div class="names-participants">
        <h2 class="user-name">(VOS)</h2>
        <h2 class="ia-name">(IA)</h2>
      </div>

      <div class="history-results">
        <h2 class="user-results">${userResults}</h2>
        <h2 class="ia-results">${iaResults}</h2>
      </div>

      <button class="play-again-btn">VOLVER A JUGAR !</button>
    </div>
  `;

  const btnPlayAgain = app.querySelector(".play-again-btn");
  btnPlayAgain?.addEventListener('click', () => {
    goTo('/juego'); // Redirige a la página del juego
  });
}
