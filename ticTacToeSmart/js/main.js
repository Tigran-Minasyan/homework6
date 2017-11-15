const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const rand = function(num){
    return Math.floor(Math.random() * num) + 1;
}
let board;
const end = {
    winner: ' ',
    winningLocations: ' '
};
var gameOver = false;
var x = 200;
var y = 0;
var drawPart = 0;
var enemyTurn = 0;
var mouseCooldown = false;
const xSound = new Audio('js/sounds/X_sound.wav');
const oSound = new Audio('js/sounds/O_Sound.wav');
const restart = new Image();
restart.src = 'js/images/restartButton.png';

const boardDrawLoop = function(){

    if(drawPart === 0){
        drawBoardRow(x,y);
        y += 20;
        if(y === 600 && x === 200){
            x = 400;
            y = 0;
        }
        if(y === 600 && x === 400){
            drawPart = 1;
            x = 0;
            y = 200;
        }
    } else if(drawPart === 1){
        drawBoardColumn(x,y);
        x += 20;
        if(x === 600 && y === 200){
            x = 0;
            y = 400;
        }
        if(x === 600 && y === 400){
            drawPart = 2;
        }
    }
    context.drawImage(restart, 600,200,200,200);
    if(drawPart === 0 || drawPart === 1){
        requestAnimationFrame(boardDrawLoop);
    }
}


const drawBoardRow = function(x,y){

    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x,y+20);
    context.stroke();
}

const drawBoardColumn = function(x,y){

    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x+20,y);
    context.stroke();
}

const drawMove = function(x,y,isX){
    if(isX === true){
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x+150, y+150);
        context.stroke();
        context.moveTo(x+150,y);
        context.lineTo(x, y+150);
        context.stroke();
    }
    if(isX === false){
        context.beginPath();
        context.arc(x+75, y+75, 75, 0, 2 * Math.PI);
        context.stroke();
    }
}

const drawCord = function(arr1, arr2, isX){
    if(arr1 === 0 && arr2 === 0){
        drawMove(25,25,isX);
    }
    if(arr1 === 0 && arr2 === 1){
        drawMove(25,225,isX);
    }
    if(arr1 === 0 && arr2 === 2){
        drawMove(25,425,isX);
    }
    if(arr1 === 1 && arr2 === 0){
        drawMove(225,25,isX);
    }
    if(arr1 === 1 && arr2 === 1){
        drawMove(225,225,isX);
    }
    if(arr1 === 1 && arr2 === 2){
        drawMove(225,425,isX);
    }
    if(arr1 === 2 && arr2 === 0){
        drawMove(425,25,isX);
    }
    if(arr1 === 2 && arr2 === 1){
        drawMove(425,225,isX);
    }
    if(arr1 === 2 && arr2 === 2){
        drawMove(425,425,isX);
    }
}

