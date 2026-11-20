// Controls

// Control vars
var a = false;
var d = false;
var space = false;
var enter = false;
var escape = false;

/*
Controls:
A - move left
D - move right
Enter - Confirm
Escape - Back to menu (game over screen)
*/

// Listens for keypresses
document.addEventListener('keydown', function (e) {
    console.log(event.key);
    if (e.key == 'a') {
        a = true;
    }
    if (e.key == 'd') {
        d = true;
    }
    if (e.key == 'Enter') {
        enter = true;
    }
    if (e.key == 'Escape') {
        escape = true;
    }
    if (e.code == 'Space') {
        space = true;
        e.preventDefault
    }
});

// Listens for key releases
document.addEventListener('keyup', function (e) {
    console.log(event.key);
    if (e.key == 'a') {
        a = false;
    }
    if (e.key == 'd') {
        d = false;
    }
    if (e.key == 'Enter') {
        enter = false;
    }
    if (e.key == 'Escape'){
        escape = false;
    }
    if (e.key == 'Spacebar'){
        space = false;
    }
    if (e.code == 'Space') {
        space = false;
    }
});
