

type jugada = "piedra" |"papel" | "tijera";  

const state = {
  data:{
     currentGame:{
      computerPlay:"" as jugada | "", //ESTO TIENE QUE SER UNA JUGADA O ESTARA VACIO
      myPlay:"" as jugada | "",   //ESTO TIENE QUE SER UNA JUGADA O ESTARA VACIO
    },
    history:[] as {myPlay: jugada; computerPlay: jugada; result: "gane" | "perdi"| "empate"}[],
    // HISTORY GUARDA EL HISTORIAL POR CADA PARTIDA QUE JUEGUES 
    // MY PLAY: MI JUGADA, COMPUTERPLAY: JUGADA DE COMPU Y RESULTADOS: POSIBLES RESULTADOS
    //EL HISTORIAL ES ARRAY QUE SOLO PUEDE CONTENER OBJETOS DE ESE TIPO
  },
  getState(){
    return this.data; 
  },
  setMove(move: jugada ){ //MI JUGADA, LLAMAMOS AL ESTADO ACTUAL, CARGAMOS HISTORIAL, Y MI PLAY ES IGUAL A JUGADA
    const currentState = this.getState();      
    this.loadFromStorage(); 
    currentState.currentGame.myPlay = move; 
  },
  computerSetMove (){ // IGUAL A MI JUGADA NADA MAS QUE ES DE LA COMPUTADORA
    const moves : jugada [] = ["piedra", "papel", "tijera"];
    const randomNumber = Math.floor(Math.random() * 3);
    const computerRandomMove = moves[randomNumber];
    const currentState = this.getState();
    currentState.currentGame.computerPlay = computerRandomMove; 
  },
  loadFromStorage(){
    const currentState = this.getState(); 
    const savedList = localStorage.getItem('results'); 
    if (savedList !== null){
      const parsedList = JSON.parse(savedList); 
      currentState.history = parsedList; 
    }
  },
  savedToLocalStorage(){
   const history = this.data.history;  
    localStorage.setItem('results', JSON.stringify(history)); 
  },
  pushToHistory(){
    const currentState = this.getState();
    const jugadaMia = currentState.currentGame.myPlay;
    const jugadaDeLaCompu = currentState.currentGame.computerPlay
  
    if (jugadaMia !== "" && jugadaDeLaCompu !== ""){
      
    const result = this.whoWins(jugadaMia, jugadaDeLaCompu);

    currentState.history.push({  // AGREGAMOS EL HISTORY PORQUE PUSH NO EXISTE EN CURRENTSTATE
      myPlay: currentState.currentGame.myPlay as jugada,
      computerPlay : currentState.currentGame.computerPlay as jugada,
      result,
    })
    currentState.currentGame.computerPlay = "";
    currentState.currentGame.myPlay = ""; 
    }
    this.savedToLocalStorage();
  },
  whoWins(myPlay: jugada, computerPlay: jugada){
    const ganeConTijera = myPlay == "tijera" && computerPlay == "papel" ; 
    const ganeConPiedra = myPlay == "piedra" && computerPlay == "tijera";
    const ganeConPapel = myPlay == "papel" && computerPlay == "piedra"; 
    const gane = [ganeConPapel, ganeConPiedra, ganeConTijera].includes(true); 
    const empate: boolean = myPlay === computerPlay; 

    if (empate)return "empate"; 
    if(gane)return "gane";
    return "perdi"; 
  }
}


export default state; 