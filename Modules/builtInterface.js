import { getColumnClass, getRowClass } from "./validation.js";

const main = document.querySelector(".main");

export function createInterface() {
  const gameWrapper = createDivElement(main, "game-wrapper");

  createDivElement(gameWrapper, "sudoku-wrapper");
  createDivElement(gameWrapper, "button-wrapper");
  const buttonWrapper = document.querySelector(".button-wrapper");

  createButton(buttonWrapper, "new-game-btn", "New Game");
  const buttonsControl = createDivElement(buttonWrapper, "buttons-control");

  createButton(buttonsControl, "undo-btn", "Undo");
  createButton(buttonsControl, "erase-btn", "Erase");
  createButton(buttonsControl, "notes-btn", "Notes");

  const timer = createDivElement(main, "timer");
  createLabel(timer, "minutes", "00");
  createSpan(timer, "span", ":");
  createLabel(timer, "seconds", "00");
  createButton(timer, "pause-btn", "||");
  createButton(timer, "play-btn", ">");

  const numpadWrapper = createDivElement(buttonWrapper, "numpad-wrapper");
  for (let i = 1; i <= 9; i++) {
    createButton(numpadWrapper, "numpad-btn", i, Number(i));
  }
  generateSudoku();
}

export function generateSudoku() {
  generate9x9();
  generateSudokuNumbers();
}

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

function generate9x9() {
  const sudokuWrapper = document.querySelector(".sudoku-wrapper");
  Array(9)
    .fill(null)
    .map((_, index) => generateContainerWithCells(sudokuWrapper, index + 1));
}

function generateSudokuNumbers() {
  let sudokuNumbers = sudoku
    .generate("medium")
    .split("")
    .map((elem) => (isNaN(Number(elem)) ? (elem = " ") : Number(elem)));

  for (let row = 1; row <= 9; row++) {
    let cells = Array.from(document.querySelectorAll(`.row-${row}`));
    let rowValues = sudokuNumbers.splice(0, 9);

    for (let i = 0; i < rowValues.length; i++) {
      cells[i].innerHTML = rowValues[i];

      if (rowValues[i] === " ") {
        cells[i].contentEditable = true;
      }
    }
  }
}

export function createDivElement(parent, cssClass, text) {
  const div = document.createElement("div");
  div.className = cssClass;
  if (text != undefined) {
    div.innerHTML = text;
    div.setAttribute("id", text);
  }
  parent.appendChild(div);

  return div;
}

function createButton(parent, cssClass, text, value) {
  const button = document.createElement("button");
  button.className = cssClass;
  button.innerText = text;
  if (value) {
    button.value = value;
  }
  parent.appendChild(button);
}

function createLabel(parent, cssClass, text) {
  const label = document.createElement("label");
  label.className = cssClass;
  label.innerHTML = text;
  parent.appendChild(label);
}

function createSpan(parent, cssClass, text) {
  const span = document.createElement("span");
  span.className = cssClass;
  span.innerHTML = text;
  parent.appendChild(span);
}
