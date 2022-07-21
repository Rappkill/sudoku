//Get main tag for manipulation
const main = document.querySelector(".main");
console.log(main);

// Create Div Elements
function createDivElement(parent, _class) {
  const div = document.createElement("div");
  div.className = _class;
  parent.appendChild(div);
}

createDivElement(main, "game-wrapper");
const gameWrapper = document.querySelector(".game-wrapper");

createDivElement(gameWrapper, "sudoku-wrapper");
const sudokuWrapper = document.querySelector(".sudoku-wrapper");

createDivElement(gameWrapper, "button-wrapper");
const buttonWrapper = document.querySelector(".button-wrapper");

// Create Button Elements
function createButton(parent, _class, text, functionName) {
  const button = document.createElement("button");
  button.className = _class;
  button.innerText = text;
  button.addEventListener("click", function () {
    functionName();
  });
  parent.appendChild(button);
}

createButton(buttonWrapper, "new-game-btn", "New Game", newGame);
const newGameButton = document.querySelector(".new-game-btn");

createDivElement(buttonWrapper, "buttons-control");
const buttonsControl = document.querySelector(".buttons-control");

createButton(buttonsControl, "undo-btn", "Undo", undo);
const undoButton = document.querySelector(".undo-btn");

createButton(buttonsControl, "erase-btn", "Erase", erase);
const eraseButton = document.querySelector(".erase-btn");

createButton(buttonsControl, "notes-btn", "Notes", notes);
const notesButton = document.querySelector(".notes-btn");

// Generate 9x9 Grid
function generateContainerWithCells(parent, containerIndex) {
  const gridContainer = document.createElement("div");
  gridContainer.className = `grid-container grid-container-${containerIndex}`;
  gridContainer.innerHTML = " ";
  parent.appendChild(gridContainer);

  for (let cellIndex = 1; cellIndex <= 9; cellIndex++) {
    let gridCell = document.createElement("div");

    const row = getRowClass(containerIndex, cellIndex);
    const column = getColumnClass(containerIndex, cellIndex);

    gridCell.className = `grid-cell container-${containerIndex} row-${row} column-${column}`;
    gridContainer.appendChild(gridCell);
  }
}

function getRowClass(containerIndex, cellIndex) {
  if (containerIndex <= 3) {
    return Math.floor((cellIndex - 1) / 3) + 1;
  } else if (containerIndex <= 6) {
    return Math.floor((cellIndex - 1) / 3) + 4;
  } else {
    return Math.floor((cellIndex - 1) / 3) + 7;
  }
}

function getColumnClass(containerIndex, cellIndex) {
  const columns1 = [1, 4, 7];
  const columns2 = [2, 5, 8];
  const columns3 = [3, 6, 9];

  if (columns1.includes(cellIndex)) {
    return columns1[(containerIndex - 1) % 3];
  } else if (columns2.includes(cellIndex)) {
    return columns2[(containerIndex - 1) % 3];
  } else {
    return columns3[(containerIndex - 1) % 3];
  }
}

//Make 9 similar grids
Array(9)
  .fill(null)
  .map((_, index) => generateContainerWithCells(sudokuWrapper, index + 1));


//Manipulate cells

class HistorySudoku{
  constructor(){
    this.historyList =[];
  }
addHistory(cell,value){
  this.historyList.push({
      cell,
      value
  })
}

}

const historySudoku = new HistorySudoku()


// {
//   value : 
//   cell :  
// }


//Fill sudoku grids with numbers
function generateSudokuNumbers() {
  let sudokuNumbers = sudoku.generate("medium").split("");

  for (row = 1; row <= 9; row++) {
    let cells = Array.from(document.querySelectorAll(`.row-${row}`));
    let rowValues = sudokuNumbers.splice(0, 9);

    for (i = 0; i < rowValues.length; i++) {
      if (rowValues[i] === ".") {
        rowValues[i] = " ";
      }
      cells[i].innerHTML = rowValues[i];
    }
  }
}
generateSudokuNumbers();


const gridCells = Array.from(document.querySelectorAll("div.grid-cell"));

gridCells.forEach((cell,index) => {
  
  cell.addEventListener("click", (e) => handleClickCell(e,index))
  
}

);

function handleClickCell(e,index) {
  const cell = e.target;
  setId(cell,index);
  highlightClass(cell);
}

function clearClass() {
  gridCells.forEach((elem) => {
    elem.classList.remove("toggle", "toggle-heavy");
  });
}

function setId(cell,index) {
  cell.setAttribute("id",index);
  cell.setAttribute("type", "number")
  if (cell.innerHTML === " ") {
    cell.contentEditable = true;
  }
  // console.log(cell);
}

function highlightClass(cell) {
  clearClass();

  let container;
  let row;
  let column;

  Array.from(cell.classList).forEach((cellClass) => {
    if (cellClass.includes("container")) container = cellClass;
    else if (cellClass.includes("row")) row = cellClass;
    else if (cellClass.includes("column")) column = cellClass;
  });


  Array.from(document.getElementsByClassName(row)).forEach((elem) =>
    elem.classList.add("toggle")
  );
  Array.from(document.getElementsByClassName(column)).forEach((elem) =>
    elem.classList.add("toggle")
  );
  Array.from(document.getElementsByClassName(container)).forEach((elem) =>
    elem.classList.add("toggle")
  );

  cell.classList.add("toggle-heavy");
  // sudokuObjectCells[cell.id].className = cell.className;
  // activityHistory;
  // activityHistory = cell;
}