const nextMove = function(board,isX){

    if(board[1][1] === ' '){
        return [1,1]
    } else if(board[0][0] === 'O' && board[0][1] === 'O' && board[0][2] === ' '){
        return [0,2]
    } else if(board[0][0] === 'O' && board[0][2] === 'O' && board[0][1] === ' '){
        return [0,1]
    } else if(board[0][1] === 'O' && board[0][2] === 'O' && board[0][0] === ' '){
        return [0,0]
    } else if(board[1][0] === 'O' && board[1][1] === 'O' && board[1][2] === ' '){
        return [1,2]
    } else if(board[1][0] === 'O' && board[1][2] === 'O' && board[1][1] === ' '){
        return [1,1]
    } else if(board[1][1] === 'O' && board[1][2] === 'O' && board[1][0] === ' '){
        return [1,0]
    } else if(board[2][0] === 'O' && board[2][1] === 'O' && board[2][2] === ' '){
        return [2,2]
    } else if(board[2][0] === 'O' && board[2][2] === 'O' && board[2][1] === ' '){
        return [2,1]
    } else if(board[2][1] === 'O' && board[2][2] === 'O' && board[2][0] === ' '){
        return [2,0]
    } else if(board[0][0] === 'O' && board[1][0] === 'O' && board[2][0] === ' '){
        return [2,0]
    } else if(board[0][0] === 'O' && board[2][0] === 'O' && board[1][0] === ' '){
        return [1,0]
    } else if(board[1][0] === 'O' && board[2][0] === 'O' && board[0][0] === ' '){
        return [0,0]
    } else if(board[0][1] === 'O' && board[1][1] === 'O' && board[2][1] === ' '){
        return [2,1]
    } else if(board[0][1] === 'O' && board[2][1] === 'O' && board[1][1] === ' '){
        return [1,1]
    } else if(board[1][1] === 'O' && board[2][1] === 'O' && board[0][1] === ' '){
        return [0,1]
    } else if(board[0][2] === 'O' && board[1][2] === 'O' && board[2][2] === ' '){
        return [2,2]
    } else if(board[0][2] === 'O' && board[2][2] === 'O' && board[1][2] === ' '){
        return [1,2]
    } else if(board[1][2] === 'O' && board[2][2] === 'O' && board[0][2] === ' '){
        return [0,2]
    } else if(board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === ' '){
        return [2,2]
    } else if(board[0][0] === 'O' && board[2][2] === 'O' && board[1][1] === ' '){
        return [1,1]
    } else if(board[1][1] === 'O' && board[2][2] === 'O' && board[0][0] === ' '){
        return [0,0]
    } else if(board[2][0] === 'O' && board[1][1] === 'O' && board[0][2] === ' '){
        return [0,2]
    } else if(board[2][0] === 'O' && board[0][2] === 'O' && board[1][1] === ' '){
        return [1,1]
    } else if(board[1][1] === 'O' && board[0][2] === 'O' && board[2][0] === ' '){
        return [2,0]
    } else if(board[0][2] === 'X' && board[2][0] === 'X' && board[1][2] === ' '){
        return [1,2]
    } else if(board[0][0] === 'X' && board[0][1] === 'X' && board[0][2] === ' '){
        return [0,2]
    } else if(board[0][0] === 'X' && board[0][2] === 'X' && board[0][1] === ' '){
        return [0,1]
    } else if(board[0][1] === 'X' && board[0][2] === 'X' && board[0][0] === ' '){
        return [0,0]
    } else if(board[1][0] === 'X' && board[1][1] === 'X' && board[1][2] === ' '){
        return [1,2]
    } else if(board[1][0] === 'X' && board[1][2] === 'X' && board[1][1] === ' '){
        return [1,1]
    } else if(board[1][1] === 'X' && board[1][2] === 'X' && board[1][0] === ' '){
        return [1,0]
    } else if(board[2][0] === 'X' && board[2][1] === 'X' && board[2][2] === ' '){
        return [2,2]
    } else if(board[2][0] === 'X' && board[2][2] === 'X' && board[2][1] === ' '){
        return [2,1]
    } else if(board[2][1] === 'X' && board[2][2] === 'X' && board[2][0] === ' '){
        return [2,0]
    } else if(board[0][0] === 'X' && board[1][0] === 'X' && board[2][0] === ' '){
        return [2,0]
    } else if(board[0][0] === 'X' && board[2][0] === 'X' && board[1][0] === ' '){
        return [1,0]
    } else if(board[1][0] === 'X' && board[2][0] === 'X' && board[0][0] === ' '){
        return [0,0]
    } else if(board[0][1] === 'X' && board[1][1] === 'X' && board[2][1] === ' '){
        return [2,1]
    } else if(board[0][1] === 'X' && board[2][1] === 'X' && board[1][1] === ' '){
        return [1,1]
    } else if(board[1][1] === 'X' && board[2][1] === 'X' && board[0][1] === ' '){
        return [0,1]
    } else if(board[0][2] === 'X' && board[1][2] === 'X' && board[2][2] === ' '){
        return [2,2]
    } else if(board[0][2] === 'X' && board[2][2] === 'X' && board[1][2] === ' '){
        return [1,2]
    } else if(board[1][2] === 'X' && board[2][2] === 'X' && board[0][2] === ' '){
        return [0,2]
    } else if(board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === ' '){
        return [2,2]
    } else if(board[0][0] === 'X' && board[2][2] === 'X' && board[1][1] === ' '){
        return [1,1]
    } else if(board[1][1] === 'X' && board[2][2] === 'X' && board[0][0] === ' '){
        return [0,0]
    } else if(board[2][0] === 'X' && board[1][1] === 'X' && board[0][2] === ' '){
        return [0,2]
    } else if(board[2][0] === 'X' && board[0][2] === 'X' && board[1][1] === ' '){
        return [1,1]
    } else if(board[1][1] === 'X' && board[0][2] === 'X' && board[2][0] === ' '){
        return [2,0]
    } else if(board[0][0] === 'X' && board[1][2] === 'X' && board[0][2] === ' '){
        return [0,2]
    } else if(board[2][0] === 'X' && board[1][2] === 'X' && board[2][2] === ' '){
        return [2,2]
    } else if(board[0][0] === ' '){
        return [0,0]
    } else if(board[1][0] === ' '){
        return [1,0]
    } else if(board[2][0] === ' '){
        return [2,0]
    } else if(board[0][1] === ' '){
        return [0,1]
    } else if(board[1][1] === ' '){
        return [1,1]
    } else if(board[2][1] === ' '){
        return [2,1]
    } else if(board[0][2] === ' '){
        return [0,2]
    } else if(board[1][2] === ' '){
        return [1,2]
    } else if(board[2][2] === ' '){
        return [2,2]
    }
}

