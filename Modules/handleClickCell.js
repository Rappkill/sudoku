import { highlightSameNumbers } from "./handleAssignValue.js";

export function handleClickCell(e, gridCells) {
  const selectedCell = e.target;

  clearClass(gridCells);
  highlightSelectedCell(selectedCell);
  highlightAssociatedCells(selectedCell);
  highlightSameNumbers(selectedCell.innerHTML, selectedCell);
}

function highlightSelectedCell(selectedCell) {
  selectedCell.classList.add("toggle-heavy");
}

function highlightAssociatedCells(selectedCell) {
  const cellClasslist = validateClass(selectedCell);

  for (const key in cellClasslist) {
    Array.from(document.getElementsByClassName(cellClasslist[key])).forEach(
      (elem) => elem.classList.add("toggle")
    );
  }
}

function clearClass(gridCells) {
  gridCells.forEach((elem) => {
    elem.classList.remove("toggle", "toggle-heavy");
  });
}

export function validateClass(element) {
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


