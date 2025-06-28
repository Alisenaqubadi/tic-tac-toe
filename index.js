const Game = ()=> {
    // Track moves for X and O
    let xMoves = [];
    let oMoves = [];
    let xScore = 0;
    let oScore = 0;

    const xScoreElem = document.querySelector('.info h2:nth-of-type(1)');
    const oScoreElem = document.querySelector('.info h2:nth-of-type(2)');

    const winningCombos = [
      [1,2,3],[4,5,6],[7,8,9], // rows
      [1,4,7],[2,5,8],[3,6,9], // cols
      [1,5,9],[3,5,7]          // diagonals
    ];

    function checkWin(moves) {
      return winningCombos.some(combo => combo.every(num => moves.includes(num)));
    }

    function checkDraw() {
      return xMoves.length + oMoves.length === 9;
    }

    function resetBoard() {
      for (let i = 1; i <= 9; i++) {
        const option = document.getElementById(`option${i}`);
        option.innerHTML = "";
      }
      xMoves = [];
      oMoves = [];
      isXTurn = true;
    }

    let isXTurn = true;
    for (let i = 1; i <= 9; i++) {
      const option = document.getElementById(`option${i}`);
      option.addEventListener("click", function() {
        if (option.querySelector("img")) return; // already played

        if (isXTurn) {
          option.innerHTML = "<img src='x.svg'>";
          xMoves.push(i);
          if (checkWin(xMoves)) {
            xScore++;
            xScoreElem.textContent = `X's score: ${xScore}`;
            setTimeout(resetBoard, 800);
            return;
          }
        } else {
          option.innerHTML = "<img src='o.svg'>";
          oMoves.push(i);
          if (checkWin(oMoves)) {
            oScore++;
            oScoreElem.textContent = `O's score: ${oScore}`;
            setTimeout(resetBoard, 800);
            return;
          }
        }
        if (checkDraw()) {
          setTimeout(resetBoard, 800);
        }
        isXTurn = !isXTurn;
      });
    }

    // Also reset board and scores on reset button click
    document.getElementById('reset').addEventListener('click', function() {
      xScore = 0;
      oScore = 0;
      xScoreElem.textContent = `X's score: 0`;
      oScoreElem.textContent = `O's score: 0`;
      resetBoard();
    });
}

Game();