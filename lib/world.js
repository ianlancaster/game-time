// var $ = require('jquery');

var Player = require('./player');
var Obstacle = require('./obstacle');
var Scoreboard = require('./scoreboard');

function GameWorld(height, width, world) {
  this.world = world;
  this.running = false;
  this.start = false;
  this.height= height || 500;
  this.width= width || 700;
  this.playerImage = new Image();
  this.playerImage.src = './lib/imgs/googlyfish.png';
  this.playerFish = new Player(this.world,null,null,null,null,"image", this.playerImage);//Player(world, x, y, height, width, type, image)
  this.playerHitBoxes = [];
  this.scoreboard = new Scoreboard(this.world);
  this.ceiling = [];
  this.floor = [];
  this.rocks = [];
  this.collision = false;
  this.distanceCount=0;
  this.difficultyFactor = 1;
  this.rockHeight = 70;


  this.initHitBoxes = function(){
    this.playerHitBoxes[0] = new Player(this.world, 205, 265, 15, 90, "box");
    this.playerHitBoxes[1] = new Player(this.world, 220, 255, 20, 65, "box");
    this.playerHitBoxes[2] = new Player(this.world, 230, 265, 20, 50, "box");
  };

  this.initObstacles = function(){
    for(var i = 0; i < 21; i++){
      this.ceiling.push(new Obstacle(this.world, this.playerHitBoxes, i*36, 0, 20, 36));
      this.floor.push(new Obstacle(this.world, this.playerHitBoxes, i*36, this.height-80, 20, 36));
    }
    this.drawObstacles();
  };

  this.loadImages = function(){
    this.playerImage.src = './lib/imgs/googlyfish.png';
  };

  this.init = function(){
    this.clearWorld();
    this.scoreboard.retrieveStoredHighScore();
    this.initObstacles();
    this.initHitBoxes();
    this.scoreboard.updateScore(this.distanceCount);
    this.playerHitBoxes.forEach(function(hitBox){
        return hitBox.draw;
    });
    this.playerFish.draw();
    this.renderStartText();
  };

  this.mouseDown = function(){

    if(this.running === true){
      this.playerHitBoxes.forEach(function(hitBox){
          return hitBox.moveUp();
      });
      this.playerFish.moveUp();
    }

    if(this.running === false){
      this.reset();
      this.running = true;
      this.start = true;
    }

    return false;
  };

  this.mouseUp = function(){
    return false;
  };

  this.gameFrame = function(){
    this.clearWorld();
    this.playerHitBoxes.forEach(function(hitBox){
         return hitBox.moveDown();
    });
    this.playerFish.moveDown();
    this.moveObstacles();
    this.distanceCount++;
    if(this.ceiling[20].x < 666){
      this.shiftObstacles();
    }

    this.randomizeRockCreation();
    this.draw();
    if(this.collision === true){
      this.running = false;
      return false;
    }
  };

  this.reset = function(){
    this.clearWorld();
    this.collision = false;
    this.ceiling = [];
    this.floor = [];
    this.rocks = [];
    this.difficultyFactor = 1;
    this.distanceCount = 0;
    this.playerFish = new Player(this.world,null,null,null,null,"image", this.playerImage);
    this.initObstacles();
    this.initHitBoxes();
    this.playerFish.draw();
    this.draw();
  };

  this.setGameOptions = function(){

  };

  this.renderStartText = function(){
    var startText = "Press Spacebar to Start and Play";
    this.world.fillStyle = 'purple';
    this.world.font = "40px serif";
    this.world.fillText(startText, 100, 200);
  };

  this.renderEndText = function(){
    var endText1 = "You LOSE!!!!!!!!";
    var endText2 = "Press Spacebar to Play Again";
    this.world.fillStyle = 'red';
    this.world.font = "40px serif";
    this.world.fillText(endText1, 180, 200);
    this.world.fillText(endText2, 120, 250);

  };

  this.randomizeRockCreation = function(){

    var min = 140-this.difficultyFactor*8;
    var max = 170-this.difficultyFactor*8;
    var randomMod = Math.floor(Math.random()*(max-min)+min);

    if(this.distanceCount % randomMod === 0){
      this.createNewRock();
    }
  };
  this.generateNewRockX = function(){
    var min = this.ceiling[20].height;
    var max = this.floor[20].y-this.rockHeight;
    return Math.random()*(max-min)+min;

  };

  this.generateNewRockHeight = function(){
    var min = 10*this.difficultyFactor;
    var max = 30*this.difficultyFactor;
    return Math.random()*(max-min)+min;
  };

  this.createNewRock = function(){
    this.rocks.push(new Obstacle(this.world, this.playerHitBoxes, 700, this.generateNewRockX(), this.generateNewRockHeight(), 10));
  };

  this.moveObstacles = function(){
    for(var i = 0; i < 21; i++){
      this.ceiling[i].move();
      this.floor[i].move();
      this.collision = this.ceiling[i].collisionDetectAllBoxes() || this.floor[i].collisionDetectAllBoxes();
      if(this.collision === true){
        this.renderEndText();
        this.scoreboard.updateHighScore();
        this.running = false;
      }
    }

    for(var j = 0; j < this.rocks.length; j++){
      this.rocks[j].move();
      this.collision = this.rocks[j].collisionDetectAllBoxes();
      if(this.collision === true){
        this.renderEndText();
        this.scoreboard.updateHighScore();
        this.running = false;
      }
    }
  };

  this.generateNewObstacleHeight = function(difficultyFactor){

    var max = 50*difficultyFactor;
    var min = 20*difficultyFactor;
    return Math.random()*(max-min)+min;
  };

  this.shiftObstacles = function(){
      if(this.distanceCount%25 === 0){
        this.difficultyFactor = this.difficultyFactor + 0.1;
        console.log(this.difficultyFactor);
      }
      var newHeight = this.generateNewObstacleHeight(this.difficultyFactor);



      this.ceiling.shift();
      this.ceiling.push(new Obstacle(this.world, this.playerHitBoxes, this.width , 0, newHeight, 36));
      this.floor.shift();
      this.floor.push(new Obstacle(this.world, this.playerHitBoxes, this.width, this.height-newHeight-60, newHeight, 36));
  };

  this.clearWorld = function(){
    this.world.clearRect(0,0,this.width, this.height);
  };

  this.drawObstacles = function(){
    for(var i = 0; i < 21; i++){
      this.ceiling[i].draw();
      this.floor[i].draw();
    }

    for(var j = 0; j < this.rocks.length; j++){
      this.rocks[j].draw();
    }

  };

  this.draw = function(){
    this.drawObstacles();
    this.playerFish.draw();
    this.playerHitBoxes.forEach(function(hitBox){
        return hitBox.draw();
    });
    this.scoreboard.updateScore(this.distanceCount);
  };
}

module.exports = GameWorld;
