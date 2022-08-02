import { generateSudokuNumbers, generate9X9 } from "./generateSudoku.js";
import { handleClickCell } from "./handleClickCell.js";
import {
  handleClickNumpad,
  handleKeyPress,
  handleErase,
} from "./handleAssignValue.js";
import { handleUndo } from "./handleHistory.js";
import { handleNotes } from "./handleNotes.js";
import { setTimer } from "./timer.js";

export function addEventListeners() {
  const gridCells = Array.from(document.querySelectorAll(".grid-cell"));

  gridCells.forEach((cell, index) => cell.setAttribute("id", index ));

  gridCells.forEach((cell) => {
    cell.addEventListener("click", (e) => handleClickCell(e, gridCells));
  });

  document.addEventListener("keydown", (e) => handleKeyPress(e));

  const numpadButtons = Array.from(document.querySelectorAll(".numpad-btn"));

  numpadButtons.forEach((button) =>
    button.addEventListener("click", (e) => handleClickNumpad(e))
  );

  document.querySelector(".undo-btn").addEventListener("click", handleUndo);

  document.querySelector(".erase-btn").addEventListener("click", handleErase);

  document
    .querySelector(".new-game-btn")
    .addEventListener("click", handleNewGame);

  document
    .querySelector(".notes-btn")
    .addEventListener("click", (e) => handleNotes(e));
}

function handleNewGame() {
  const gridContainer = document.querySelectorAll(".grid-container");
  console.log(gridContainer);
  gridContainer.forEach((elem) => elem.remove());

  generate9X9();
  generateSudokuNumbers();
  setTimer();
  addEventListeners();
}
