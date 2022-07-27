export function addEventListeners() {
  const gridCells = Array.from(document.querySelectorAll(".grid-cell"));

  gridCells.forEach((cell) => {
    cell.addEventListener("click", (e) => handleClickCell(e, gridCells));
  });
}

function handleClickCell(e, gridCells) {
  const cell = e.target;
  // setId(cell, index);
  highlightClass(cell, gridCells);
  addEraseHistory(cell);
}

function clearClass(gridCells) {
  gridCells.forEach((elem) => {
    elem.classList.remove("toggle", "toggle-heavy");
  });
}

// function setId(cell, index) {
//   cell.setAttribute("id", index);
//   cell.setAttribute("type", "number");
//   if (cell.innerHTML === " ") {
//     cell.contentEditable = true;
//   }
// }

function addEraseHistory(cell) {
  // historySudoku.addEraseHistory(cell);
}

function highlightClass(cell, gridCells) {
  clearClass(gridCells);

  let container;
  let row;
  let column;

  Array.from(cell.classList).forEach((cellClass) => {
    if (cellClass.includes("container")) container = cellClass;
    else if (cellClass.includes("row")) row = cellClass;
    else if (cellClass.includes("column")) column = cellClass;
  });

  Array.from(document.getElementsByClassName(row)).forEach((elem) =>
    elem.classList.add("toggle")
  );
  Array.from(document.getElementsByClassName(column)).forEach((elem) =>
    elem.classList.add("toggle")
  );
  Array.from(document.getElementsByClassName(container)).forEach((elem) =>
    elem.classList.add("toggle")
  );

  cell.classList.add("toggle-heavy");
}

function handleUndo() {
  actualState = historySudoku.undo();
  if (
    actualState != undefined &&
    !historySudoku.historyList.includes(actualState)
  ) {
    actualState.cell.innerHTML = " ";
  }
  console.log(actualState.value);
  console.log(historySudoku.historyList);
}
// let realCell = document.querySelectorAll(actualState.cell)

function handleErase() {
  let erasedItem = historySudoku.erase();
  if (erasedItem != undefined && erasedItem.contentEditable == "true") {
    erasedItem.innerHTML = " ";
  }
  console.log(erasedItem);
}

const newgameBtn = document.querySelector(".new-game-btn")

console.log(newgameBtn)

function newGame() {
  console.log("new game");
}

function notes() {
  console.log("notes");
}


const numpadButtons = Array.from(document.querySelectorAll(".numpad-btn"));
console.log(numpadButtons);

// function addButtonEvent() {
//   console.log(numpadButtons)
// } addButtonEvent()