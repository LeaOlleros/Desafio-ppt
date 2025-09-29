import {renderWelcome} from '../pages/welcome';
import {renderInstrucciones} from '../pages/instrucciones'; 
import {renderJuego} from  '../pages/juego';
import {renderResultado} from '../pages/resultado';



function getCleanPathFromUrl(): string {
  const fullPath = window.location.pathname; 
  const basePath = './my-ppt-app'; // Aquí está tu basePath correcto

  if (fullPath.startsWith(basePath)) {
    return fullPath.replace(basePath, "") || "/"; 
  }
  return fullPath; 
}



export function initRouter (): void{

  const initPath = getCleanPathFromUrl();
  renderPath(initPath); 
  window.addEventListener('popstate', () =>{
  const currentPath = getCleanPathFromUrl();
  renderPath(currentPath); 
  });

}

const routes : Record<string, () => void> = {
  "/" : renderWelcome,
  "/instrucciones": renderInstrucciones,
  "/juego": renderJuego,
  '/resultado': renderResultado
}


function renderPath(path: string): void{
const app = document.getElementById("app");

if (!app){ // NO EXISTE APP EN HTML, NO MUESTRA NADA
  console.error("No pudimos encontrar la aplicacion"); 
  return ; 
}

const renderFunction = routes[path]; 
  // path = /juego ? entonces renderFunction = renderJuego
  // path = /instrucciones ? entonces renderFunction = renderInstrucciones

if (typeof renderFunction === "function"){ // si es una funcion, quiere decir que tiene algun path, ejecutamos
  renderFunction()
}
else{
  console.error("Ruta no encontrada, verifique si existe", path);
  if (typeof routes["/"] === 'function') {
    routes["/"](); // ejecutar renderWelcome() como fallback, seria si falla y no encuentra ninguna ruta
  }
}
}


export function goTo (path: string): void{

  const basePath = '/my-ppt-app'; 

  history.pushState({}, "", basePath + path ); 

  renderPath(path);
}