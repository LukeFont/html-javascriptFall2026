


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
    y: canvas.height / 2 + 250,
    width: 60,
    height: 90,
    color: 'black' 
}
var acceleration = 1.2;
var friction = .8;

player.moveX = 0;

// Powerup stuff
function createPowerUp() {
    var powerUp = {
        x: 0,
        y: 0,
        radius: 3,
        color: 'white',
        drawCircle() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    return powerUp;
}

var powerUpCooldown = 0;



// What if we put this on a timer? Like, it can only spawn a power up once every [x] seconds
//I'm cool with that. I didn't think about that
// Yea, should be pretty simple too, just reference the uhhhhhhhhhh
// Shoot cooldown code from space game
// For the record I do think a "for" loop is the way to go, just say "for i: if timer = 0, spawn power up"

var storedPowerUp = "none"

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

// Capping car count
var carCooldown = 0;
// var carCount = 8;
var cars = [];

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
        obj.y + 90 > car.y
    ) {
        return true;
    }
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
                timer = 0;
                ctx.clearRect(0, 0, canvas.width, canvas.height)
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

            // create gray canvas background
            ctx.fillStyle = 'gray';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Lane lines
            ctx.fillStyle = 'white';
            ctx.fillRect(100-2.5, 0, 5, canvas.height);
            ctx.fillRect(200-2.5, 0, 5, canvas.height);
            ctx.fillRect(300-2.5, 0, 5, canvas.height);
            ctx.fillRect(400-2.5, 0, 5, canvas.height);

            // Draw stored power up display
            ctx.fillStyle = 'white';
            ctx.font = "30px Arial";
            ctx.fillText(`Power Up: ${storedPowerUp}`, 20, 40);
            ctx.fillStyle = 'black';
            ctx.strokeText(`Power Up: ${storedPowerUp}`, 20, 40);

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
            clearInterval(timer);
            ctx.fillStyle = 'black';
            ctx.font = "30px Arial";
            ctx.fillText("Final Time " + (Math.floor(timer/60)), canvas.width / 2 - (ctx.measureText("Final Time " + (Math.floor(timer/60))).width / 2), canvas.height / 2 - 20);
            
            // Display ways to reach new pages
            ctx.fillText("Press ENTER to try again,", canvas.width/2, canvas.height/2 + 60)
            ctx.fillText("or ESCAPE to go to the menu!", canvas.width/2, canvas.height/2 + 120)
            if (enter) {
                timer = 0;
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                switchScenes("game");
                
            }
            if (escape) {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                switchScenes("title");
            }

            break;
    }
}