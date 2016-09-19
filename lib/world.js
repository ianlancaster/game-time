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

  this.initObstacles = function(){
    for(var i = 0; i < this.numberOfWallSections; i++){
      this.ceiling.push(new Obstacle(this.canvas, this.playerHitBoxes, i*this.obstacleWidth, 0, 20, this.obstacleWidth, this.game.game, 'walls',this.rockTexture));
      this.floor.push(new Obstacle(this.canvas, this.playerHitBoxes, i*this.obstacleWidth, this.height-80, 20, this.obstacleWidth, this.game.game, 'walls',this.rockTexture));
    }
    this.drawObstacles();
  };

  this.moveObstacles = function(){
    for(var i = 0; i < this.numberOfWallSections; i++){
      this.ceiling[i].move();
      this.floor[i].move();
      this.game.collision = this.ceiling[i].collisionDetectAllBoxes() || this.floor[i].collisionDetectAllBoxes();
      if(this.game.collision === true){
        this.renderEndText();
        this.game.scoreboard.updateHighScore();
        this.game.running = false;
      }
    }

    for(var j = 0; j < this.rocks.length; j++){
      this.rocks[j].move();
      this.game.collision = this.rocks[j].collisionDetectAllBoxes();
      if(this.game.collision === true){
        this.renderEndText();
        this.game.scoreboard.updateHighScore();
        this.game.running = false;
      }
    }
  };

  this.shiftWalls = function(){
      var newHeight = this.game.generateNewWallHeight(this.game.difficultyFactor);

      this.ceiling.shift();
      this.ceiling.push(new Obstacle(this.canvas, this.playerHitBoxes, this.width-1, 0, newHeight, this.obstacleWidth, this.speed, this.viewMode, this.rockTexture));
      this.floor.shift();
      this.floor.push(new Obstacle(this.canvas, this.playerHitBoxes, this.width-1, this.height-newHeight-60, newHeight, this.obstacleWidth, this.speed, this.viewMode, this.rockTexture));
  };

  this.loadImages = function(){
    this.playerImage.src = './lib/imgs/googlyfish.png';
    this.mushroomImage.src = './lib/imgs/mushroom.png';
    this.rockTexture.src = './lib/imgs/rocktexture-sm.png';
    this.waterTexture.src = './lib/imgs/water.png';
  };

  this.init = function(){
    this.clearWorld();
    this.drawBackground();
    this.game.scoreboard.retrieveStoredHighScore();
    this.initObstacles();
    this.initHitBoxes();
    this.game.scoreboard.updateScore(this.game.distanceCount);
    this.playerHitBoxes.forEach(function(hitBox){
        return hitBox.draw;
    });
    this.playerFish.draw();
    this.renderStartText();
  };

  this.reset = function(){
    this.clearWorld();
    this.game.collision = false;
    this.ceiling = [];
    this.floor = [];
    this.rocks = [];
    this.game.difficultyFactor = 1;
    this.game.distanceCount = 0;
    this.playerFish = new Player(this.canvas,null,null,null,null,"image", this.playerImage);
    this.initObstacles();
    this.initHitBoxes();
    this.playerFish.draw();
    this.draw();
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

  this.createNewRock = function(){
    if(this.game.rainbowMode === true){
      this.rocks.push(new Obstacle(this.canvas, this.playerHitBoxes, 700, this.game.generateNewRockX(), this.game.generateNewRockHeight(), 10, this.game.game, 'rainbow'));
    }else{
      this.rocks.push(new Obstacle(this.canvas, this.playerHitBoxes, 700, this.game.generateNewRockX(), this.game.generateNewRockHeight(), 10, this.game.game, 'rocks', this.rockTexture));
    }
  };

  this.createNewMushroom = function(){
    this.mushrooms.shift();
    this.mushrooms.push(new Obstacle(this.canvas, this.playerHitBoxes, 700, this.game.generateNewMushroomX(), 32, 25, this.game.game, 'mushroom', this.mushroomImage));
  };

  this.drawMushrooms = function(){

    for(var i = 0; i < this.mushrooms.length; i++){
      this.mushrooms[i].draw();
    }

  };

  this.moveMushrooms = function(){
    for(var i = 0; i < this.mushrooms.length; i++){
      this.mushrooms[i].move();
      this.game.ateMushroom = this.mushrooms[i].collisionDetectAllBoxes();
      if(this.game.ateMushroom === true){
        this.mushrooms.splice(this.mushrooms[i].indexOf);
        this.game.rainbowMode = true;
      }
    }
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
    this.drawBackground();
    this.drawMushrooms();
    this.playerHitBoxes.forEach(function(hitBox){
        return hitBox.draw();
    });
    this.playerFish.draw();
    this.game.scoreboard.updateScore(this.game.distanceCount);
    this.drawObstacles();
  };
}

module.exports = World;
