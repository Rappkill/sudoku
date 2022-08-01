import { generateSudokuNumbers } from "./generateSudoku.js";
import { createDivElement } from "./createDOMElements.js";

export function addEventListeners() {
  const gridCells = Array.from(document.querySelectorAll(".grid-cell"));

  gridCells.forEach((cell, index) => cell.setAttribute("id", index + 1));

  gridCells.forEach((cell) => {
    cell.addEventListener("click", (e) => handleClickCell(e, gridCells));
  });

  gridCells.forEach((cell) => {
    cell.addEventListener("keydown", (e) => handleKeyPress(e, gridCells));
  });

  const numpadButtons = Array.from(document.querySelectorAll(".numpad-btn"));

  numpadButtons.forEach((button) =>
    button.addEventListener("click", (e) => handleClickNumpad(e))
  );

  const undoButton = document
    .querySelector(".undo-btn")
    .addEventListener("click", handleUndo);

  const eraseButton = document
    .querySelector(".erase-btn")
    .addEventListener("click", handleErase);

  const newgameButton = document
    .querySelector(".new-game-btn")
    .addEventListener("click", handleNewGame);

  const notesButton = document
    .querySelector(".notes-btn")
    .addEventListener("click", (e) => handleNotes(e, gridCells));
}

//click event
function handleClickCell(e, gridCells) {
  const cell = e.target;
  makeCellEditable(cell);
  highlightClass(cell, gridCells);
}

function makeCellEditable(cell) {
  if (cell.innerHTML === " ") {
    cell.contentEditable = true;
  }
}

function clearClass(gridCells) {
  gridCells.forEach((elem) => {
    elem.classList.remove("toggle", "toggle-heavy");
  });
}

function highlightClass(cell, gridCells) {
  clearClass(gridCells);
  // validateClass(cell)

  const cellClasslist = validateClass(cell);

  for (const key in cellClasslist) {
    Array.from(document.getElementsByClassName(cellClasslist[key])).forEach(
      (elem) => elem.classList.add("toggle")
    );
  }

  cell.classList.add("toggle-heavy");
}

//keyboard event
function handleKeyPress(e, gridCells) {
  if (acceptOnlyNumbers(e)) {
    assignCellValue(e);
    validateNums(e, gridCells);
  }
}

function acceptOnlyNumbers(e) {
  if (
    isNaN(String.fromCharCode(e.keyCode)) ||
    e.key == "Enter" ||
    e.key == "0"
  ) {
    e.preventDefault();
    return false;
  } else {
    return true;
  }
}

function assignCellValue(e) {
  e.preventDefault();
  const cell = e.target;
  sudokuObject.addHistory(cell, cell.innerHTML);
  cell.innerHTML = e.key;
  console.log(sudokuObject.historyList);
}

//numpad event
function handleClickNumpad(e) {
  assignNumpadValue(e);
}

function assignNumpadValue(e) {
  let cell = document.querySelector(".toggle-heavy");
  if (cell != null && cell.contentEditable == "true") {
    sudokuObject.addHistory(cell, cell.innerHTML);
    cell.innerHTML = Number(e.target.value);
  }
}

class SudokuHistory {
  constructor() {
    this.historyList = [];
  }

  addHistory(cell, value) {
    this.historyList.push({
      cell,
      value,
    });
  }

  undo() {
    let previuosElement = this.historyList[this.historyList.length - 1];
    if (previuosElement != undefined) {
      previuosElement.cell.innerHTML = previuosElement.value;
      return this.historyList.pop();
    }
  }
}

const sudokuObject = new SudokuHistory();

// buttons functionality
function handleUndo() {
  sudokuObject.undo();
}

function handleErase() {
  let cell = document.querySelector(".toggle-heavy");
  if (cell != undefined && cell.contentEditable == "true") {
    sudokuObject.addHistory(cell, cell.innerHTML);
    cell.innerHTML = " ";
  }
}

function handleNewGame() {
  generateSudokuNumbers();
}

function generateNotes(gridCells) {
  gridCells.forEach((cell) => {
    if (cell.innerHTML == " ") {
      cell.classList.add("notes-cell");
      for (let index = 1; index <= 9; index++) {
        createDivElement(cell, "notes-class", index);
      }
    }
  });
}

function handleNotes(e, gridCells) {
  generateNotes(gridCells);
  let notesBtn = e.target;
  let selectedCell = document.querySelector(".toggle-heavy");
  let notesGrids = document.querySelectorAll(".notes-cell");
  let notesCells = document.querySelectorAll(".notes-class")
  // console.log(notesGrids)

  if (notesBtn.className.includes("active")) {
    notesBtn.classList.remove("active");
    notesCells.forEach(elem => {elem.classList.remove("activ")});
  } else {
    notesBtn.classList.add("active");
    notesCells.forEach(elem => {elem.classList.add("activ")});
    notesGrids.forEach(elem => elem.contentEditable = true)
  }
}

