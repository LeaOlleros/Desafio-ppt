import { goTo } from '../src/routes';
import {photosOfRockPaperScissors} from '../components/components';
//IMPORTS PARA LA PAGE


export function renderWelcome (){
const app = document.getElementById("app");

if (app){
  app.innerHTML = `
  <div class = "welcome-container">
  <h1 class = "title-from-welcome">¡Bienvenido a Piedra, Papel o Tijera!</h1>
  <div class = "decorative-images"> </div>
  <button class = "instructions-btn">Instrucciones</button>
  `;

  const images = photosOfRockPaperScissors(); 
  const imageContainer = app.querySelector('.decorative-images'); 

if (imageContainer){
  imageContainer.appendChild(images.paper);
  imageContainer.appendChild(images.rock);
  imageContainer.appendChild(images.scissors); 
}

  const btn = app.querySelector('.instructions-btn'); 
  btn?.addEventListener('click', () =>{
    goTo('/instrucciones'); 
  });
}

}