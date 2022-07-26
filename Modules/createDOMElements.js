import { handleUndo, newGame, handleErase, notes } from "./clickEvent.js";

const main = document.querySelector(".main");

function createDivElement(parent, cssClass) {
  const div = document.createElement("div");
  div.className = cssClass;
  parent.appendChild(div);

  return div
}

export function createSudokuElements() {
  const gameWrapper =  createDivElement(main, "game-wrapper");
  // const gameWrapper = document.querySelector(".game-wrapper");
  

  
  const sudokuWrapper = createDivElement(gameWrapper, "sudoku-wrapper");

  createDivElement(gameWrapper, "button-wrapper");
  const buttonWrapper = document.querySelector(".button-wrapper");

  createButton(buttonWrapper, "new-game-btn", "New Game", newGame);
  // const newGameButton = document.querySelector(".new-game-btn");

  const buttonsControl = createDivElement(buttonWrapper, "buttons-control");
  //const buttonsControl = document.querySelector(".buttons-control");

   createButton(buttonsControl, "undo-btn", "Undo", handleUndo);
  // const undoButton = document.querySelector(".undo-btn");

  createButton(buttonsControl, "erase-btn", "Erase", handleErase);
  // const eraseButton = document.querySelector(".erase-btn");

  createButton(buttonsControl, "notes-btn", "Notes", notes);
  // const notesButton = document.querySelector(".notes-btn");
}

export function createButton(parent, cssClass, text, functionName) {
  const button = document.createElement("button");
  button.className = cssClass;
  button.innerText = text;
  button.addEventListener("click", function () {
    functionName();
  });
  parent.appendChild(button);
}
