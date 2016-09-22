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
  this.tweezerIsPlaying = false;
  this.speed = 4;
  this.tweezer = new Audio('./lib/audio/tweezer.mp3');
  this.showBonusText = false;

  this.init = function(){
    this.world.init(this.speed);
    this.difficultyFactor = 1;
    this.distanceCount = 0;
    this.scoreboard.retrieveStoredHighScore();
    this.scoreboard.renderScores();
  };

  this.reset = function(){
    this.difficultyFactor = 1;
    this.distanceCount = 0;
    this.rockFrequency = 100;
    this.scoreboard.resetScore();
    this.world.reset();
    this.tweezer = new Audio('./lib/audio/tweezer.mp3');
  };

  this.setMode = function(){
      if (this.rainbowMode === true){
        this.viewMode = 'rainbow';
        this.rainbowModeDuration++;
      }else {
        this.viewMode = 'walls';
      }
      if(this.rainbowModeDuration > 800) {
        this.rainbowMode = false;
        this.rainbowModeDuration = 0;
      }
      if(this.rainbowModeDuration > 100){
        this.showBonusText = false;
      }
  };

  this.spacebarDown = function(){
    if(this.running === true){
      this.world.playerHitBoxes.forEach(function(hitBox){
          return hitBox.moveUp();
      });
      this.world.playerFish.moveUp();
    }
    if(this.running === false){
      this.reset();
      this.running = true;
      this.start = true;
    }
    return false;
  };

  this.spacebarUp = function(){
    return false;
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
      this.world.createNewRock(this.rainbowMode, this.generateNewRockHeight(), this.speed);
    }
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


  this.generateNewWallHeight = function(difficultyFactor){
    var max = 30+10*difficultyFactor;
    var min = 20+10*difficultyFactor;

    if(this.distanceCount > 10000){
      min = 140;
      max = 150;
    }
    return Math.random()*(max-min)+min;
  };

  this.executeMushroomFunctions = function(){
    if (this.world.checkIfFishAteMushroom() === true){
      this.rainbowModeDuration = 0;
      this.rainbowMode = true;
      this.showBonusText = true;
      this.scoreboard.addValueToScore(500);
    }
    if(this.rainbowMode === true && this.tweezerIsPlaying === false){
      this.tweezer.volume = 1;
      this.tweezer.play();
      this.tweezerIsPlaying = true;
    }
    if(this.rainbowMode === false){
      this.tweezer.pause();
      this.tweezerIsPlaying = false;
    }
    if(this.distanceCount % 500 === 0){//generate new mushroom
      this.world.createNewMushroom(this.speed);
    }
  };

  this.gameFrame = function(){
    this.world.clearWorld();
    this.world.move();
    this.distanceCount++;
    this.setMode();
    this.increaseDifficulty();

    this.world.checkStatusToShiftNewWalls((this.generateNewWallHeight(this.difficultyFactor)), this.speed, this.viewMode);

    this.randomizeRockCreation();
    this.world.draw();
    this.scoreboard.incrementScore();
    this.scoreboard.renderScores(this.showBonusText);

    this.executeMushroomFunctions();

    if(this.world.checkCollisions() === true){
      this.world.renderEndText();
      this.scoreboard.updateHighScore();
      this.tweezer.pause();
      this.rainbowMode = false;
      this.running = false;
      return false;
    }
  };
}

module.exports = Game;
