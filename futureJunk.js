//Manipulate cells



const sudokuObjectCells = [];

//validation
function validateNums(cell) {
  // sudokuObjectCells[cell.id].className = cell.className;

  let container;
  let row;
  let column;

  Array.from(cell.classList).forEach((cellClass) => {
    if (cellClass.includes("container")) container = cellClass;
    else if (cellClass.includes("row")) row = cellClass;
    else if (cellClass.includes("column")) column = cellClass;
  });

  let checkFromThisArray = sudokuObjectCells.filter(
    (elem) =>
      elem.className.includes(row) ||
      elem.className.includes(column) ||
      elem.className.includes(container)
  );
  console.log(checkFromThisArray);

  // for (let key in checkFromThisArray) {
  //   if(cell.innerHTML == checkFromThisArray[key].innerHTML){
  //     cell.className += ' toggle-same'
  //     sudokuObjectCells[cell.id].className = cell.className;
  //     checkFromThisArray[key].className = cell.className;

  //   }
  // }

  // for (i = 0; i < verticalRow.length; i++) {
  //   if (verticalRow[i].innerHTML == cell.innerHTML) {
  //     verticalRow[i].className += " toggle-same";
  //   }
  // }

  // verticalRow.forEach(elem => elem.innerHTML === cell.innerHTML ? elem.className += ' toggle-same' : false);
  // horizontalColumn.forEach(elem => elem.innerHTML === cell.innerHTML ? elem.className += ' toggle-same' : false);

  // verticalRow.forEach((elem) => checkFromThisArray.push(elem));
  // horizontalColumn.forEach((elem) => checkFromThisArray.push(elem));
  // containerArray.forEach((elem) => checkFromContainer.push(elem));

  // while (i < 2) {
  //     for (i = 0; i < checkFromThisArray.length; i++) {
  //         if (cell.innerHTML == checkFromThisArray[i]) {

  //         }
  //     }

  // console.log(checkFromThisArray);
  // console.log(checkFromContainer);

  // let test = []
  // for (i = 0; i < checkFromThisArray.length; i++) {
  //     if (cell.innerHTML == checkFromThisArray[i].innerHTML) {
  //         // console.log(checkFromThisArray[i])
  //         checkFromThisArray[i].className += ' .toggle-same';
  //     }
  // }
}



function validateNums(e, gridCells) {
  
  gridCells.forEach((cell) => {
    let validateCell = validateClass(cell);
    const { container, row, column } = validateCell;

    let containerArray = Array.from(
      document.getElementsByClassName(`${container}`)
    );
    let rowArray = Array.from(document.getElementsByClassName(`${row}`));
    let columnArray = Array.from(document.getElementsByClassName(`${column}`));
    let cellClassArray = [...containerArray, ...rowArray, ...columnArray];
    console.log(cellClassArray)
    cellClassArray.forEach((cell1) => {
      cellClassArray.forEach((cell2) => {
        if (cell1.id !== cell2.id) {
          if (cell1.innerHTML === cell2.innerHTML) {
            cell1.classList.add("wrong");
          }
        }
      });
    });
  });
  //   const selectedCell = document.querySelector(".toggle-heavy");
  // if(arrayOfSelectedCells.length == 0 ){
  //   arrayOfSelectedCells.push(e.target)
  // }
  //   // console.log(selectedCell)
  // arrayOfSelectedCells.forEach(cell => {
  //   console.log(cell.id)
  //   if((e.target.id != cell.id )){
  //     arrayOfSelectedCells.push(e.target)
  //   }
  // })
  // console.log(arrayOfSelectedCells)
  // let cellClassList = validateClass(selectedCell);
  // const { container, row, column } = cellClassList;
  // let containerArray = Array.from(
  //   document.getElementsByClassName(`${container}`)
  // );
  // let rowArray = Array.from(document.getElementsByClassName(`${row}`));
  // let columnArray = Array.from(document.getElementsByClassName(`${column}`));
  // let cellClassArray = [...containerArray, ...rowArray, ...columnArray].filter(
  //   (cell) => {
  //     return cell.id != selectedCell.id;
  //   }
  // );
  // console.log(selectedCell.id)
  // let newArray = cellClassArray.
  // console.log(cellClassArray);
  //   cellClassArray.forEach(cell =>{
  //     cellClassArray.forEach(cell2 =>{
  //       if((cell.id != cell2.id) && (cell.innerHTML == cell2.innerHTML)){
  //           cell2.classList.add("wrong")
  //       }
  //     })
  //   })
  // const checkClass = document.querySelectorAll(".toggle:not(.toggle-heavy)");
  // console.log(checkClass);
  // checkClass.forEach((cell) => {
  //   if (cell.innerHTML == selectedCell.innerHTML) {
  //     selectedCell.classList.add("wrong");
  //     cell.classList.add("wrong");
  //   } else {
  //     cell.classList.remove("wrong");
  //   }
  // });
  // const wrongClass = document.querySelectorAll(".wrong");
  // console.log(wrongClass);
  //       let arrayOfCells = Array.from(document.querySelectorAll(`container`))
  // console.log(arrayOfCells)
  //   }}))
  //   gridCells.forEach((firstCell) => {
  //     gridCells.forEach((secondCell) => {
  //       if (firstCell.id != secondCell.id) {
  //         checkWrongNumbers(firstCell, secondCell);
  //       }
  //     });
  //   });
  //   let wrongClass = Array.from(document.querySelectorAll(".wrong"));
  //   checkWrongClass(wrongClass);
  // }
  // function checkWrongNumbers(firstCell, secondCell) {
  //   const firstCellClasslist = validateClass(firstCell);
  //   const secondCellClasslist = validateClass(secondCell);
  //   if (
  //     (firstCellClasslist.container == secondCellClasslist.container) &&
  //       // firstCellClasslist.column == secondCellClasslist.column ||
  //       // firstCellClasslist.row == secondCellClasslist.row) &&
  //     firstCell.innerHTML != " " &&
  //     secondCell.innerHTML != " "
  //   ) {
  //     if (firstCell.innerHTML == secondCell.innerHTML) {
  //       firstCell.classList.add("wrong");
  //       secondCell.classList.add("wrong");
  //     }
  //   }
}