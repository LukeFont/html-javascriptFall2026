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
    y: canvas.height / 2 + 100
};

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



var starCount = 200;
var stars = [];

for(var i = 0; i < starCount; i++) {
    stars[i] = createStar();
    stars[i].x = Math.random() * canvas.width;
    stars[i].y = Math.random() * canvas.height;
    stars[i].radius = Math.random() * 2;
}

var shipSprite
var a = false;
var d = false;
var w = false;
var s = false;

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
});

ctx.fillStyle = 'red';
ctx.fillRect(canvas.width / 2, canvas.height / 2, 25, 25);

//game loop
function game() {
    //clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    startpoint.x += moveDirection.x;
    startpoint.y += moveDirection.y;
    ctx.fillStyle = boxColor;
    ctx.fillRect(startpoint.x, startpoint.y, 25, 25);

    for(var i = 0; i < stars.length; i++){
        stars[i].drawCircle();
    }


    ctx.drawImage(shipSprite.image, shipSprite.x, shipSprite.y, 25, 25);

    if(a == true) {
        shipSprite.x -= 5;
    }

    if(d == true) {
        shipSprite.x += 5;
    }
    if(w == true) {
        shipSprite.y -= 5;
    }

    if(s == true) {
        shipSprite.y += 5;
    }

    if(shipSprite.x < -25) {
        shipSprite.x = canvas.width;
    }
    if(shipSprite.x > canvas.width) {
        shipSprite.x = -25;
    }

    if(shipSprite.y < -25) {
        shipSprite.y = canvas.height;
    }
    if(shipSprite.y > canvas.height) {
        shipSprite.y = -25;
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
}
