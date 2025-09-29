import {photosOfRockPaperScissors} from '../components/components';
import state from '../src/state';
import { goTo } from '../src/routes';

  const app  = document.getElementById("app");
  type jugada = "piedra" | "papel" | "tijera"; 
  let timer : number = 3; 
  let timerInterval : NodeJS.Timeout | null = null; 
  let gameActive: boolean = false; 

export function renderJuego (){

if (!app){
  console.log("No existe la aplicacion");
  return;
}

app.innerHTML = ` <div class = "game-container">
<div class = "ai-section">
<h2 class = "ai-title"> (IA) </h2>
<div class = "images-ai"> </div>
</div>

<div = class = "game-center">
<h1 class = "titulo-game"> 🎮¡SELECCIONA!🎮</h1>
<div class = "timer-display">
<span id = "timer-number">${timer}</span>
  </div>
</div>

<div class = "user-section"> 
<h2 class = " user-title"> (User) </h2>
<div class = "images-game"> </div>  
</div> 
</div>
`;
const imagesContainer = app.querySelector(".images-game") as HTMLElement;
const images = photosOfRockPaperScissors();
const aiContainerImages = app.querySelector(".images-ai") as HTMLElement;
const timerDisplay = document.getElementById("timer-number") as HTMLElement; 

if (aiContainerImages){
  aiContainerImages.appendChild(images.paper);
  aiContainerImages.appendChild(images.rock);
  aiContainerImages.appendChild(images.scissors);
}

if (imagesContainer){

  setUpImageClickHandler(images);

  imagesContainer.appendChild(images.paper);
  imagesContainer.appendChild(images.rock);
  imagesContainer.appendChild(images.scissors);
}

state.computerSetMove();
startTimer(timerDisplay); 

}
function setUpImageClickHandler(images : any){
  images.paper.addEventListener('click', () => handleUserSelection('papel'));
  images.paper.setAttribute('data-move', 'papel');

  images.rock.addEventListener('click', () => handleUserSelection('piedra'));
  images.rock.setAttribute('data-move', 'piedra');

  images.scissors.addEventListener('click', () => handleUserSelection('tijera'));
  images.scissors.setAttribute('data-move', 'tijeras');
}

function handleUserSelection(move: jugada){

  if (!gameActive) return; 

  state.setMove(move); 
  stopTimer();

  markSelectedImage(move); 

  state.pushToHistory();

  setTimeout(() => {
    goTo('/resultado'); 
  }, 1000);
}

function markSelectedImage(selectedMove : jugada){

  const userImages = document.querySelectorAll(".images-game img");

  userImages.forEach(img =>{
    const imgElement = img as HTMLElement;
    const move = imgElement.getAttribute('data-move');

    if (move === selectedMove){
      imgElement.classList.add('selected');
    }
    else{
      imgElement.classList.add('not-selected');
    }
  });
}

function startTimer(timerDisplay: HTMLElement){
  gameActive = true; 
  timer = 3; 

  const updateTimer = () =>{
    timerDisplay.textContent = timer.toString();

    //CAMBIAR COLOR SEGUN TIEMPO RESTANTE

    if (timer <= 1){
      timerDisplay.classList.add('timer-critical');
    } else if (timer <=2){
      timerDisplay.classList.add('timer-warning');
    }
    
    if (timer <= 0){
      handleTimeOut();
      return;
    }

    timer--; 

  };
updateTimer(); 

timerInterval = setInterval(updateTimer, 1000); 
};

function stopTimer(){
  gameActive = false;
  
  if (timerInterval){
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function handleTimeOut(){
  stopTimer();

  const userImages = document.querySelectorAll('.images-game img');
  userImages.forEach(img => {
    (img as HTMLElement).classList.add('disabled');
  });

  state.pushToHistory();

  setTimeout(() => {
    goTo('/resultado');
  }, 1000);
}

export function cleanUpJuego (){
  if (timerInterval){
    clearInterval(timerInterval);
    timerInterval = null; 
  }
  gameActive = false; 
}