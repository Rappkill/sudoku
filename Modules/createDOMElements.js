const main = document.querySelector(".main");

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

export function createSudokuElements() {
  const gameWrapper = createDivElement(main, "game-wrapper");

  createDivElement(main, "timer");
  createDivElement(gameWrapper, "sudoku-wrapper");
  createDivElement(gameWrapper, "button-wrapper");
  const buttonWrapper = document.querySelector(".button-wrapper");

  createButton(buttonWrapper, "new-game-btn", "New Game");
  const buttonsControl = createDivElement(buttonWrapper, "buttons-control");

  createButton(buttonsControl, "undo-btn", "Undo");
  createButton(buttonsControl, "erase-btn", "Erase");
  createButton(buttonsControl, "notes-btn", "Notes");

  const numpadWrapper = createDivElement(buttonWrapper, "numpad-wrapper");
  for (let i = 1; i <= 9; i++) {
    createButton(numpadWrapper, "numpad-btn", i, Number(i));
  }
}
