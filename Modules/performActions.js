import {
  handleClickCell,
  handleKeyPress,
  handleClickNumpad,
  handleUndo,
  handleErase,
  handleNewGame,
  handleNotes,
  handleTimerPlay,
  handleTimerPause,
} from "./features.js";

export function performAction() {
  const gridCells = Array.from(document.querySelectorAll(".grid-cell"));

  gridCells.forEach((cell, index) => cell.setAttribute("id", index));

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

  document
    .querySelector(".pause-btn")
    .addEventListener("click", (e) => handleTimerPause(e));

  document
    .querySelector(".play-btn")
    .addEventListener("click", (e) => handleTimerPlay(e));
}
