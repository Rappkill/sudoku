//container class
export function getRowClass(containerIndex, cellIndex) {
  if (containerIndex <= 3) {
    return Math.floor((cellIndex - 1) / 3) + 1;
  } else if (containerIndex <= 6) {
    return Math.floor((cellIndex - 1) / 3) + 4;
  } else {
    return Math.floor((cellIndex - 1) / 3) + 7;
  }
}

export function getColumnClass(containerIndex, cellIndex) {
  const columns1 = [1, 4, 7];
  const columns2 = [2, 5, 8];
  const columns3 = [3, 6, 9];

  if (columns1.includes(cellIndex)) {
    return columns1[(containerIndex - 1) % 3];
  } else if (columns2.includes(cellIndex)) {
    return columns2[(containerIndex - 1) % 3];
  } else {
    return columns3[(containerIndex - 1) % 3];
  }
}

//highlight selectedCell
export function highlightSelectedCell(selectedCell) {
  selectedCell.classList.add("toggle-heavy");
}

export function highlightAssociatedCells(selectedCell) {
  const cellClasslist = validateClass(selectedCell);

  for (const key in cellClasslist) {
    Array.from(document.getElementsByClassName(cellClasslist[key])).forEach(
      (elem) => elem.classList.add("toggle")
    );
  }
}

export function clearClass(gridCells) {
  gridCells.forEach((elem) => {
    elem.classList.remove("toggle", "toggle-heavy");
  });
}

export function highlightSameNumbers(value, selectedCell) {
  let gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((cell) => cell.classList.remove("same"));
  gridCells.forEach((elem) => {
    if (elem.innerHTML == value && selectedCell != elem && value != " ") {
      elem.classList.add("same");
    } else {
      elem.classList.remove("same");
    }
  });
}

//validate wrong numbers
export function generalValidation() {
  const gridCells = Array.from(document.querySelectorAll(".grid-cell"));
  gridCells.forEach((cell) => cell.classList.remove("wrong"));
  for (const cell of gridCells) {
    checkWrongNumbers(cell, gridCells);
  }
}

function checkWrongNumbers(cell, gridCells) {
  if (cell.className.includes("notes-cell")) return;

  let validateCell = validateClass(cell);
  let { container, row, column } = validateCell;

  let containerArray = Array.from(
    document.getElementsByClassName(`${container}`)
  );
  let rowArray = Array.from(document.getElementsByClassName(`${row}`));
  let columnArray = Array.from(document.getElementsByClassName(`${column}`));

  gridCells.forEach((cellToCheck) => {
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

//class checking
function validateClass(element) {
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

//validation for numbers
export function acceptOnlyNumbers(e) {
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
