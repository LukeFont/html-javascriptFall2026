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
ctx.moveTo(85, 684);
ctx.lineTo(279, 549);
ctx.strokeStyle = 'rgb(255,0,0)';
ctx.lineWidth = 5;
ctx.stroke();

//circle #ffff00 with red line 5px
ctx.fillStyle = '#ffff00';
ctx.beginPath();
ctx.arc(386, 442, 65, 0, Math.PI * 2);
ctx.fill();
ctx.strokeStyle = 'rgb(255,0,0)';
ctx.lineWidth = 5;
ctx.stroke();

//pentagon #ff00ff fill with #00ffff 5px stroke
ctx.beginPath();
ctx.moveTo(558, 309);
ctx.lineTo(668, 284);
ctx.lineTo(725, 380);
ctx.lineTo(650, 464);
ctx.lineTo(548, 420);
ctx.closePath();
ctx.fillStyle = '#ff00ff';
ctx.fill();
ctx.strokeStyle = '#00ffff';
ctx.lineWidth = 5;
ctx.stroke();

//star #ffff00 fill and rgb(32,32,32) 5px stroke
ctx.beginPath();
ctx.moveTo(636, 496);
ctx.lineTo(668, 554);
ctx.lineTo(734, 568);
ctx.lineTo(688, 615);
ctx.lineTo(696, 682);
ctx.lineTo(636, 653);
ctx.lineTo(576, 682);
ctx.lineTo(583, 616);
ctx.lineTo(538, 567);
ctx.lineTo(604, 554);
ctx.closePath();
ctx.fillStyle = '#ffff00';
ctx.fill();
ctx.strokeStyle = 'rgb(32,32,32)';
ctx.lineWidth = 5;
ctx.stroke();