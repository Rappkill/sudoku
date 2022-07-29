import { generateSudokuNumbers } from "./generateSudoku.js";

export function addEventListeners() {
  const gridCells = Array.from(document.querySelectorAll(".grid-cell"));

  gridCells.forEach((cell) => {
    cell.addEventListener("click", (e) => handleClickCell(e, gridCells));
  });

  gridCells.forEach((cell) => {
    cell.addEventListener("keydown", (e) => handleKeyPress(e));
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
}

//keyboard event
function handleKeyPress(e) {
  if (acceptOnlyNumbers(e)) {
    assignCellValue(e);
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
  if (cell.contentEditable == "true") {
    cell.innerHTML = Number(e.target.value);
    console.log(typeof cell.innerHTML);
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

function notes() {
  console.log("notes");
}
