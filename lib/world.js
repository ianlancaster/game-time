var Player = require('./player');
var Obstacle = require('./obstacle');

function World(height, width, canvas) {
  this.canvas = canvas;
  this.height = height || 500;
  this.width = width || 700;
  this.playerImage = new Image();
  this.playerImage.src = './lib/imgs/googlyfish.png';
  this.mushroomImage = new Image();
  this.mushroomImage.src = './lib/imgs/mushroom.png';
  this.rockTexture = new Image();
  this.rockTexture.src = './lib/imgs/rocktexture-sm.png';
  this.waterTexture = new Image();
  this.waterTexture.src = './lib/imgs/water.png';
  this.playerFish = new Player(this.canvas,null,null,null,null,"image", this.playerImage);//Player(canvas, x, y, height, width, type, image)
  this.playerHitBoxes = [];
  this.ceiling = [];
  this.floor = [];
  this.rocks = [];
  this.powerUps = [];
  this.mushrooms = [];

  this.initHitBoxes = function(){
    this.playerHitBoxes[0] = new Player(this.canvas, 185, 265, 15, 90, "box");
    this.playerHitBoxes[1] = new Player(this.canvas, 200, 255, 20, 65, "box");
    this.playerHitBoxes[2] = new Player(this.canvas, 210, 265, 20, 50, "box");
  };

  this.obstacleWidth = 20;
  this.numberOfWallSections = Math.floor(this.width/this.obstacleWidth + 3);

  this.initObstacles = function(speed){
    for(var i = 0; i < this.numberOfWallSections; i++){
      this.ceiling.push(new Obstacle(this.canvas, this.playerHitBoxes, i*this.obstacleWidth, 0, 20, this.obstacleWidth, speed, 'walls',this.rockTexture));
      this.floor.push(new Obstacle(this.canvas, this.playerHitBoxes, i*this.obstacleWidth, this.height-80, 20, this.obstacleWidth, speed, 'walls',this.rockTexture));
    }
    this.drawObstacles();
  };

  this.moveObstacles = function(){
    for(var i = 0; i < this.numberOfWallSections; i++){
      this.ceiling[i].move();
      this.floor[i].move();
    }

    for(var j = 0; j < this.rocks.length; j++){
      this.rocks[j].move();
    }
  };

  this.checkCollisions = function(){
    var collision = true;
    for(var i = 0; i < this.numberOfWallSections; i++){
      collision = this.ceiling[i].collisionDetectAllBoxes() || this.floor[i].collisionDetectAllBoxes();
      if(collision === true){
        return collision;
      }
    }

    for(var j = 0; j < this.rocks.length; j++){
      collision = this.rocks[j].collisionDetectAllBoxes();
      if(collision === true){
        return collision;
      }
    }
    return collision;
  };

  this.checkStatusToShiftNewWalls = function (newWallHeight, speed, viewMode){
    if(this.ceiling[this.numberOfWallSections-1].x < (this.width-this.obstacleWidth+1)){
      this.shiftWalls(newWallHeight, speed, viewMode);
    }
  };

  this.shiftWalls = function(newHeight, speed, viewMode){
      this.ceiling.shift();
      this.ceiling.push(new Obstacle(this.canvas, this.playerHitBoxes, this.width-1, 0, newHeight, this.obstacleWidth, speed, viewMode, this.rockTexture));
      this.floor.shift();
      this.floor.push(new Obstacle(this.canvas, this.playerHitBoxes, this.width-1, this.height-newHeight-60, newHeight, this.obstacleWidth, speed, viewMode, this.rockTexture));
  };

  this.loadImages = function(){
    this.playerImage.src = './lib/imgs/googlyfish.png';
    this.mushroomImage.src = './lib/imgs/mushroom.png';
    this.rockTexture.src = './lib/imgs/rocktexture-sm.png';
    this.waterTexture.src = './lib/imgs/water.png';
  };

  this.init = function(speed){
    this.initHitBoxes();
    this.clearWorld();
    this.drawBackground();
    this.initObstacles(speed);
    this.playerHitBoxes.forEach(function(hitBox){
        return hitBox.draw;
    });
    this.playerFish.draw();
    this.renderStartText();
  };

  this.reset = function(){
    this.clearWorld();
    this.ceiling = [];
    this.floor = [];
    this.rocks = [];
    this.playerFish = new Player(this.canvas,null,null,null,null,"image", this.playerImage);
    this.initHitBoxes();
    this.drawBackground();
    this.initObstacles();
    this.draw();
    this.playerFish.draw();

  };

  this.renderStartText = function(){
    var startText = "Press Spacebar to Start and Play";
    this.canvas.fillStyle = 'purple';
    this.canvas.font = "40px serif";
    this.canvas.fillText(startText, 100, 200);
  };

  this.renderEndText = function(){
    var endText1 = "You LOSE!!!!!!!!";
    var endText2 = "Press Spacebar to Play Again";
    this.canvas.fillStyle = 'red';
    this.canvas.font = "40px serif";
    this.canvas.fillText(endText1, 180, 200);
    this.canvas.fillText(endText2, 120, 250);

  };
  this.generateNewRockY = function(rockHeight){
    var min = this.ceiling[this.numberOfWallSections-1].height;
    var max = this.floor[this.numberOfWallSections-1].y-rockHeight;
    return Math.random()*(max-min)+min;
  };


  this.createNewRock = function(rainbowMode, newRockHeight, speed){
    if(rainbowMode === true){
      this.rocks.push(new Obstacle(this.canvas, this.playerHitBoxes, 700, this.generateNewRockY(newRockHeight), newRockHeight, 10, speed, 'rainbow'));
    }else{
      this.rocks.push(new Obstacle(this.canvas, this.playerHitBoxes, 700,this.generateNewRockY(newRockHeight), newRockHeight, 10, speed, 'rocks', this.rockTexture));
    }
  };

  this.generateNewMushroomX = function(){
      var min = this.ceiling[20].height;
      var max = this.floor[20].y-32;//change to height of mushroom image
      return Math.random()*(max-min)+min;
    };

  this.createNewMushroom = function(speed){
    this.mushrooms.shift();
    this.mushrooms.push(new Obstacle(this.canvas, this.playerHitBoxes, 700, this.generateNewMushroomX(), 32, 25, speed, 'mushroom', this.mushroomImage));
  };

  this.drawMushrooms = function(){

    for(var i = 0; i < this.mushrooms.length; i++){
      this.mushrooms[i].draw();
    }

  };

  this.moveMushrooms = function(){
    for(var i = 0; i < this.mushrooms.length; i++){
      this.mushrooms[i].move();
    }
  };

  this.checkIfFishAteMushroom = function(){
    var ateMushroom = false;

    for(var i = 0; i < this.mushrooms.length; i++){
      ateMushroom = this.mushrooms[i].collisionDetectAllBoxes();
      if(ateMushroom === true){
        this.mushrooms.splice(this.mushrooms[i].indexOf);
      }
    }
    return ateMushroom;
  };

  this.clearWorld = function(){
    this.canvas.clearRect(0,0,this.width, this.height);
  };

  this.drawObstacles = function(){
    for(var i = 0; i < this.numberOfWallSections; i++){
      this.ceiling[i].draw();
      this.floor[i].draw();
    }
    for(var j = 0; j < this.rocks.length; j++){
      this.rocks[j].draw();
    }
  };

  this.drawBackground = function(){
    var waterTexture = this.canvas.createPattern(this.waterTexture, 'repeat');
    this.canvas.clearRect(0,0,this.width, this.height);
    this.canvas.fillStyle = waterTexture;
    this.canvas.fillRect(0,0,this.width, this.height-80);
  };

  this.draw = function(){
    this.playerHitBoxes.forEach(function(hitBox){
        return hitBox.draw();
    });
    this.drawBackground();
    this.drawMushrooms();
    this.drawObstacles();
    this.playerFish.draw();
  };
}

module.exports = World;
