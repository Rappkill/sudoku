let main = document.querySelector(".main");
console.log(main)


function createDivElement(parent, _class) {
    const div = document.createElement('div');
    div.className = _class;
    parent.appendChild(div)
}


createDivElement(main, 'game-wrapper');
const gameWrapper = document.querySelector('.game-wrapper');

// const gameWrapper = document.createElement('div');
// gameWrapper.className = 'game-wrapper';
// main.appendChild(gameWrapper);


createDivElement(gameWrapper, 'sudoku-wrapper');
const sudokuWrapper = document.querySelector('.sudoku-wrapper');

// const sudokuWrapper = document.createElement('div');
// sudokuWrapper.className = 'sudoku-wrapper';
// gameWrapper.appendChild(sudokuWrapper);

function generateContainerWithCells(parent, containerIndex) {

    const gridContainer = document.createElement('div');
    gridContainer.className = `grid-container grid-container-${containerIndex}`;
    gridContainer.innerHTML = ' '
    parent.appendChild(gridContainer);

    for (let cellIndex = 1; cellIndex <= 9; cellIndex++) {
        let gridCell = document.createElement('div');

        const row = getRowClass(containerIndex, cellIndex);
        const column = getColumnClass(containerIndex, cellIndex);

        gridCell.className = `grid-cell container-${containerIndex} test-row-${row} test-column-${column}`;
        gridContainer.appendChild(gridCell);
    }
}

function getRowClass(containerIndex, cellIndex) {
    if (containerIndex <= 3) {
        return Math.floor((cellIndex - 1) / 3) + 1;
    }
    else if (containerIndex <= 6) {
        return Math.floor((cellIndex - 1) / 3) + 4;
    }
    else {
        return Math.floor((cellIndex - 1) / 3) + 7;
    }
}

function getColumnClass(containerIndex, cellIndex) {
    const columns1 = [1, 4, 7];
    const columns2 = [2, 5, 8];
    const columns3 = [3, 6, 9];

    if (columns1.includes(cellIndex)) {
        return columns1[(containerIndex - 1) % 3];
    }
    else if (columns2.includes(cellIndex)) {
        return columns2[(containerIndex - 1) % 3];
    }
    else {
        return columns3[(containerIndex - 1) % 3];
    }
}


//make 9 similar grids
Array(9).fill(null).map((_, index) => generateContainerWithCells(sudokuWrapper, index + 1));
// const containers = Array.from(document.querySelectorAll('div.grid-container'));

// containers.forEach((container, i) => {
//     container.className = `grid-container ${i + 1}`
// })

const gridCells = Array.from(document.querySelectorAll('div.grid-cell'));

gridCells.forEach((cell, i) => {
    //for eaqch element try to add some classes to identify row and collumn and container
    cell.setAttribute('id', i);

    cell.addEventListener('click', function highlightClass() {
        cell.className = 'toggle'
        console.log(cell.id, 'click');
    });
})




createDivElement(gameWrapper, 'button-wrapper');
const buttonWrapper = document.querySelector('.button-wrapper');


// const buttonWrapper = document.createElement('div');
// buttonWrapper.className = 'button-wrapper';
// gameWrapper.appendChild(buttonWrapper);

createButtons(buttonWrapper, 'new-game-btn', 'New Game');
let newGameButton = document.querySelector('.new-game-btn');



function createButtons(parent, _class, text) {
    const button = document.createElement('button');
    button.className = _class;
    button.innerText = text;
    parent.appendChild(button)
}



createDivElement(buttonWrapper, 'buttons-control');
const buttonsControl = document.querySelector('.buttons-control');

// const buttonsControl = document.createElement('div');
// buttonsControl.className = 'buttons-control';
// buttonWrapper.appendChild(buttonsControl)



createButtons(buttonsControl, 'undo-btn', 'Undo');
let undoButton = document.querySelector('.undo-btn');

createButtons(buttonsControl, 'erase-btn', 'Erase');
let eraseButton = document.querySelector('.erase-btn');

createButtons(buttonsControl, 'notes-btn', 'Notes');
let notesButton = document.querySelector('.notes-btn');


newGameButton.addEventListener('click', function newGame() {
    console.log('new game')
})

undoButton.addEventListener('click', function newGame() {
    console.log('undo')
})

eraseButton.addEventListener('click', function newGame() {
    console.log('erase')
})

notesButton.addEventListener('click', function newGame() {
    console.log('notes')
})



// const newGameButton = document.createElement('button');
// newGameButton.className = 'new-game-btn'
// newGameButton.innerText = 'New Game'
// buttonWrapper.appendChild(newGameButton);


// const undoButton = document.createElement('button');
// undoButton.className = 'undo-btn'
// undoButton.innerText = 'Undo'
// buttonsControl.appendChild(undoButton);

// const eraseButton = document.createElement('button');
// eraseButton.className = 'erase-btn'
// eraseButton.innerText = 'Erase'
// buttonsControl.appendChild(eraseButton);

// const notesButton = document.createElement('button');
// notesButton.className = 'notes-btn'
// notesButton.innerText = 'Notes'
// buttonsControl.appendChild(notesButton);




// const allContainers = document.querySelectorAll('div.grid-container');

// console.log(Array.from(allContainers).splice(0, 3));
// const firstContainer = Array.from(allContainers[0].querySelectorAll('div.grid-cell'));



