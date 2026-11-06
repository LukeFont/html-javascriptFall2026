//alert("Welcome to the Week 4 Lab!");
/*
Allows you to comment multiple lines of code
Week 4 Lab - Expiramenting with canvas animation
*/


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var fps = 1000/60;
var timer = setInterval(game, fps);
var startpoint = {x:canvas.width / 2, y:canvas.height / 2};//canvas.width / 2;
var moveDirection = {x:1, y:1};
var boxColor = 'red';
var shipSprite = {
    image: document.getElementById('ship'),
    x: canvas.width / 2,
    y: canvas.height / 2 + 200
};

shipSprite.moveX = 0;
shipSprite.moveY = 0;

var acceleration = 0.5;
var friction = 0.9;

var score = 100;
var hitCount = 0;
var shotSound = new Audio("audio/button-3.mp3");

function createStar() {
    var star = {
        x:0,
        y:0,
        radius:0,
        color: 'white',
        drawCircle(){
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    return star;
}



var starCount = 100;
var stars = [];

for(var i = 0; i < starCount; i++) {
    stars[i] = createStar();
    stars[i].x = Math.random() * canvas.width;
    stars[i].y = Math.random() * canvas.height;
    stars[i].radius = (Math.random() * 3) + 1;
}



var shipSprite
var a = false;
var d = false;
var w = false;
var s = false;
var space = false;

//variable for bullets
var bullets = [];
var shootCooldown = 0;
var boxCooldown = 0;



document.addEventListener('keydown', function(e) {
    console.log(event.key);
    if (e.key == 'a') {
        a = true;
    }
    if (e.key == 'd') {
        d = true;
    }

    if (e.key == 'w') {
        w = true;
    }
    if (e.key == 's') {
        s = true;
    }
    if (e.code == 'Space') {
        space = true;
        e.preventDefault
    }
});

document.addEventListener('keyup', function(e) {
    console.log(event.key);
    if (e.key == 'a') {
        a = false;
    }
    if (e.key == 'd') {
        d = false;
    }

    if (e.key == 'w') {
        w = false;
    }
    if (e.key == 's') {
        s = false;
    }
    if (e.code == 'Space') {
        space = false;
    }
});

ctx.fillStyle = 'red';
ctx.fillRect(canvas.width / 2, canvas.height / 2, 25, 25);

//game loop
function game() {
    //clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    startpoint.x += moveDirection.x;
    startpoint.y += moveDirection.y;
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var hitBox = shipSprite.x < startpoint.x + 25 &&
                 shipSprite.x + 25 > startpoint.x &&
                 shipSprite.y < startpoint.y + 25 &&
                 shipSprite.y + 25 > startpoint.y;

    if (hitBox == true){
        //colliding with box
        shipSprite.x = canvas.width / 2;
        shipSprite.y = canvas.height / 2 + 200;
        shipSprite.moveX = 0;
        shipSprite.moveY = 0;
        score = 0;
    }

    for(var i = 0; i < stars.length; i++){
        var hitBox = shipSprite.x < stars[i].x + 25 &&
                 shipSprite.x + 25 > stars[i].x &&
                 shipSprite.y < stars[i].y + 25 &&
                 shipSprite.y + 25 > stars[i].y;

        //colliding with star
        if (shipToStarCollision(shipSprite, stars[i])) {
            shipSprite.x = canvas.width / 2;
            shipSprite.y = canvas.height / 2 + 200;
            shipSprite.moveX = 0;
            shipSprite.moveY = 0;
            score = 0;
        }

        stars[i].drawCircle();
        stars[i].y++;
        if (stars[i].y > canvas.height + stars[i].radius * 2) {
            stars[i].x = Math.random() * canvas.width;
            stars[i].y = -(Math.random() * canvas.height);
            score += 10;
        }
    }

    
    //multiply friction to slow down the ship sprite movement
    shipSprite.moveX *= friction;
    shipSprite.moveY *= friction;

    //update the X and Y position of the ship sprite based on the key presses
    shipSprite.x += shipSprite.moveX;
    shipSprite.y += shipSprite.moveY;

    

    

    if(a == true) {
        shipSprite.x -= 1;
        shipSprite.moveX -= acceleration;
    }

    if(d == true) {
        shipSprite.x += 1;
        shipSprite.moveX += acceleration;

    }
    if(w == true) {
        shipSprite.y -= 1;
        shipSprite.moveY -= acceleration;
    }

    if(s == true) {
        shipSprite.y += 1;
        shipSprite.moveY += acceleration;
    }

    if(shipSprite.x < 0) {
        shipSprite.x = 0;
    }
    if(shipSprite.x > canvas.width - 25) {
        shipSprite.x = canvas.width - 25;
    }

    if(shipSprite.y < 0) {
        shipSprite.y = 0;
    }

    //if you want the sprite to wrap around the screen, uncomment the following code
    if(shipSprite.y > canvas.height - 25) {
        shipSprite.y = canvas.height - 25;
    }
    // if(shipSprite.y > canvas.height) {
    //     shipSprite.y = -25;
    // }

    //bullet firing code
    if (shootCooldown > 0) {
        shootCooldown--;
    }

    if (boxCooldown > 0) {
        boxCooldown--;
    }

    if (boxCooldown == 1) {
            startpoint.x = Math.random() * canvas.width;
            startpoint.y = Math.random() * canvas.height;
            moveDirection.x = Math.random() < 0.5 ? -1 : 1;
            moveDirection.y = Math.random() < 0.5 ? -1 : 1;
            boxColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    }

    


    if (space && shootCooldown === 0) {
        
        bullets.push({
            x: shipSprite.x + 25 / 2 - 2, // center the bullet on the ship
            y: shipSprite.y - 10, // position the bullet above the ship
            width: 4,
            height:10,
            speed:8,
            color: 'white'
        });
        shootCooldown = 20; // cooldown period before the next shot
        shotSound.play(); // play the shooting sound
        
    }

    if (startpoint.y > canvas.height - 25 || startpoint.y < 0) {
        //startpoint.y = -25;
        moveDirection.y *= -1;
        boxColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    }

    if (startpoint.x > canvas.width - 25 || startpoint.x < 0) {
        
        moveDirection.x *= -1;
        boxColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    }

    ctx.fillStyle = boxColor;
    ctx.fillRect(startpoint.x, startpoint.y, 25, 25);
    
    for (var i = bullets.length - 1; i >= 0; i--) {
        bullet = bullets[i];
        bullet.y -= bullet.speed;

        //check for bullets that leave the screen
        if (bullet.y + bullet.height < 0) {
            bullets.splice(i, 1); //remove the bullet from the array
            continue; //skip the rest of the loop for this bullet
        }
        var hitBox = bullet.x < startpoint.x + 25 &&
                     bullet.x + bullet.width > startpoint.x &&
                     bullet.y < startpoint.y + 25 &&
                     bullet.y + bullet.height > startpoint.y;

        if (hitBox){
            bullets.splice(i, 1); //remove the bullet from the array

            //make box disappear for 3 seconds and then reappear at a random location
            startpoint.x = 10000
           
           
            // randomly 1 or -1 for x and y direction with random color
            moveDirection.x = 0;
            moveDirection.y = 0;
            boxCooldown = 180; // 3 seconds at 60 fps
            hitCount++;
            
            continue;
        }
        for (var j = 0; j < stars.length; j++) {
            if (shipToStarCollision(bullet, stars[j])) {
                bullets.splice(i, 1); //remove the bullet from the array
                stars[j].x = Math.random() * canvas.width;
                stars[j].y = -(Math.random() * canvas.height);
                hitCount++;
                continue;
            }
        }

        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }


    

    ctx.drawImage(shipSprite.image, shipSprite.x, shipSprite.y, 25, 25);

    //draw hud element
    ctx.fillStyle = 'white';
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score}`, 10, 80);

    ctx.fillStyle = 'red';
    ctx.font = "30px Arial";
    ctx.fillText(`Hit Count: ${hitCount}`, 500, 80);

    

    
}

function shipToStarCollision(obj, star) {
    var closestX = Math.max(obj.x, Math.min(star.x, obj.x + obj.width));
    var closestY = Math.max(obj.y, Math.min(star.y, obj.y + obj.height));

    var dx = star.x - closestX;
    var dy = star.y - closestY;
    
    var dist = dx * dx + dy * dy;
    return dist <= (star.radius * star.radius);
}