const makeMove = function(board, location, isX){

    const location1 = location[0];
    const location2 = location[1];
    
    if(location1 < 0 || location1 > 2 || location2 < 0 || location2 > 2){
        gameOver = true;
        alert('DISQUALIFIED FOR CHEATING!')
        return -1;
    }

    if(isX === true){
        if(board[location1][location2] === ' '){
            board[location1][location2] = 'X';
            drawCord(location1, location2, true);
            xSound.play();
        } else {
            alert('Invalid Location!');
            alert('Disqualified!');
            gameOver = true;
        }
    }

    if(isX === false){
        if(board[location1][location2] === ' '){
            board[location1][location2] = 'O';
            drawCord(location1, location2, false);
            oSound.play();
        } else {
            alert('Invalid Location!');
            alert('Disqualified!');
            gameOver = true;
        }
    }

    return findWinner(board);
}

const endRow = function(x,y,x1,y1){
    context.strokeStyle = 'red';
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x1,y1);
    context.stroke();
}

const whoStarts = function(whoGoesFirst){
    
    if(whoGoesFirst === 2){
        const enemyStart = function(){
            if(drawPart === 2){
                makeMove(board,nextMove(board,false),false);
            } else {
                requestAnimationFrame(enemyStart)
            }
        }
        enemyStart();
    }
}

const restartGame = function(){
    context.clearRect(0,0,canvas.width,canvas.height);
    drawPart = 0;
    x = 200;
    y = 0;
    context.strokeStyle = 'white';
    boardDrawLoop();
    gameOver = false;
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    whoStarts(rand(2));
}

restartGame();

