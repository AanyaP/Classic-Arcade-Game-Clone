/*
 * Project 3 : Classic Arcade Game Clone
 * Front-end Web Developer
 * 10/28/2015
 * Author - Aanya
 */

 'use strict';
 
// Gets random number between 1 to 3
// function used to randomize enemy speed and position.

var getRandomPosition = function() {
		var number = Math.floor((Math.random() * 3) + 1);
		return number;
};

// Enemies our player must avoid
var Enemy = function() {

    this.sprite = 'images/enemy-bug.png';
	this.x = 0;
	this.y = (getRandomPosition())*70;
	this.speed = (getRandomPosition())*150;
	
};

// Update the enemy's position/
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // multiplying any movement by the dt parameter
    // ensures the game runs at the same speed for
    // all computers.
	if(this.x >= 505)
	{
			this.x = 0;
			this.y = (getRandomPosition())*70;
	}
	this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
	this.x = 200;
	this.y = 410;
	this.speed = 20;
	this.win = 0;
	this.life = 5;
	this.game = true;
};
// instantiating objects.
// All enemy objects are placed in an array called allEnemies
// player object is placed in a variable called player

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player();

// default player position for game
Player.prototype.reset = function() {
		this.x = 200;
		this.y = 410;
};

// resets the game once all lives are used up
Player.prototype.gameReset = function() {
		this.life = 5;
		this.win = 0;
		this.game = true;
		this.reset();
};

//when player wins, updates player score by incrementing score by 1
Player.prototype.score_win = function() {
	this.win += 1;
	alert('YOU WIN');
	this.reset();
};

//when player loses, updates player score and life by decrementing score by 1
Player.prototype.score_lost = function() {
	this.win -= 1;
	this.life -= 1;
};

Player.prototype.checkCollisions = function(){
	var len = 	 allEnemies.length;
		 for (var i = 0; i < len; i++) {
        if ((allEnemies[i].x) <= this.x + 30 &&
            (allEnemies[i].x + 30) >= (this.x) &&
            (allEnemies[i].y)<= this.y + 30 &&
            (allEnemies[i].y + 30) >= (this.y)) {
					this.score_lost();
					alert('YOU LOSE');
					this.reset();
        }
    }

};

Player.prototype.checkBorder_for_winner = function(){
	if (this.y <=10)
	{
				this.score_win();
	}
};

Player.prototype.checkBorder = function(){
	if (this.x <= 0 || this.x >= 420 || this.y <=0 || this.y >=430)
	{
			this.reset();
	}
};
// updates player

Player.prototype.update = function() {
	this.checkCollisions();
	this.checkBorder();
	this.checkBorder_for_winner();
	// player.game is true only when player has lives
	// so game over needs to be checked only when player has lives
	// once game is over game is resetted
	if (this.game == true)
	{
		this.checkGameOver();
	}
	if(this.y <= 5)
	{
		this.reset();
		this.score()
			
	}
};

// checks if player has any lives left
Player.prototype.checkGameOver = function(){
	if (this.life == 0)
		{
				alert('Game Over!!!');
				this.game = false;
				this.gameReset();
		}
		
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(action_p) {
		if(action_p == 'left')
		{
				this.x -= this.speed;
		}
		if(action_p == 'right')
		{
				this.x += this.speed;
		}
		
		if(action_p == 'up')
		{
				this.y -= this.speed;
		}
		if(action_p == 'down')
		{
				this.y += this.speed;
		}
		
}

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

