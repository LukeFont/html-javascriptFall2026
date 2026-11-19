


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var fps = 1000 / 60;
var timer = setInterval(game, fps);
var funcTimer = 0;

var states = ["title", "game", "gameover"];
var states = "title";

// Switch scenes function
function switchScenes(nameOfScene){
        states = nameOfScene;
}

//player stuff
var player = {
    x: canvas.width / 2,
    y: canvas.height / 2 + 200,
    width: 60,
    height: 90,
    color: 'black' 
}
var acceleration = 1.2;
var friction = .8;

player.moveX = 0;

//creates rectangles as the cars
function createCar() {
    var car = {
        x: 0,
        y: Math.random()*canvas.height,
        width: 60,
        height: 90,
        color: 'white',
        drawRect() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    return car;
}

//random color of red, green, blue, yellow
var possibleColors = ["red","green","blue","yellow"];
function getRandomColor() {
    randomIndex = Math.floor(Math.random() * possibleColors.length);
    return possibleColors[randomIndex];
};

// Capping car count
var carCount = 8;
var cars = [];

// Car spawner loop
for (var i = 0; i < carCount; i++) {
    cars[i] = createCar();
    cars[i].x = Math.floor(Math.random() * 5)*100 + 20;
    cars[i].color = getRandomColor();
};


// Actual game
function game() {
    //clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch(states) {
        case "title":
            //title screen code
            ctx.fillStyle = 'black';
            ctx.font = "50px Arial";
            let titleText = "Traffic Dodger";
            ctx.fillText(titleText, canvas.width / 2 - (ctx.measureText(titleText).width / 2), canvas.height / 2 - 20);
            ctx.font = "20px Arial";
            ctx.fillText("Press ENTER to Start", canvas.width / 2 - (ctx.measureText("Press ENTER to Start").width / 2), canvas.height / 2 + 60);

            if (enter) {
                timer = 0;
                switchScenes("game");
            }
            break;
            
        case "game":
            //game code
            //start timer
            funcTimer++

            //create gray canvas background
            ctx.fillStyle = 'gray';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Lane lines
            ctx.fillStyle = 'white';
            ctx.fillRect(100, 0, 5, canvas.height)
            ctx.fillRect(200, 0, 5, canvas.height)
            ctx.fillRect(300, 0, 5, canvas.height)
            ctx.fillRect(400, 0, 5, canvas.height)

            //spawn player
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x, player.y, player.width, player.height);

            for (var i = 0; i < cars.length; i++){
                cars[i].drawRect();
                cars[i].y += 4;
                // To be edited
                if (cars[i].y > canvas.height + 50) {
                    cars[i].x = Math.floor(Math.random() * 5)*100 + 20;
                    cars[i].y = 10);
                }
            }

            // Player movement
                // friction
                player.moveX *= friction

                // something
                player.x += player.moveX
            
            // actual movement
            if(a){
                player.x -= 1;
                player.moveX -= acceleration

            }
            if(d){
                player.x += 1;
                player.moveX += acceleration
            }

            if (player.x < 0) {
                player.x = 0
            }
            if (player.x > canvas.width - player.width) {
                player.x = canvas.width - player.width
            }

            // Draw timer
            console.log(player.x)


            break;
        case "gameover":
            //game over code
            //stop timer and display final time
            clearInterval(timer);
            ctx.fillStyle = 'black';
            ctx.font = "30px Arial";
            ctx.fillText("Final Time " + timer, canvas.width / 2 - (ctx.measureText("Final Time " + timer).width / 2), canvas.height / 2 - 20);
            
            break;
    }
}