document.addEventListener('DOMContentLoaded', () => {
    let playerText = document.getElementById('playerText');
    let restartBtn = document.querySelector('.restartBtn');
    let boxes = Array.from(document.getElementsByClassName('box'));

    let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
/* Constant characters used during the game X and O */
    const O_TEXT = "O";
    const X_TEXT = "X";
    let currentPlayer = X_TEXT;
    let spaces = Array(9).fill(null);

    const beginGame = () => {
        boxes.forEach(box => box.addEventListener('click', boxClicked));
    };

    function boxClicked(e) {
        const id = e.target.id;

        if (!spaces[id]) {
            spaces[id] = currentPlayer;
            e.target.innerText = currentPlayer;

            if (PlayerWon() !== false) {
                playerText.innerHTML = `${currentPlayer} has won!`;
                let winning_blocks = PlayerWon();

                winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
                return;
            }

            currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
        }
    }
/*The combos for any of the winning possibilities*/
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
/* The function is the player won*/
    function PlayerWon() {
        for (const condition of winningCombos) {
            let [a, b, c] = condition;

            if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
                return [a, b, c];
            }
        }
        return false;
    }
/* Restarting the game at any point or after finishing the*/
    function restart() {
        console.log('Restart button clicked');
        spaces.fill(null);

        boxes.forEach(box => {
            box.innerText = '';
            box.style.backgroundColor = '';
        });

        playerText.innerHTML = 'Tic Tac Toe';

        currentPlayer = X_TEXT;
    }

    beginGame();
    restartBtn.addEventListener('click', restart);
});
