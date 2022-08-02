import {
  generateSudokuNumbers,
  generate9X9,
} from "./Modules/generateSudoku.js";
import { createSudokuElements } from "./Modules/createDOMElements.js";
import { addEventListeners } from "./Modules/addEventListeners.js";
import { setTimer } from "./Modules/timer.js";

createSudokuElements();
generate9X9();
generateSudokuNumbers();
setTimer();
addEventListeners();
