import {
  clearClass,
  highlightSelectedCell,
  highlightAssociatedCells,
  highlightSameNumbers,
  generalValidation,
  acceptOnlyNumbers,
} from "./validation.js";
import { generateSudoku, createDivElement } from "./builtInterface.js";
import { performAction } from "./performActions.js";

//highlight click
export function handleClickCell(e, gridCells) {
  const selectedCell = e.target;
  clearClass(gridCells);
  highlightSelectedCell(selectedCell);
  highlightAssociatedCells(selectedCell);
  highlightSameNumbers(selectedCell.innerHTML, selectedCell);
}

//handleKey press
export function handleKeyPress(e) {
  if (!acceptOnlyNumbers(e)) {
    return;
  }
  e.preventDefault();
  handleAssignValue(e.key);
}

//numPad
export function handleClickNumpad(e) {
  const value = e.target.value;
  handleAssignValue(value);
}

//erase
export function handleErase() {
  let cell = document.querySelector(".toggle-heavy");
  if (cell != undefined && cell.contentEditable == "true") {
    sudokuObject.addHistory(cell, cell.innerHTML);
    cell.innerHTML = " ";
    generalValidation();
    highlightSameNumbers();
  }
}

//newGame
export function handleNewGame() {
  const gridContainer = document.querySelectorAll(".grid-container");
  gridContainer.forEach((elem) => elem.remove());

  generateSudoku();
  performAction();
  //   setTimer();
}

//undo
export function handleUndo() {
  sudokuObject.undo();
  highlightSameNumbers();
  generalValidation();
}

//history feature
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

//handleNotes
export function handleNotes(e) {
  const notesButton = e.target;

  buttonNoteState(notesButton);
}

function buttonNoteState(notesButton) {
  if (notesButton.className.includes("active")) {
    notesButton.classList.remove("active");
  } else {
    notesButton.classList.add("active");
  }
}

function generateNotes(cell) {
  cell.classList.add("notes-cell");
  for (let index = 1; index <= 9; index++) {
    createDivElement(cell, "notes-class", index);
  }
}

function makeNotesOnGrid(value) {
  let cell = document.querySelector(".toggle-heavy");
  let notesBtn = document.querySelector(".notes-btn");
  let cellChildren = Array.from(
    document.querySelector(".toggle-heavy").children
  );
  if (notesBtn.className.includes("active")) {
    if (cellChildren.length == 0) {
      cell.innerHTML = " ";
      generateNotes(cell);
    } else {
      cellChildren.forEach((child) => {
        if (child.id == value) {
          child.classList.add("visible");
        }
      });
    }
  }
}

//timer
export function handleTimerPlay() {
  let secondsLabel = document.querySelector(".seconds");
  let minutesLabel = document.querySelector(".minutes");
  document.querySelectorAll(".grid-cell").forEach(elem => elem.classList.remove("hidden"))
  interval = setInterval(function () {
    setTime(secondsLabel, minutesLabel);
  }, 1000);
}

export function handleTimerPause() {
  document.querySelectorAll(".grid-cell").forEach(elem => elem.classList.add("hidden"))
  clearInterval(interval);

}

function setTimeValue(totalSeconds) {
  let timeValue = totalSeconds + "";
  if (timeValue.length < 2) {
    return "0" + timeValue;
  }
  return timeValue;
}

let totalSeconds = 0;
let interval;


function setTime(secondsLabel, minutesLabel) {
  totalSeconds++;
  secondsLabel.innerHTML = setTimeValue(totalSeconds % 60);
  minutesLabel.innerHTML = setTimeValue(Math.floor(totalSeconds / 60));
}

//assign value
function handleAssignValue(value) {
  let selectedCell = document.querySelector(".toggle-heavy");
  let notesBtn = document.querySelector(".notes-btn");

  sudokuObject.addHistory(selectedCell, selectedCell.innerHTML);

  if (notesBtn.className.includes("active")) {
    makeNotesOnGrid(value);
  } else if (selectedCell != null && selectedCell.contentEditable == "true") {
    selectedCell.classList.remove("notes-cell");
    selectedCell.innerHTML = value;
    highlightSameNumbers(value, selectedCell);
    generalValidation();
  }
}
