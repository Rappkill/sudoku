import { sudokuObject } from "./handleHistory.js";
import { makeNotesOnGrid } from "./handleNotes.js";
import { generalValidation } from "./validateNums.js";

export function handleClickNumpad(e) {
  const value = e.target.value;

  handleAssignValue(value);
}

export function handleKeyPress(e) {
  if (!acceptOnlyNumbers(e)) {
    return;
  }
  e.preventDefault();
  handleAssignValue(e.key);
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

export function handleErase() {
  let cell = document.querySelector(".toggle-heavy");
  if (cell != undefined && cell.contentEditable == "true") {
    sudokuObject.addHistory(cell, cell.innerHTML);
    cell.innerHTML = " ";
    generalValidation();
  }
}

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

export function highlightSameNumbers(value, selectedCell) {
  let gridCells = document.querySelectorAll(".grid-cell");

  gridCells.forEach((elem) => {
    if (elem.innerHTML == value && selectedCell != elem && value != " ") {
      elem.classList.add("same");
    } else {
      elem.classList.remove("same");
    }
  });
}
