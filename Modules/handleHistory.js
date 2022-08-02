import { generalValidation } from "./validateNums.js";

class SudokuHistory {
  constructor() {
    this.historyList = [];
  }

  addHistory(cell, value) {
    this.historyList.push({
      cell,
      value,
    });
  }

  undo() {
    let previuosElement = this.historyList[this.historyList.length - 1];
    if (previuosElement != undefined) {
      previuosElement.cell.innerHTML = previuosElement.value;
      return this.historyList.pop();
    }
  }
}

export const sudokuObject = new SudokuHistory();

export function handleUndo() {
  sudokuObject.undo();
  generalValidation();
}
