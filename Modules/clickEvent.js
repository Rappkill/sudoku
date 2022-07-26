const gridCells = Array.from(document.querySelectorAll("div.grid-cell"));



gridCells.forEach((cell, index) => {
    cell.addEventListener("click", (e) => handleClickCell(e, index));
  });
  
  function handleClickCell(e, index) {
    const cell = e.target;
    setId(cell, index);
    highlightClass(cell);
    addEraseHistory(cell);
  }
  
  function clearClass() {
    gridCells.forEach((elem) => {
      elem.classList.remove("toggle", "toggle-heavy");
    });
  }
  
  function setId(cell, index) {
    cell.setAttribute("id", index);
    cell.setAttribute("type", "number");
    if (cell.innerHTML === " ") {
      cell.contentEditable = true;
    }
  }
  
  function addEraseHistory(cell) {
    historySudoku.addEraseHistory(cell);
  }
  
  function highlightClass(cell) {
    clearClass();
  
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

  
  export function handleUndo() {
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
  
  export function handleErase() {
    let erasedItem = historySudoku.erase();
    if (erasedItem != undefined && erasedItem.contentEditable == "true") {
      erasedItem.innerHTML = " ";
    }
    console.log(erasedItem);
  }
  
  export function newGame() {
    console.log("new game");
  }
  
  export function notes() {
    console.log("notes");
  }