const findWinner = function(board){

    if(board[0][0] === 'X' && board[0][1] === 'X' && board[0][2] === 'X'){
        end.winner = 'X';
        end.winningLocations =  [[0, 0], [0, 1], [0,2]];
        console.log(end);
        gameOver = true;
        endRow(100,25,100,575);
    } else if(board[1][0] === 'X' && board[1][1] === 'X' && board[1][2] === 'X'){
        end.winner = 'X';
        end.winningLocations =  [[1, 0], [1, 1], [1,2]];
        console.log(end);
        gameOver = true;
        endRow(300,25,300,575);
    } else if(board[2][0] === 'X' && board[2][1] === 'X' && board[2][2] === 'X'){
        end.winner = 'X';
        end.winningLocations =  [[2, 0], [2, 1], [2,2]];
        console.log(end);
        gameOver = true;
        endRow(500,25,500,575);
    } else if(board[0][0] === 'X' && board[1][0] === 'X' && board[2][0] === 'X'){
        end.winner = 'X';
        end.winningLocations =  [[0, 0], [1, 0], [2, 0]];
        console.log(end);
        gameOver = true;
        endRow(25,100,575,100);
    } else if(board[0][1] === 'X' && board[1][1] === 'X' && board[2][1] === 'X'){
        end.winner = 'X';
        end.winningLocations =  [[0, 1], [1, 1], [2,1]];
        console.log(end);
        gameOver = true;
        endRow(25,300,575,300);
    } else if(board[0][2] === 'X' && board[1][2] === 'X' && board[2][2] === 'X'){
        end.winner = 'X';
        end.winningLocations =  [[0, 2], [1, 2], [2,2]];
        console.log(end);
        gameOver = true;
        endRow(25,500,575,500);
    } else if(board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X'){
        end.winner = 'X';
        end.winningLocations =  [[0, 0], [1, 1], [2,2]];
        console.log(end);
        gameOver = true;
        endRow(25,25,575,575);
    } else if(board[0][2] === 'X' && board[1][1] === 'X' && board[2][0] === 'X'){
        end.winner = 'X';
        end.winningLocations =  [[0, 2], [1, 1], [2, 0]];
        console.log(end);
        gameOver = true;
        endRow(575,25,25,575);
    } else if(board[0][0] === 'O' && board[0][1] === 'O' && board[0][2] === 'O'){
        end.winner = 'O';
        end.winningLocations =  [[0, 0], [0, 1], [0, 2]];
        console.log(end);
        gameOver = true;
        endRow(100,25,100,575);
    } else if(board[1][0] === 'O' && board[1][1] === 'O' && board[1][2] === 'O'){
        end.winner = 'O';
        end.winningLocations =  [[1, 0], [1, 1], [1, 2]];
        console.log(end);
        gameOver = true;
        endRow(300,25,300,575);
    } else if(board[2][0] === 'O' && board[2][1] === 'O' && board[2][2] === 'O'){
        end.winner = 'O';
        end.winningLocations =  [[2, 0], [2, 1], [2, 2]];
        console.log(end);
        gameOver = true;
        endRow(500,25,500,575);
    } else if(board[0][0] === 'O' && board[1][0] === 'O' && board[2][0] === 'O'){
        end.winner = 'O';
        end.winningLocations =  [[0, 0], [1, 0], [2, 0]];
        console.log(end);
        gameOver = true;
        endRow(25,100,575,100);
    } else if(board[0][1] === 'O' && board[1][1] === 'O' && board[2][1] === 'O'){
        end.winner = 'O';
        end.winningLocations =  [[0, 1], [1, 1], [2, 1]];
        console.log(end);
        gameOver = true;
        endRow(25,300,575,300);
    } else if(board[0][2] === 'O' && board[1][2] === 'O' && board[2][2] === 'O'){
        end.winner = 'O';
        end.winningLocations =  [[0, 2], [1, 2], [2, 2]];
        console.log(end);
        gameOver = true;
        endRow(25,500,575,500);
    } else if(board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === 'O'){
        end.winner = 'O';
        end.winningLocations =  [[0, 0], [1, 1], [2, 2]];
        console.log(end);
        gameOver = true;
        endRow(25,25,575,575);
    } else if(board[0][2] === 'O' && board[1][1] === 'O' && board[2][0] === 'O'){
        end.winner = 'O';
        end.winningLocations =  [[0, 2], [1, 1], [2, 0]];
        console.log(end);
        gameOver = true;
        endRow(575,25,25,575);
    } else if(board[0][0] !== ' ' && board[0][1] !== ' ' && board[0][2] !== ' ' 
           && board[1][0] !== ' ' && board[1][1] !== ' ' && board[1][2] !== ' ' 
           && board[2][0] !== ' ' && board[2][1] !== ' ' && board[2][2] !== ' '){
        end.winner = 'none';
        console.log(end.winner);
        gameOver = true;
    } else {
        return;
    }
}

