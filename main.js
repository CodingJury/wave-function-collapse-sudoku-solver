const sudokuTable = document.getElementById('sudoku')
const options = document.getElementById('options')


const boardState = [
  [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
  [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
  [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
  [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
  [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
  [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
  [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
  [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
  [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]]
]

const arrayToCollapse = []


const clearContent = (sudokuTable) => {
  let child = sudokuTable.lastElementChild;
  while (child) {
      sudokuTable.removeChild(child);
      child = sudokuTable.lastElementChild;
  }
}

const genCellData = (boardState, row, col, optimalToCollapse) => {
  let a = "<div class='grid'>"

  boardState[row][col].forEach(element => {
    const optimal = optimalToCollapse.some((item) => (item.row == row && item.col == col))
    const collapsed = boardState[row][col].length == 1;
    a += `<div id="options" class='${optimal && "optimal"} ${collapsed && "collapsed"}' onclick=asd(${row},${col},this)>${element}</div>`
  });
  
  a += "</div>"

  return a;
}

//Init setup
const generateSudoku = () => {
  let optimalToCollapse = [];
  let minLen = 9;
  for(let i = 0; i < 9; i++) {
    for(let j = 0; j < 9; j++) {
      if(boardState[i][j].length !== 1 && boardState[i][j].length < minLen) {
        minLen = boardState[i][j].length;
        optimalToCollapse = []
      }

      if(boardState[i][j].length == minLen) {
        optimalToCollapse.push({row: i, col: j})
      }
    }
  }

  for(let i = 0; i < 9; i++) {
    let row = sudokuTable.insertRow(-1);
    for(let j = 0; j < 9; j++) {
      let cell = row.insertCell(j);
      cell.innerHTML = genCellData(boardState, i, j, optimalToCollapse);
    }
  }
}

const collapseRowColWithVal = () => {
  while(arrayToCollapse.length > 0){
    const {row, col, collapsedValue} = arrayToCollapse.shift();
    console.log(row, col, collapsedValue)

    //collapse the cell
    boardState[row][col] = [collapsedValue];
    
    //remove the collapsed element from row
    for(let j = 0; j < 9; j++) {
      // console.log(j)
      if(j != col && boardState[row][j].length > 1) {
        console.log(j)
        const tempArr = boardState[row][j].filter((value) => value != collapsedValue)
        if(tempArr.length == 1) {
          arrayToCollapse.push({row: row, col: j, collapsedValue: tempArr[0]})
        }
        boardState[row][j] = tempArr
      }
    }
  
    //remove the collapsed element from column
    for(let i = 0; i < 9; i++) {
      if(i != row && boardState[i][col].length  > 1) {
        const tempArr = boardState[i][col].filter((value) => value != collapsedValue)
        if(tempArr.length == 1) {
          arrayToCollapse.push({row: i, col: col, collapsedValue: tempArr[0]})
        }
        boardState[i][col] = tempArr; 
      } 
    }

    //remove the collapsed element from box
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if(i!=row && j!=col && boardState[i][j].length  > 1) {
          const tempArr = boardState[i][j].filter((value) => value != collapsedValue)
          if(tempArr.length == 1) {
            arrayToCollapse.push({row: i, col: j, collapsedValue: tempArr[0]})
          }
          boardState[i][j] = tempArr 
        }
      }
    }
  }
}

function asd(row, col, element) {
  if(boardState[row][col].length === 1) {
    console.warn(`[row: ${row}, col: ${col}] is already collapsed`)
    return;
  }


  const collapsedValue = element.innerText;

  console.log(collapsedValue)

  //clear the table
  clearContent(sudokuTable)

  //collapse row col with value
  arrayToCollapse.push({row, col, collapsedValue: collapsedValue})
  collapseRowColWithVal();

  //generate the new board
  generateSudoku()
}

generateSudoku()