// Enemies our player must avoid
var Enemy = function(Ypos) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.width = 50.5;
    this.height = 85.5;
    this.x = 0; 
    this.y = Ypos;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.y === 71) {
        this.x += 150 * dt;
    }
    if (this.y === 142){
        this.x += 125 * dt;
    }
    if (this.y === 243) {
        this.x += 100 * dt;
    }
    this.resetPoint();
};

Enemy.prototype.resetPoint = function(){
    if (this.x > 505) {
        this.x = 0
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.width = 50.5;
    this.height = 85.5;
    this.x = defaultPx;
    this.y = defaultPy;
}

Player.prototype.update = function(){

}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key){
    switch (key){
        case 'up':
            this.y -= 83;
            break;
        case 'down':
            this.y += 83;
            break;
        case 'left':
            this.x -= 101;
            break;
        case 'right':
            this.x += 101;
            break;
    }
    console.log(this.x + this.width, this.y + this.height);
    checkCollisions()
    this.resetPoint()
}

Player.prototype.resetPoint = function(){
    if (this.x < -2 || this.x > 402) {
        this.x = defaultPx;
        this.y = defaultPy;
    }
    if(this.y === -15){
        this.x = defaultPx;
        this.y = defaultPy;
        console.log("Ganaste!!");
    }
}

function checkCollisions(){
    allEnemies.forEach(element => {
        if (player.x < element.x + element.width && player.x + player.width > element.x && player.y < element.y + element.height && player.y + player.height > element.y) {
            console.log("Crashing!")
            player.x =defaultPx;
            player.y = defaultPy;
        }
    });
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Enemy1 = new Enemy(71), Enemy2 = new Enemy(142), Enemy3 = new Enemy(243);
var allEnemies = [Enemy1, Enemy2, Enemy3];
var defaultPx = 200, defaultPy = 400, player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
