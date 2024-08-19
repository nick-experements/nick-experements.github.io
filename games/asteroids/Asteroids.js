var soundB = new Audio("Sound/backgroundMusic.mp3")
soundB.autoplay = true
// soundB.play()
function checkSoundBePlaing(){
    if(soundB.autoplay){

        soundB.play()
    }
}
function stopBackgroundSound (){
    soundB.pause()
    soundB.autoplay = false
}
function playGameOverSound (){
    var soundG = new Audio("Sound/GameOver1.mp3");
    soundG.play();
}

$('body').click(checkSoundBePlaing)
$('body').keydown(checkSoundBePlaing)
    
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var intervalId;
var directionW = 'right'
var circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    } };
const width = canvas.width;
const height = canvas.height;
const blockSize = 10;
var score = 0;
function drawBorder(){
    ctx.strokeStyle = '#59d0e2';
    ctx.lineWidth = blockSize;
    ctx.strokeRect(0, 0, width, height)
}
function drawScore(){
    ctx.font = '30px Courier'
    ctx.fillStyle = 'white '
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText('Score: ' + String(score), blockSize, blockSize)
}
function gameOver(){
    clearTimeout(intervalId)
    intervalId = null   

    ctx.font = '60px Courier'
    ctx.fillStyle = 'Black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Game Over', width/2, height/2)

    stopBackgroundSound ()
    playGameOverSound ()
}





var Defender = function () {
    this.x = width/2;
    this.y = height/1.05
    this.speed = 10
}

Defender.prototype.draw = function (){
    var x = this.x
    var y = this.y
    ctx.fillStyle = 'white'
    ctx.fillRect(x  - blockSize*1.5, y, blockSize*3, blockSize)
    ctx.fillRect(x - blockSize*0.5, y-blockSize, blockSize, blockSize)

        
}
    
var direction;
    
    
Defender.prototype.move = function(){
    if(directionW === 'right'){
        direction = 1
    } else if(directionW === 'left'){
        direction = -1
    }
        
    this.x += this.speed*direction;
    if(this.x +blockSize*1.5 >= width){
        directionW = 'left'
    } else if (this.x - blockSize*1.5 <= 0){
        directionW = 'right'
    }
}

var bullets = []


function Bullet (x, y){
    this.x = x
    this.y = y
    this.speed = 10
    this.width = 7
    this.height = blockSize
}


Bullet.prototype.draw = function (){
    var x = this.x
    var y = this.y
    var widthB = this.width
    var heightB = this.height
    ctx.fillStyle = 'white'
    ctx.fillRect(x - widthB*0.5, y - blockSize - heightB, widthB, heightB)

        
}
    
Bullet.prototype.move = function(){

    this.y -= this.speed;
            
}

var asteroids = []
        
function Asteroid (x, y, radius) {
    this.x = x//Math.floor(Math.random()*width);
    this.y = y//height + 10;
    this.radius = radius//Math.floor(Math.random()*blockSize*3+1);
    this.speed = 3;
}

Asteroid.prototype.draw = function(){
    var x = this.x
    var y = this.y
    var radius = this.radius

    circle(x, y, radius, true)
}

Asteroid.prototype.move = function(){
    this.y += this.getSpeed()

}
Asteroid.prototype.intersection = function(x, y){
    const diffX = x - this.x
    const diffY = y - this.y
    return Math.sqrt(diffX**2 + diffY**2 ) <= this.radius
}
Asteroid.prototype.overflowY = function(height){
    return this.y + this.radius >= height
}

Asteroid.prototype.getSpeed = function(){
    return 1/this.radius * 30
}
    
var chance = 0.01;
        

var directionsD = { 
    37: 'left',
    39: 'right',
};
var directionsB = {
    32: 'space'
}
        

        
var lastBulletTime = 0
$("body").keydown(function (event) {
    directionW = directionsD[event.keyCode];
    if (directionsB[event.keyCode] === 'space' && lastBulletTime - Date.now() <=-300){
        bullets.push(new Bullet(defender.x, defender.y)) 
        lastBulletTime = Date.now()
    }
});
var defender = new Defender()
intervalId = setInterval(function(){
            
    ctx.clearRect(0, 0, width, height)
    if (Math.random() <=chance){
        asteroids.push(new Asteroid (Math.random()*(width-3*blockSize)+1.5*blockSize, 10,blockSize*(1+Math.random()*2)))
    }
    for(var i = 0; i < asteroids.length; i ++){
        ctx.fillStyle = 'Gray'
        asteroids[i].draw()
        asteroids[i].move()
    }
    for(let i = 0; i < asteroids.length; i ++){
        if(asteroids[i].overflowY(height)){
            gameOver()
        }
    }
        
    for(var bulletIndex = 0; bulletIndex < bullets.length; bulletIndex++){
        var bullet = bullets[bulletIndex]
        bullet.draw()
        bullet.move()
        for(let i = 0; i < asteroids.length && bullet; i++){
            if(asteroids[i].intersection(bullet.x, bullet.y)){
                bullets.splice(bulletIndex, 1)
                bullet = null
                if(asteroids[i].radius >= 2*blockSize){
                    asteroids[i].radius -= blockSize
                }else{
                    asteroids.splice(i, 1)
                    score++
                    chance += 0.001

                }
                        
                        
            }
        }
                
        if(bullet&&bullet.y <= 0 ){
            bullets.splice(bulletIndex, 1)
        }
    }

            
    drawScore()
    defender.move()
    defender.draw()
    drawBorder();
}, 30)