function generateClasses() {

    let additionalRow = 0;
    let container = 1;

    for (l = 0; l < 3; l++) {


        let additionalColumn = 0;
        let rowCount = 3;
        let columnCount = 3;


        for (i = 0; i < 3; i++) {
            let grid3x3 = gridCells.splice(0, 9)

            for (j = 0; j < grid3x3.length; j++) {
                const row = Math.floor(j / rowCount + additionalRow + 1);
                const column = math.floor(j % columnCount + additionalColumn + 1);
                grid3x3[j].className = `grid-cell row-${row} column-${column} container-${container}`
            }
            additionalColumn += 3;
            container++;
        }


        additionalRow += 3;
    }

};


// function generateClass() {
//     let additionalColumn = 0;
//     let rowCount = 3;
//     let columnCount = 3;


//     for (i = 0; i < 3; i++) {
//         let grid3x3 = gridCells.splice(0, 9)

//         for (j = 0; j < grid3x3.length; j++) {
//             grid3x3[j].className = `grid-cell row-${j / rowCount | 0} column-${j % columnCount + additionalColumn | 0} container-${i}`
//         }
//         additionalColumn += 3;
//     }
// } generateClass();



// function generateNextClass() {
//     let additionalColumn = 0;
//     let rowCount = 3;
//     let columnCount = 3;


//     for (i = 0; i < 3; i++) {
//         let grid3x3 = gridCells.splice(0, 9)

//         for (j = 0; j < grid3x3.length; j++) {
//             grid3x3[j].className = `grid-cell row-${j / rowCount + 3 | 0} column-${j % columnCount + additionalColumn | 0} container-${i}`
//         }
//         additionalColumn += 3;
//     }
// } generateNextClass();


// function generateNextClass() {
//     let additionalColumn = 0;
//     let rowCount = 3;
//     let columnCount = 3;


//     for (i = 0; i < 3; i++) {
//         let grid3x3 = gridCells.splice(0, 9)

//         for (j = 0; j < grid3x3.length; j++) {
//             grid3x3[j].className = `grid-cell row-${j / rowCount + 6 | 0} column-${j % columnCount + additionalColumn | 0} container-${i}`
//         }
//         additionalColumn += 3;
//     }
// } generateNextClass();


// function generateClass() {
//     let additionalColumn = 0;
//     let rowCount = 3;
//     let columnCount = 3;


//     for (i = 0; i < 3; i++) {
//         let grid3x3 = gridCells.splice(0, 9)

//         for (j = 0; j < grid3x3.length; j++) {
//             grid3x3[j].className = `grid-cell row-${j / rowCount | 0} column-${j % columnCount + additionalColumn | 0} container-${i}`
//         }
//         additionalColumn += 3;
//     }
// } generateClass();



// while (firstContainer.length > 0) {
//     let x = firstContainer.splice(0, 3)
//     for (i = 0; i < x.length; i++) {
//         x[i].className = `grid-cell row-0 column-${i} container-1`
//     }
//     console.log(x)
// }


//row =  index % mRow
// col = index / mRow

// let firstGrid = gridCells.splice(0, 9)
// for (i = 0; i < firstGrid.length; i++) {
//     firstGrid[i].className = `grid-cell row-${i / 3 | 0} column-${i % 3 | 0} container-1`
//     console.log(firstGrid[i])
// }

// let secondGrid = gridCells.splice(0, 9)
// for (i = 0; i < secondGrid.length; i++) {
//     secondGrid[i].className = `grid-cell row-${i / 3 | 0} column-${i % 3 + 3 | 0} container-2`
//     console.log(secondGrid[i])
// }

// let thirdGrid = gridCells.slice(0, 9)
// console.log(thirdGrid)
// for (i = 0; i < thirdGrid.length; i++) {
//     thirdGrid[i].className = `grid-cell row-${i / 3 | 0} column-${i % 3 + 6 | 0} container-3`
//     console.log(thirdGrid[i])
// }



// function generateClass(rowCount, columnCount = 3, additional = 0) {
//     num = 0;
//     rowCount = 3;
//     columnCount = 3;
//     additional = 0;
//     while (num > 3) {

//         for (i = 0; i < 3; i++) {
//             let grid3x3 = gridCells.splice(0, 9)

//             for (j = 0; j < grid3x3.length; j++) {
//                 grid3x3[j].className = `grid-cell row-${j / rowCount + additional | 0} column-${j % columnCount + additional | 0} container-${i}`
//             }
//             additional += 3;
//         }
//         num++;
//         rowCount += 3;
//     }

// } generateClass();

    // let grid3 = gridCells.splice(0, 9)
    // console.log(grid3)

    // function generateClass(grid3) {
    //     let additional = 3;
    //     let rowCount = 3;
    //     let columnCount = 3;

    //     for (i = 0; i < grid3.length; i++) {
    //         console.log(grid3[i])
    //         grid3[i].className = `grid-cell row-${i / rowCount | 0} column-${i % columnCount + additional | 0} container-${i}`
    //     }
    //     // additional += 3;

    // } generateClass(grid3);


// let firstCells = Array.from(firstContainer).slice(0, 3)
// console.log(firstCells)

// for (i = 0; i < firstCells.length; i++) {
//     firstCells[i].className = `grid - cell row - 0 column - ${ i } container - 1`
// }

// let nextCells = Array.from(firstContainer).slice(3, 6)
// console.log(nextCells)
// for (i = 0; i < nextCells.length; i++) {
//     nextCells[i].className = `grid - cell row - 1 column - ${ i } container - 1`
// }

// let lastCells = Array.from(firstContainer).slice(6, 9)
// console.log(lastCells)
// for (i = 0; i < lastCells.length; i++) {
//     lastCells[i].className = `grid - cell row - 2 column - ${ i } container - 1`
// }