const sudokuObjectCells = [];


gridCells.forEach((cell) =>
  cell.addEventListener("keypress", (e) => handleKeyPress(e))
);


function handleKeyPress(e){
    if(acceptOnlyNumbers(e)){
    assignCellValue(e)
    
  }
}


function acceptOnlyNumbers(e){
  if (isNaN(String.fromCharCode(e.keyCode)) || e.key == "Enter" || e.key == '0') {
    e.preventDefault()
    return false;
  } else {
    return true;
  }
}


function assignCellValue(e){
  e.preventDefault()
  const cell = e.target;
  cell.innerHTML = e.key;
  
historySudoku.addHistory(cell, cell.innerHTML)
console.log(historySudoku.historyList)

}
// gridCells.forEach((cell, i) => {
//   cell.setAttribute("id", i);
//   if (cell.innerHTML === " ") {
//     cell.contentEditable = true;
//   }

//   cell.addEventListener("click", function highlightClass() {
//     gridCells.forEach((elem) => {
//       elem.classList.remove("toggle", "toggle-heavy");
//     });

//     let container;
//     let row;
//     let column;

//     Array.from(cell.classList).forEach((cellClass) => {
//       if (cellClass.includes("container")) container = cellClass;
//       else if (cellClass.includes("row")) row = cellClass;
//       else if (cellClass.includes("column")) column = cellClass;
//     });

//     Array.from(document.getElementsByClassName(row)).forEach((elem) =>
//       elem.classList.add("toggle")
//     );
//     Array.from(document.getElementsByClassName(column)).forEach((elem) =>
//       elem.classList.add("toggle")
//     );
//     Array.from(document.getElementsByClassName(container)).forEach((elem) =>
//       elem.classList.add("toggle")
//     );

//     cell.classList.add("toggle-heavy");
//     sudokuObjectCells[cell.id].className = cell.className;
//     activityHistory ;
//     activityHistory = cell

//     cell.addEventListener("keyup", function (e) {

//       if(e.key == '1'){

//       console.log(cell)
//       cell.innerHTML = e.key
//       // e.preventDefault();
//       // saveHistory(cell);
//       // validateNums(cell);

//       // sudokuObjectCells[cell.id].innerHTML = cell.innerHTML;
//       // sudokuObjectCells[cell.id].className = cell.className;
//       // // sudokuObjectCells[cell.id].setState();

//       // gridCells.forEach((elem) => {
//       //   if (elem.innerHTML == cell.innerHTML && cell.innerHTML != " ") {
//       //     elem.classList.add("toggle-heavy");
//       //   }
//       // });
//       }
//     });
//   });
// });

// let historyArray = [];

// function saveHistory(e) {
//   sudokuObjectCells[cell.id].setHistory();
//   historyArray.push(cell);
//   historyIndex++;
// }



function undo() {
  if (historyArray.length != 0) {
    let undoCell = historyArray[historyArray.length - 1].id;
    gridCells[undoCell].innerHTML = sudokuObjectCells[undoCell].undo();
    historyArray.pop();
    historyIndex--;
  }
}

let activityHistory;

function erase() {
}

function newGame() {
  console.log("new game");
}

function notes() {
  console.log("notes");
}

//validation
function validateNums(cell) {
  // sudokuObjectCells[cell.id].className = cell.className;

  let container;
  let row;
  let column;

  Array.from(cell.classList).forEach((cellClass) => {
    if (cellClass.includes("container")) container = cellClass;
    else if (cellClass.includes("row")) row = cellClass;
    else if (cellClass.includes("column")) column = cellClass;
  });

  let checkFromThisArray = sudokuObjectCells.filter(
    (elem) =>
      elem.className.includes(row) ||
      elem.className.includes(column) ||
      elem.className.includes(container)
  );
  console.log(checkFromThisArray);

  // for (let key in checkFromThisArray) {
  //   if(cell.innerHTML == checkFromThisArray[key].innerHTML){
  //     cell.className += ' toggle-same'
  //     sudokuObjectCells[cell.id].className = cell.className;
  //     checkFromThisArray[key].className = cell.className;

  //   }
  // }

  // for (i = 0; i < verticalRow.length; i++) {
  //   if (verticalRow[i].innerHTML == cell.innerHTML) {
  //     verticalRow[i].className += " toggle-same";
  //   }
  // }

  // verticalRow.forEach(elem => elem.innerHTML === cell.innerHTML ? elem.className += ' toggle-same' : false);
  // horizontalColumn.forEach(elem => elem.innerHTML === cell.innerHTML ? elem.className += ' toggle-same' : false);

  // verticalRow.forEach((elem) => checkFromThisArray.push(elem));
  // horizontalColumn.forEach((elem) => checkFromThisArray.push(elem));
  // containerArray.forEach((elem) => checkFromContainer.push(elem));

  // while (i < 2) {
  //     for (i = 0; i < checkFromThisArray.length; i++) {
  //         if (cell.innerHTML == checkFromThisArray[i]) {

  //         }
  //     }

  // console.log(checkFromThisArray);
  // console.log(checkFromContainer);

  // let test = []
  // for (i = 0; i < checkFromThisArray.length; i++) {
  //     if (cell.innerHTML == checkFromThisArray[i].innerHTML) {
  //         // console.log(checkFromThisArray[i])
  //         checkFromThisArray[i].className += ' .toggle-same';
  //     }
  // }
}
