var Player = require('./player');
var Scoreboard = require('./scoreboard');
var World = require('./world');

function Game(canvas) {
  this.world = new World(560,700, canvas);
  this.running = false;
  this.start = false;
  this.scoreboard = new Scoreboard(canvas);
  this.collision = false;
  this.ateMushroom = false;
  this.distanceCount = 0;
  this.difficultyFactor = 1;
  this.rockHeight = 70;
  this.rockFrequency = 100;
  this.rainbowMode = false;
  this.rainbowModeDuration = 0;
  this.speed = 4;


  this.setMode = function(){
      if (this.rainbowMode === true){
        this.viewMode = 'rainbow';
        this.rainbowModeDuration++;
      }else {
        this.viewMode = 'walls';
      }

      if(this.rainbowModeDuration > 500) {
        this.rainbowMode = false;
        this.rainbowModeDuration = 0;
      }
  };

  this.mouseDown = function(){

    if(this.running === true){
      this.world.playerHitBoxes.forEach(function(hitBox){
          return hitBox.moveUp();
      });
      this.playerFish.moveUp();
    }

    if(this.running === false){
      this.world.reset();
      this.running = true;
      this.start = true;
    }

    return false;
  };

  this.mouseUp = function(){
    return false;
  };

  this.gameFrame = function(){
    this.world.clearWorld();
    canvas.playerHitBoxes.forEach(function(hitBox){
         return hitBox.moveDown();
    });
    this.world.playerFish.moveDown();
    this.world.moveObstacles();
    this.world.moveMushrooms();
    this.distanceCount++;
    this.setMode();
    this.increaseDifficulty();
    if(this.ceiling[this.numberOfWallSections-1].x < (canvas.width-this.obstacleWidth+1)){
      this.world.shiftWalls();
    }

    if(this.distanceCount % 500 === 0){//generate new mushroom
      this.world.createNewMushroom();
    }

    this.randomizeRockCreation();
    this.world.draw();
    if(this.collision === true){
      this.running = false;
      return false;
    }
  };

  this.increaseDifficulty = function(){
     if(this.distanceCount%50 === 0){
       this.difficultyFactor = this.difficultyFactor + 0.05;
     }
  };

  this.increaseRockFrequency = function(){
    this.rockFrequency = this.rockFrequency - 10;
  };

  this.randomizeRockCreation = function(){

    if(this.distanceCount < 4000 && this.distanceCount % 1000 === 0){
      this.increaseRockFrequency();
    }

    if(this.distanceCount % this.rockFrequency === 0){
      this.world.createNewRock();
    }
  };

  this.generateNewRockX = function(){
    var min = this.ceiling[20].height;
    var max = this.floor[20].y-this.rockHeight;
    return Math.random()*(max-min)+min;
  };

  this.generateNewRockHeight = function(){
    var min = 10+5*this.difficultyFactor;
    var max = 20+5*this.difficultyFactor;


    if(this.distanceCount > 10500){
      min = 70;
      max = 80;
    }

    return Math.random()*(max-min)+min;
  };

  this.generateNewMushroomX = function(){
    var min = this.ceiling[20].height;
    var max = this.floor[20].y-32;//change to height of mushroom image
    return Math.random()*(max-min)+min;
  };

  this.generateNewWallHeight = function(difficultyFactor){

    var max = 30+10*difficultyFactor;
    var min = 20+10*difficultyFactor;

    if(this.distanceCount > 10000){
      min = 140;
      max = 150;
    }

    return Math.random()*(max-min)+min;
  };
}

module.exports = Game;
