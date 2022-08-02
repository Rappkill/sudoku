import { validateClass } from "./handleClickCell.js";

export function generalValidation() {
  const allCells = Array.from(document.querySelectorAll(".grid-cell"));
  allCells.forEach((cell) => cell.classList.remove("wrong"));
  for (const cell of allCells) {
    checkWrongNumbersIn(cell, allCells);
  }
}

function checkWrongNumbersIn(cell, allCells) {
  if (cell.className.includes("notes-cell")) return;

  let validateCell = validateClass(cell);
  let { container, row, column } = validateCell;

  let containerArray = Array.from(
    document.getElementsByClassName(`${container}`)
  );
  let rowArray = Array.from(document.getElementsByClassName(`${row}`));
  let columnArray = Array.from(document.getElementsByClassName(`${column}`));

  allCells.forEach((cellToCheck) => {
    if (cellToCheck.className.includes("notes-cell")) return;

    if (cellToCheck.innerText == cell.innerText && cell.innerHTML != " ") {
      if (
        (rowArray.includes(cellToCheck) ||
          columnArray.includes(cellToCheck) ||
          containerArray.includes(cellToCheck)) &&
        cellToCheck != cell
      ) {
        cell.classList.add("wrong");
      }
    }
  });
}
