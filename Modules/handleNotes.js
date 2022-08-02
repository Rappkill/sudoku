import { createDivElement } from "./createDOMElements.js";

export function handleNotes(e) {
  const notesButton = e.target;

  buttonNoteState(notesButton);
}

function buttonNoteState(notesButton) {
  if (notesButton.className.includes("active")) {
    notesButton.classList.remove("active");
  } else {
    notesButton.classList.add("active");
  }
}

export function generateNotes(cell) {
  cell.classList.add("notes-cell");
  for (let index = 1; index <= 9; index++) {
    createDivElement(cell, "notes-class", index);
  }
}

export function makeNotesOnGrid(value) {
  let cell = document.querySelector(".toggle-heavy");
  let notesBtn = document.querySelector(".notes-btn");
  let cellChildren = Array.from(
    document.querySelector(".toggle-heavy").children
  );
  if (notesBtn.className.includes("active")) {
    if (cellChildren.length == 0) {
      cell.innerHTML = " ";
      generateNotes(cell);
    } else {
      cellChildren.forEach((child) => {
        if (child.id == value) {
          child.classList.add("visible");
        }
      });
    }
  }
}
