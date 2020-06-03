document.addEventListener("DOMContentLoaded", () => {

  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById('score');
  const width = 8;
  const squares = [];
  let score = 0;

  const candyColors = [
    'url(images/red-candy.png)',
    'url(images/yellow-candy.png)',
    'url(images/orange-candy.png)',
    'url(images/purple-candy.png)',
    'url(images/green-candy.png)',
    'url(images/blue-candy.png)'
  ];

  // Create Board div
  function createBoard() {

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");

      square.setAttribute("draggable", true);
      square.setAttribute("id", i);

      // random candy board
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundImage = candyColors[randomColor]

      // produce div squares
      grid.appendChild(square);
      // produce many squares
      squares.push(square);
    }
  }
  createBoard();

  // Drag The Candies

  let colorBeingDragged;
  let colorBeingReplaced;
  let squaresIdBeingDragged;
  let squaresIdBeingReplaced;

  squares.forEach(square => square.addEventListener("dragstart", dragStart));
  squares.forEach(square => square.addEventListener("dragend", dragEnd));
  squares.forEach(square => square.addEventListener("dragover", dragOver));
  squares.forEach(square => square.addEventListener("dragenter", dragEnter));
  squares.forEach(square => square.addEventListener("dragleave", dragLeave));
  squares.forEach(square => square.addEventListener("drop", dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    squaresIdBeingDragged = parseInt(this.id);
    // console.log(colorBeingDragged);
    // console.log(this.id, ' dragStart');
  }

  function dragOver(e) {
    e.preventDefault();
    // console.log(this.id, 'dragOver');
  }

  function dragEnter(e) {
    e.preventDefault();
    // console.log(this.id, 'dragEnter');
  }

  function dragLeave() {
    // console.log(this.id, 'dragLeave');
  }

  function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage;
    // console.log(this.id, 'dragDrop');
    squaresIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    squares[squaresIdBeingDragged].style.backgroundImage = colorBeingReplaced;
  }

  function dragEnd() {
    // console.log(this.id, 'dragEnd');

    // What is a valid move?

    let validMoves = [
      squaresIdBeingDragged - 1,
      squaresIdBeingDragged - width,
      squaresIdBeingDragged + 1,
      squaresIdBeingDragged + width
    ];

    let validMove = validMoves.includes(squaresIdBeingReplaced);

    if (squaresIdBeingReplaced && validMove) {
      squaresIdBeingReplaced = null;
    } else if (squaresIdBeingReplaced && !validMove) {
      squares[squaresIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squaresIdBeingDragged].style.backgroundImage = colorBeingDragged;
    } else squares[squaresIdBeingDragged].style.backgroundImage = colorBeingDragged;

  }

  // Drop candie once some have been cleared
  function moveIntoSquareBelow() {

    for (i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === '') {
        squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = '';
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && (squares[i].style.backgroundImage === '')) {
          let randomColor = Math.floor(Math.random() * candyColors.length);
          squares[i].style.backgroundImage = candyColors[randomColor];
        }
      }
    }
  }

  // Checking For Matches
  // Checking Row Of Four

  function checkRowForFour() {
    for (i = 0; i < 60; i++){
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decideColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === '';

      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 30, 45, 46, 47, 53, 54, 55];
      if (notValid.includes(i)) continue

      if (rowOfFour.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach(index => {
          squares[index].style.backgroundImage = "";
        })
      }
    }
  }
  checkRowForFour();

  // Checking For Column Of Four

function checkColumnForFour(){
  for(i=0; i<39; i++){
    let columnOfFour = [i, i+width*2, i+width*3];
    let decideColor = squares[i].style.backgroundImage;
    const isBlank = squares[i].style.backgroundImage === '';

    if (columnOfFour.every(index => squares[index].style.backgroundImage === decideColor &&! isBlank)){
      score += 4 ;
      scoreDisplay.innerHTML =score;
      columnOfFour.forEach(index =>{
        squares[index].style.backgroundImage = '';
      })
    }
  }
}

checkColumnForFour();

  // Check For Row Of Three

  function checkRowForThree() {

    for (i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decideColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === '';

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) continue;

      if (rowOfThree.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {

        rowOfThree.forEach(index => {
          squares[index].style.backgroundImage = '';
        })
      }
    }
  }
  checkRowForThree();

  // Check For Column Of Three
  function checkColumnForThree() {

    for (i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decideColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === '';

      if (columnOfThree.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)) {

score += 3
scoreDisplay.innerHTML = score;
        columnOfThree.forEach(index => {
          squares[index].style.backgroundImage = '';
        })
      }
    }
  }

  checkColumnForThree();

// checlks carried out indefintely- add button to clear interval for best practice
  window.setInterval(function() {
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
    moveIntoSquareBelow();
  }, 100);

});
