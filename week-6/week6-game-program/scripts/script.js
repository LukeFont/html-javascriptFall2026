const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var fps = 1000 / 60;
var timer = setInterval(game, fps);
var funcTimer = setInterval(calculateTimer, 1000);
var seconds = 0;

function calculateTimer(){
    if(states == "game"){
        seconds += 1;
        console.log(seconds)
    }
}

var collisionCooldown = 0;

var states = ["title", "game", "gameover"];
var states = "title";

// Switch scenes function
function switchScenes(nameOfScene){
        states = nameOfScene;
}

//player stuff
var player = {
    x: canvas.width / 2,
    y: canvas.height / 2 + 250,
    width: 60,
    height: 90,
    color: 'black' 
}
var acceleration = 1.2;
var friction = .8;

player.moveX = 0;

// Powerup stuff
// function createPowerUp() {
//     var powerUp = {
//         x: 0,
//         y: 0,
//         radius: 3,
//         color: 'white',
//         drawCircle() {
//             ctx.beginPath();
//             ctx.fillStyle = this.color;
//             ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
//             ctx.fill();
//         }
//     }
//     return powerUp;
// }

var powerUpCooldown = 0;

var storedPowerUp = "None"
var storedPowerUpColor = 'white';

var powerUpDuration = 0;

//creates rectangles as the cars
// function createCar() {
//     var car = {
//         x: 0,
//         y: Math.random()*(-(canvas.height)),
//         width: 60,
//         height: 90,
//         color: 'white',
//         drawRect() {
//             ctx.fillStyle = this.color;
//             ctx.fillRect(this.x, this.y, this.width, this.height);
//         }
//     }
//     return car;
// }

//random color of red, green, blue, yellow
var possibleColors = ["red","green","blue","yellow"];
function getRandomColor() {
    randomIndex = Math.floor(Math.random() * possibleColors.length);
    return possibleColors[randomIndex];
};

var carCooldown = 0;
var cars = [];

var powerUps = [];

// Car spawner loop
// for (var i = 0; i < carCount; i++) {
//     cars[i] = createCar();
//     cars[i].x = Math.floor(Math.random() * 5)*100 + 20;
//     cars[i].color = getRandomColor();
// };

//function that checks object collisions
function playerCollision(obj, car) {
    if (obj.x < car.x + 60 &&
        obj.x + 60 > car.x &&
        obj.y < car.y + 90 &&
        obj.y + 90 > car.y &&
        obj.color != car.color
    ) {
        return true;
    }
}

