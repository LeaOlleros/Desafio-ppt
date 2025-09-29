export function photosOfRockPaperScissors (){

const rock = document.createElement("img");
rock.className = "img-rock"; 
rock.src = '../public/roca.png'; 
const paper = document.createElement("img");
paper.className = "img-paper";
paper.src = '../public/nota-adhesiva.png';
const scissors = document.createElement("img");
scissors.className = "img-scissors";
scissors.src = '../public/tijeras.png'; 

return {rock, paper, scissors}; 
} 