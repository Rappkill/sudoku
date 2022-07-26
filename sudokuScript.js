import {
  generateContainerWithCells,
  generateSudokuNumbers,
} from "./Modules/generateSudoku.js";

import { createSudokuElements, createButton } from "./Modules/createDOMElements.js";

//Get main tag for manipulation


// Create Div Elements
createSudokuElements();

 
const buttonWrapper = document.querySelector(".button-wrapper");
const gameWrapper = document.querySelector(".game-wrapper");
const sudokuWrapper = document.querySelector(".sudoku-wrapper");

// Create Button Elements



//Make sudoku grid
Array(9)
  .fill(null)
  .map((_, index) => generateContainerWithCells(sudokuWrapper, index + 1));

//Fill sudoku grids with numbers
generateSudokuNumbers();

//Manipulate cells

class SudokuHistory {
  constructor() {
    this.historyList = [];
    this.eraseHistory = [];
  }

  addHistory(cell, value) {
    this.historyList.push({
      cell,
      value,
    });
  }

  addEraseHistory(cell) {
    this.eraseHistory.push(cell);
  }

  undo() {
    return this.historyList.pop();
  }

  erase() {
    let eraseItem = this.eraseHistory.pop();
    this.eraseHistory = [];
    return eraseItem;
  }
}

const historySudoku = new SudokuHistory();

const sudokuObjectCells = [];



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