let arrayOfSelectedCells = [];
//validation
function validateNums(e, gridCells) {
  // gridCells.forEach((cell) => {
  //   let validateCell = validateClass(cell);
  //   const { container, row, column } = validateCell;
  //   let containerArray = Array.from(
  //     document.getElementsByClassName(`${container}`)
  //   );
  //   let rowArray = Array.from(document.getElementsByClassName(`${row}`));
  //   let columnArray = Array.from(document.getElementsByClassName(`${column}`));
  //   let cellClassArray = [...containerArray, ...rowArray, ...columnArray];
  //   console.log(cellClassArray)
  //   cellClassArray.forEach((cell1) => {
  //     cellClassArray.forEach((cell2) => {
  //       if (cell1.id !== cell2.id) {
  //         if (cell1.innerHTML === cell2.innerHTML) {
  //           cell1.classList.add("wrong");
  //         }
  //       }
  //     });
  //   });
  // });
  //   const selectedCell = document.querySelector(".toggle-heavy");
  // if(arrayOfSelectedCells.length == 0 ){
  //   arrayOfSelectedCells.push(e.target)
  // }
  //   // console.log(selectedCell)
  // arrayOfSelectedCells.forEach(cell => {
  //   console.log(cell.id)
  //   if((e.target.id != cell.id )){
  //     arrayOfSelectedCells.push(e.target)
  //   }
  // })
  // console.log(arrayOfSelectedCells)
  // let cellClassList = validateClass(selectedCell);
  // const { container, row, column } = cellClassList;
  // let containerArray = Array.from(
  //   document.getElementsByClassName(`${container}`)
  // );
  // let rowArray = Array.from(document.getElementsByClassName(`${row}`));
  // let columnArray = Array.from(document.getElementsByClassName(`${column}`));
  // let cellClassArray = [...containerArray, ...rowArray, ...columnArray].filter(
  //   (cell) => {
  //     return cell.id != selectedCell.id;
  //   }
  // );
  // console.log(selectedCell.id)
  // let newArray = cellClassArray.
  // console.log(cellClassArray);
  //   cellClassArray.forEach(cell =>{
  //     cellClassArray.forEach(cell2 =>{
  //       if((cell.id != cell2.id) && (cell.innerHTML == cell2.innerHTML)){
  //           cell2.classList.add("wrong")
  //       }
  //     })
  //   })
  // const checkClass = document.querySelectorAll(".toggle:not(.toggle-heavy)");
  // console.log(checkClass);
  // checkClass.forEach((cell) => {
  //   if (cell.innerHTML == selectedCell.innerHTML) {
  //     selectedCell.classList.add("wrong");
  //     cell.classList.add("wrong");
  //   } else {
  //     cell.classList.remove("wrong");
  //   }
  // });
  // const wrongClass = document.querySelectorAll(".wrong");
  // console.log(wrongClass);
  //       let arrayOfCells = Array.from(document.querySelectorAll(`container`))
  // console.log(arrayOfCells)
  //   }}))
  //   gridCells.forEach((firstCell) => {
  //     gridCells.forEach((secondCell) => {
  //       if (firstCell.id != secondCell.id) {
  //         checkWrongNumbers(firstCell, secondCell);
  //       }
  //     });
  //   });
  //   let wrongClass = Array.from(document.querySelectorAll(".wrong"));
  //   checkWrongClass(wrongClass);
  // }
  // function checkWrongNumbers(firstCell, secondCell) {
  //   const firstCellClasslist = validateClass(firstCell);
  //   const secondCellClasslist = validateClass(secondCell);
  //   if (
  //     (firstCellClasslist.container == secondCellClasslist.container) &&
  //       // firstCellClasslist.column == secondCellClasslist.column ||
  //       // firstCellClasslist.row == secondCellClasslist.row) &&
  //     firstCell.innerHTML != " " &&
  //     secondCell.innerHTML != " "
  //   ) {
  //     if (firstCell.innerHTML == secondCell.innerHTML) {
  //       firstCell.classList.add("wrong");
  //       secondCell.classList.add("wrong");
  //     }
  //   }
}

function checkWrongClass(wrongClass) {
  wrongClass.forEach((firstWrongCell) => {
    wrongClass.forEach((secondWrongCell) => {
      // if (firstWrongCell.id != secondWrongCell.id) {
      const firstCellClasslist = validateClass(firstWrongCell);
      const secondCellClasslist = validateClass(secondWrongCell);

      if (
        firstCellClasslist.container == secondCellClasslist.container
        // firstCellClasslist.column == secondCellClasslist.column ||
        // firstCellClasslist.row == secondCellClasslist.row
      ) {
        if (firstWrongCell.innerHTML !== secondWrongCell.innerHTML) {
          firstWrongCell.classList.remove("wrong");
          secondWrongCell.classList.remove("wrong");
        }
      }
    });
  });
}

function validateClass(element) {
  let container;
  let row;
  let column;

  Array.from(element.classList).forEach((cellClass) => {
    if (cellClass.includes("container")) container = cellClass;
    else if (cellClass.includes("row")) row = cellClass;
    else if (cellClass.includes("column")) column = cellClass;
  });

  return { container, row, column };
}
