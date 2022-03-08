"use strict";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
//получаем изображение карты игры
const map = new Image();
map.src = "./map.png";

//получаем изоражение еды - яблочко
const foodImg = new Image();
foodImg.src = "./food.png";


const cell_size = 32;
let score = 0;
let  speed_time = 75;
// координаты яблочка
let food = {
    x:Math.floor((Math.random() * 17 + 1)) * cell_size,
    y:Math.floor((Math.random() * 15 + 3)) * cell_size,
};
let snake = [];
snake[0] = {
    x:10 * cell_size,
    y:10 * cell_size,
}

document.addEventListener("keydown", moveSnake);
    
let dir;

function eatT(head, arr) {
    for(let i = 0; i < arr.length; i ++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            
        }
    }
}
//механика движения змейки
function moveSnake(event) {
    if (event.keyCode == 37 && dir != "right")
        dir = "left";
    else if (event.keyCode == 38 && dir != "down")
        dir = "up";
    else if (event.keyCode == 39 && dir != "left")
        dir = "right";
    else if (event.keyCode == 40 && dir != "up")
        dir = "down";
}

function drawGame(){
    ctx.drawImage(map, 0, 0);
    ctx.drawImage(foodImg,  food.x, food.y )
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = i == 0 ? "red" : "black";
        ctx.fillRect(snake[i].x, snake[i].y, cell_size, cell_size);
    }
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, cell_size * 2.5, cell_size* 1.5);
    let snake_x = snake[0].x;
    let snake_y = snake[0].y;

    if (dir == "left") snake_x -= cell_size;
    if (dir == "right") snake_x += cell_size;
    if (dir == "up") snake_y -= cell_size;
    if (dir == "down") snake_y += cell_size;
    // кушаем яблоко - змейка растет
    if (snake_x == food.x && snake_y == food.y){
        score ++;
        food = {
            x:Math.floor((Math.random() * 17 + 1)) * cell_size,
            y:Math.floor((Math.random() * 15 + 3)) * cell_size,
        };

    }
    else {
        snake.pop();
    }

    if (snake_x  < cell_size || snake_x > cell_size * 17
        || snake_y < 3  * cell_size || snake_y > cell_size * 17)
        {
            clearInterval(game);
        }

    let newHead = {
        x:snake_x,
        y:snake_y,
    };
    eatT(newHead, snake);
    snake.unshift(newHead);
    
}

let game = setInterval(drawGame, speed_time);  

const http = require('http')