const cd = function(){
    mouseCooldown = false;
}

const enemyMove = function(){
    if(gameOver === false && drawPart === 2){
        makeMove(board,nextMove(board,false),false);
    }    
}

canvas.addEventListener('mousedown', function(evt){

    if(evt.offsetX > 0 && evt.offsetX < 200 && drawPart === 2){
        if(evt.offsetY > 0 && evt.offsetY < 200){
            if(mouseCooldown === false){
                if(gameOver === false){
                    makeMove(board,[0,0],true);
                    mouseCooldown = true;
                    setTimeout(enemyMove, 1000);
                    setTimeout(cd, 1000);
                }
            }
        }
        if(evt.offsetY > 200 && evt.offsetY < 400){
            if(mouseCooldown === false){
                if(gameOver === false){
                    makeMove(board,[0,1],true);
                    mouseCooldown = true;
                    setTimeout(enemyMove, 1000);
                    setTimeout(cd, 1000);
                }    
            }
        }
        if(evt.offsetY > 400 && evt.offsetY < 600){
            if(mouseCooldown === false){
                if(gameOver === false){  
                    makeMove(board,[0,2],true);
                    mouseCooldown = true;
                    setTimeout(enemyMove, 1000);
                    setTimeout(cd, 1000);
                }
            }
        }
    }
    if(evt.offsetX > 200 && evt.offsetX < 400 && drawPart === 2){
        if(evt.offsetY > 0 && evt.offsetY < 200){
            if(mouseCooldown === false){
                if(gameOver === false){
                    makeMove(board,[1,0],true);
                    mouseCooldown = true;
                    setTimeout(enemyMove, 1000);
                    setTimeout(cd, 1000);
                }                
            }
        }
        if(evt.offsetY > 200 && evt.offsetY < 400){
            if(mouseCooldown === false){
                if(gameOver === false){
                    makeMove(board,[1,1],true);
                    mouseCooldown = true;
                    setTimeout(enemyMove, 1000);
                    setTimeout(cd, 1000);
                }
            }
        }
        if(evt.offsetY > 400 && evt.offsetY < 600){
            if(mouseCooldown === false){
                if(gameOver === false){
                    makeMove(board,[1,2],true);
                    mouseCooldown = true;
                    setTimeout(enemyMove, 1000);
                    setTimeout(cd, 1000);
                }                
            }
        }
    }
    if(evt.offsetX > 400 && evt.offsetX < 600 && drawPart === 2){
        if(evt.offsetY > 0 && evt.offsetY < 200){
            if(mouseCooldown === false){
                if(gameOver === false){
                    makeMove(board,[2,0],true);
                    mouseCooldown = true;
                    setTimeout(enemyMove, 1000);
                    setTimeout(cd, 1000);
                }                
            }
        }
        if(evt.offsetY > 200 && evt.offsetY < 400){
            if(mouseCooldown === false){
                if(gameOver === false){
                    makeMove(board,[2,1],true);
                    mouseCooldown = true;
                    setTimeout(enemyMove, 1000);
                    setTimeout(cd, 1000);
                }                
            }
        }
        if(evt.offsetY > 400 && evt.offsetY < 600){
            if(mouseCooldown === false){
                if(gameOver === false){
                    makeMove(board,[2,2],true);
                    mouseCooldown = true;
                    setTimeout(enemyMove, 1000);
                    setTimeout(cd, 1000);
                }                
            }
        }
    }
    if(evt.offsetX > 600 && evt.offsetX < 800 && evt.offsetY > 200 && evt.offsetY < 400 && drawPart === 2){
        restartGame();
    }
}, false);