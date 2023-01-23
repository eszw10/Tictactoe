//define variable
const boxs = document.querySelectorAll('.box')
const turn = document.getElementById('turn')
const start = document.getElementById('start');
const restart = document.getElementById('restart')
const winContain = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

let options = ['','','','','','','','',''];
let current = 'X';
let running = false;

turn.textContent = 'Click start to play!'
start.addEventListener('click',gameOn);

function gameOn() {
    boxs.forEach(box=> box.addEventListener('click',clickBox))
    restart.addEventListener('click',restartGame);
    turn.textContent = `${current}'s turn`;  
    running = true;
}

function clickBox() {
    const cellIndex = this.getAttribute('index');
    if(options[cellIndex] != '' || !running) {
        return;
    }
    updateBox(this,cellIndex);
    checkWinner();
}

function updateBox(cell,index) {
    options[index] = current;
    cell.textContent = current; 
}

function changePlayer() {
    current = (current === 'X')? 'O' : 'X';
    turn.textContent = `${current}'s turn`
}

function checkWinner() {
    let isWin = false;
    for(const element of winContain) {
        const condition = element;
        const cell1 = options[condition[0]];
        const cell2 = options[condition[1]];
        const cell3 = options[condition[2]];

        if(cell1 == "" || cell2 == "" || cell3 === "") {
            continue;
        }

        if(cell1 == cell2 && cell2 == cell3) {
            isWin = true;
            break;
        }
    }

    if(isWin){
        turn.textContent = `Player ${current} won!`;
        running = false;
    } else if(!options.includes("")) {
        turn.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    current = 'X';
    options = ['','','','','','','','',''];
    turn.textContent = `${current}'s turn`;
    boxs.forEach(box=> box.textContent = '');
    running = true;
}