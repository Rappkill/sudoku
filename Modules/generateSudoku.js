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

function getRowClass(containerIndex, cellIndex) {
  if (containerIndex <= 3) {
    return Math.floor((cellIndex - 1) / 3) + 1;
  } else if (containerIndex <= 6) {
    return Math.floor((cellIndex - 1) / 3) + 4;
  } else {
    return Math.floor((cellIndex - 1) / 3) + 7;
  }
}

function getColumnClass(containerIndex, cellIndex) {
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

export function generate9X9() {
  const sudokuWrapper = document.querySelector(".sudoku-wrapper");
  Array(9)
    .fill(null)
    .map((_, index) => generateContainerWithCells(sudokuWrapper, index + 1));
}

export function generateSudokuNumbers() {
  let sudokuNumbers = sudoku.generate("medium").split("");
  for (let row = 1; row <= 9; row++) {
    let cells = Array.from(document.querySelectorAll(`.row-${row}`));
    let rowValues = sudokuNumbers.splice(0, 9);

    for (let i = 0; i < rowValues.length; i++) {
      if (rowValues[i] === ".") {
        rowValues[i] = " ";
      }
      cells[i].innerHTML = rowValues[i];
    }
  }
}

function setTimer() {
  const timer = document.querySelector(".timer")
  console.log(timer)
} setTimer(); 