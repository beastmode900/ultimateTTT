const winAudio = new Audio("sounds/kh1fanfare.wav");

const cells = document.querySelectorAll(".cells");
const bigCells = document.querySelectorAll(".bigCell");
const turnText = document.querySelector("#turnText");
let winnerChar = "";
let currentBigCell = 10; //outside of index, can play anywhere
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = [
    ["", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "",],
    ["", "", "", "", "", "", "", "", "",],
];

let bigCellOptions = ["", "", "", "", "", "", "", "", ""];
let player = "player 1";
let running = true;

document.addEventListener('DOMContentLoaded', function() {
    for(let i = 0; i < 9; i++){
        document.getElementById(i).style.backgroundColor = "bisque";
    }
cells.forEach(cell => cell.addEventListener("click", clicked));

turnText.textContent = `${player}'s turn`;
    
    
function checkSmallWin(bigCellIndex){
    let smallWin = false;
    for(let i = 0; i < winConditions.length; i++){
        const dubNation = winConditions[i];
        const cell1 = options[bigCellIndex][dubNation[0]];
        const cell2 = options[bigCellIndex][dubNation[1]];
        const cell3 = options[bigCellIndex][dubNation[2]];

        if(cell1 == "" || cell2 == "" || cell3 == ""){
            continue;
        }
        if(cell1 == cell2 && cell2 == cell3){
            smallWin = true;
            winnerChar = cell1;
            break;
        }
    }
  

    if(smallWin){
        setTimeout(() => {fillTile(bigCellIndex);}, 400);
        //fillTile(bigCellIndex);
        bigCellOptions[bigCellIndex] = winnerChar;
        if(bigCellOptions[bigCellIndex] != ""){
            currentBigCell = 10;
        }
        //currentBigCell = 10;
      //  for(let i = 0; i < 9; i++){
      //      setTimeout(() => {document.getElementById(i).style.backgroundColor = "bisque";}, 400); 
      //  }
        //setTimeout(() => {document.getElementById("board").style.backgroundColor = "bisque";}, 400);
        checkBigWin();
    }
    else{
        changePlayer();
    }

}

function checkBigWin(){
    let bigWin = false;
    for(let i = 0; i < winConditions.length; i++){
        const dubNation = winConditions[i];
        const cell1 = bigCellOptions[dubNation[0]];
        const cell2 = bigCellOptions[dubNation[1]];
        const cell3 = bigCellOptions[dubNation[2]];

        if(cell1 == "" || cell2 == "" || cell3 == ""){
            continue;
        }
        if(cell1 == cell2 && cell2 == cell3){
            bigWin = true;
            winnerChar = cell1;
            break;
        }
    }
  

    if(bigWin){
        //fillTile(bigCellIndex);
        //currentBigCell = 10;
        turnText.textContent = `${player} dubbed out`;
        winAudio.play();
        for(let i = 0; i<9; i++){
            fillTile(i);
        }
        running = false;
    }
    else if(!bigCellOptions.includes("")){
        turnText.textContent = 'draw...';
        running = false;
    }
    else{
        changePlayer();
    }
 
}


function clicked(){
    const parentCell = this.parentNode;
   // console.log(parentCell);
    const bigCellIndex = parentCell.getAttribute("bigCellIndex")
   
    if(bigCellIndex != currentBigCell && currentBigCell < 10){
        return;
    }
    const cellIndex = this.getAttribute("cellIndex");
    if(options[bigCellIndex][cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex, bigCellIndex);
    checkSmallWin(bigCellIndex);
    if(bigCellOptions[cellIndex] != ""){
        currentBigCell = 10;
        for(let i = 0; i < 9; i++){
            document.getElementById(i).style.backgroundColor = "bisque";
        }
    }else{
        currentBigCell = cellIndex;
        document.getElementById("board").style.backgroundColor = "darkgray";
        for(let i = 0; i < 9; i++){
            if(i == currentBigCell){
                document.getElementById(i).style.backgroundColor = "bisque";
            }else{
                document.getElementById(i).style.backgroundColor = "darkgray";
            }
        }
        
    }
    
   
}

function updateCell(cell, index, bigCellIndex){
    if(player == "player 1"){
        options[bigCellIndex][index] = 'X';
        cell.textContent = 'X';
    }
    else if(player == "player 2"){
        options[bigCellIndex][index] = 'O';
        cell.textContent = 'O';
    }
}

function changePlayer(){
    if(player == "player 1"){
        player = "player 2";
    }else{
        player = "player 1";
    }
    turnText.textContent = `${player}'s turn`;
}

function fillTile(bigCellIndex){
    index = parseInt(bigCellIndex);
    const start = index * 9;
    const end = ((index+1) * (9)); //calculate where in cells array to stop and start the filling
    //console.log(index);
    //console.log(end);
    
    for(let i = 0; i<options[bigCellIndex].length; i++){
        options[bigCellIndex][i] = winnerChar;
    }
    for(let i = start; i<end; i++){
        cells[i].textContent = winnerChar;
    }
    
    //changePlayer();

}


});