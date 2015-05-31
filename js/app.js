// a base class called Pawn
var Pawn = function(col, col_w, row, row_h, r_sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = r_sprite;
    this.col    = col;
    this.row    = row;
    this.col_w  = col_w;
    this.row_h  = row_h;
    this.x      = this.col * this.col_w;
    this.y      = this.row * this.row_h;
};

Pawn.prototype = {
    update: function(dt) {
        // update the position of a pawn; this method should be overridden
    },
    render: function() {
        // Draw the enemy on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


// Enemy is one of the children classes
var Enemy = function(col, col_w, row, row_h, r_sprite, speed) {
    Pawn.call(this, col, col_w, row, row_h, r_sprite);
    this.speed = speed;
};

Enemy.prototype = Object.create(Pawn.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update      = function(dt) {
    var distance = this.col_w * this.speed * dt;
    this.x   = (this.x + distance) % 505;
    this.col = Math.floor(this.x / this.col_w);
};
Enemy.prototype.reset       = function() {
    this.col = 0;
};

// Player class is another child class
// This class requires an update(), render() and a handleInput() method.
var Player = function(col, col_w, row, row_h, r_sprite) {
    Pawn.call(this, col, col_w, row, row_h, r_sprite);
};

Player.prototype = Object.create(Pawn.prototype);
Player.prototype.constructor = Player;
Player.prototype.update      = function() {
    // updating position of player
    this.x      = this.col * this.col_w;
    this.y      = this.row * this.row_h;
};
Player.prototype.handleInput = function(keyMove) {
    switch (keyMove)
    {
        case "left":
            this.col = (this.col > 0) ? (this.col - 1) : this.col;
            break;
        case "up":
            this.row = (this.row > 0) ? (this.row - 1) : this.row;
            break;
        case "right":
            this.col = (this.col < 4) ? (this.col + 1) : this.col;
            break;
        case "down":
            this.row = (this.row < 5) ? (this.row + 1) : this.row;
            break;
        default:
            console.log("Unrecognized key entered ...");
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Initializing enemies and player is done in game engine reset()
var allEnemies, player;

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