//function for player colliding with powerups
function playerToPowerUpCollision(obj, powerUp) {
    var closestX = Math.max(obj.x, Math.min(powerUp.x, obj.x + obj.width));
    var closestY = Math.max(obj.y, Math.min(powerUp.y, obj.y + obj.height));

    var dx = powerUp.x - closestX;
    var dy = powerUp.y - closestY;
    
    var dist = dx * dx + dy * dy;
    return dist <= (powerUp.radius * powerUp.radius);
}



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
                seconds = 0;
                switchScenes("game");
            }
            break;
            
        case "game":
            // game code

            //clear the screen
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // timer incrementer
            funcTimer++



            if (carCooldown > 0) {
                carCooldown--
            }

            if (powerUpCooldown > 0) {
                powerUpCooldown --
            }

            if (powerUpDuration > 0) {
                powerUpDuration--
            }

            // create gray canvas background
            ctx.fillStyle = 'gray';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Lane lines
            ctx.fillStyle = 'white';
            ctx.fillRect(100-2.5, 0, 5, canvas.height);
            ctx.fillRect(200-2.5, 0, 5, canvas.height);
            ctx.fillRect(300-2.5, 0, 5, canvas.height);
            ctx.fillRect(400-2.5, 0, 5, canvas.height);

            
            // spawn player
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x, player.y, player.width, player.height);
            
            // for (var i = 0; i < cars.length; i++){
            //     cars[i].drawRect();
            //     cars[i].y += 4;
            //     if (cars[i].y > canvas.height + 50) {
                //         cars[i].x = Math.floor(Math.random() * 5)*100 + 20;
                //         cars[i].y = -100
                //     }
                // }
                
                if (carCooldown === 0) {
                    cars.push({
                        x: Math.floor(Math.random() * 5)*100 + 20,
                        y: -100,
                        width: 60,
                        height: 90,
                        color: getRandomColor(),
                        speed: 4,
                });
                carCooldown = 30;
            }

            for (var i = cars.length - 1; i >= 0; i--) {
                car = cars[i];
                car.y += car.speed;
                
                if (car.y > canvas.height) {
                    cars.splice(i, 1); //remove the car from the array
                    continue;
                }
                ctx.fillStyle = car.color;
                ctx.fillRect(car.x, car.y, car.width, car.height);
                
            }
            
            //check for player car collision
            for (var j = 0; j < cars.length; j++) {
                if (playerCollision(player, cars[j])) {
                    switchScenes("gameover")
                }
            }
            
            //checks for player colliding with powerup
            for (var m = 0; m < powerUps.length; m++) {
                if (playerToPowerUpCollision(player, powerUps[m])) {
                    storedPowerUp = powerUp.color;
                    storedPowerUpColor = powerUp.color;
                    powerUps.splice(m, 1);
                    continue;
                }
                
            }

            //creates car objects
            if (powerUpCooldown === 0) {
                powerUps.push({
                    x: Math.floor(Math.random() * 5)*100 + 50,
                    y: -100,
                    radius: 20,
                    color: getRandomColor(),
                    speed: 4,
                });
                powerUpCooldown = 420;
            }
            
            //spawns car above screen
            for (var k = powerUps.length - 1; k >= 0; k--) {
                powerUp = powerUps[k];
                powerUp.y += powerUp.speed;
                
                if (powerUp.y > canvas.height) {
                    powerUps.splice(k, 1);
                    continue;
                }
                if (playerToPowerUpCollision(car, powerUps[k])) {
                    powerUps.splice(k, 1);
                    continue;
                }
                
                ctx.beginPath();
                ctx.fillStyle = powerUp.color;
                ctx.arc(powerUp.x, powerUp.y, powerUp.radius, 0, 2 * Math.PI);
                ctx.fill();
            }
            
            if (space && storedPowerUp != 'none') {
                player.color = storedPowerUp;
                storedPowerUp = "none";
                storedPowerUpColor = 'white';
                powerUpDuration = 180;
            }

            if(powerUpDuration === 0){
                player.color = 'black';
            }

            // Draw stored power up display
            ctx.fillStyle = storedPowerUpColor;
            ctx.font = "30px Arial";
            ctx.fillText(`Power Up: ${storedPowerUp}`, 20, 40);
            ctx.fillStyle = 'black';
            ctx.strokeText(`Power Up: ${storedPowerUp}`, 20, 40);

            // Draw updating timer under power up display
                // Code here later

            // Player movement
            player.moveX *= friction
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

            break;
        case "gameover":
            //game over code
            //stop timer and display final time
            ctx.fillStyle = 'black';
            ctx.font = "30px Arial";
            ctx.fillText("Final Time: " + seconds + " sec", canvas.width / 2 - (ctx.measureText("Final Time: " + seconds + " sec").width / 2), canvas.height / 2 - 20);
            
            // Reset car placement
            for (i = 0; i < cars.length; i++) {
                cars[i].y = 20000;
            }

            // Reset powerup placement
            for (j = 0; j < powerUps.length; j++) {
                powerUps[j].y = 20000;
            }
           
            // Display ways to reach new pages
            var restartLine1 = "Press ENTER to try again,"
            var restartLine2 = "or ESCAPE to go to the menu!"
            ctx.fillText(restartLine1, canvas.width/2 - (ctx.measureText(restartLine1).width / 2), canvas.height/2 + 60)
            ctx.fillText(restartLine2, canvas.width/2 - (ctx.measureText(restartLine2).width / 2), canvas.height/2 + 120)
            if (enter) {
                seconds = 0;
                storedPowerUp = "none"
                player.color = 'black';
                storedPowerUpColor = 'white';
                switchScenes("game");
                
            }
            if (escape) {
                seconds = 0;
                storedPowerUp = "none"
                player.color = 'black';
                storedPowerUpColor = 'white';
                switchScenes("title");
            }

            break;
    }
}

//test functionality of random car speeds
// Add pseudo code to this file before turning in - IMPORTANT
//try to get lane lines to be dotted and moving down the screen