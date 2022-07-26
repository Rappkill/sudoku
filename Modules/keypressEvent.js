import { gridCells } from "../sudokuScript.js";

gridCells.forEach((cell) =>
  cell.addEventListener("keypress", (e) => handleKeyPress(e))
);

function handleKeyPress(e) {
  if (acceptOnlyNumbers(e)) {
    assignCellValue(e);
  }
  saveHistory(e);
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
  cell.innerHTML = e.key;

  historySudoku.addHistory(cell, cell.innerHTML);
  console.log(historySudoku.historyList);
}

function saveHistory(e) {
  console.log(e.target, "history");
}
