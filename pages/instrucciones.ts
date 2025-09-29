import { goTo } from "../src/routes";

export function renderInstrucciones(){
const app = document.getElementById("app");

if (app){

  app.innerHTML = `
  <div class = "instructions-container"> 
   <h2 class="instructions-title">📋 Instrucciones del Juego</h2>
  <p class = "instructions"> Este es un piedra, papel o tijera de toda la vida. Vas a estar jugando contra una AGI excelentemente configurada bajo entrenamiento supervisado por parte de nuestro equipo de AI researchers</p>
  <button class ="game-btn">🎮 ¡Jugar!</button>
  </div>
  `
}

const buttonGame = app?.querySelector(".game-btn");
buttonGame?.addEventListener('click', () =>{
  goTo('/juego');
})

}