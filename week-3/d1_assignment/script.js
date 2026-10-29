const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//yellow square with black line 5px
ctx.fillStyle = 'yellow';
ctx.fillRect(85, 301, 100, 100);
ctx.strokeStyle = 'black';
ctx.lineWidth = 5;
ctx.strokeRect(85, 301, 100, 100);

//line no fill with stroke rgb(255,0,0)
ctx.beginPath();
ctx.moveTo(85, 301);
ctx.lineTo(279, 549);
ctx.strokeStyle = 'rgb(255,0,0)';
ctx.lineWidth = 5;
ctx.stroke();

//circle #ffff00 with red line 5px

//pentagon #ff00ff fill with #00ffff 5px stroke

//star #ffff00 fill and rgb(32,32,32) 5px stroke