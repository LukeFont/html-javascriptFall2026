


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var fps = 1000 / 60;
var timer = setInterval(game, fps);

var states = ["title", "game", "gameover"];
var states = "title";

var car = {
    x: 0,
    y: 0,
    color: "black",
}



var a = false;
var d = false;


function game() {
    switch(states) {
        case "title":
            //title screen code
            //clear the screen
            ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            if (timer === 0) {
                timer = setInterval(game, fps);
            }
            //create gray canvas background
            ctx.fillStyle = 'gray';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            break;
        case "gameover":
            //game over code
            //stop timer and display final time
            clearInterval(timer);
            timer = 0;
            ctx.fillStyle = 'black';
            ctx.font = "30px Arial";
            ctx.fillText("Final Time " + timer, canvas.width / 2 - (ctx.measureText("Final Time " + timer).width / 2), canvas.height / 2 - 20);
            
            break;
    }
}