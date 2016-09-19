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
  this.mushroomImage = new Image();
  this.mushroomImage.src = './lib/imgs/mushroom.png';
  this.playerFish = new Player(this.world,null,null,null,null,"image", this.playerImage);//Player(world, x, y, height, width, type, image)
  this.playerHitBoxes = [];
  this.scoreboard = new Scoreboard(this.world);
  this.ceiling = [];
  this.floor = [];
  this.rocks = [];
  this.powerUps = [];
  this.mushrooms = [];
  this.collision = false;
  this.ateMushroom = false;
  this.distanceCount=0;
  this.difficultyFactor = 1;
  this.rockHeight = 70;
  this.rockFrequency = 100;
  this.rainbowMode = false;
  this.rainbowModeDuration = 0;
  this.speed = 4;


  this.initHitBoxes = function(){
    this.playerHitBoxes[0] = new Player(this.world, 185, 265, 15, 90, "box");
    this.playerHitBoxes[1] = new Player(this.world, 200, 255, 20, 65, "box");
    this.playerHitBoxes[2] = new Player(this.world, 210, 265, 20, 50, "box");
  };

  this.obstacleWidth = 20;
  this.numberOfWallSections = Math.floor(this.width/this.obstacleWidth + 3);

  this.initObstacles = function(){
    for(var i = 0; i < this.numberOfWallSections; i++){
      this.ceiling.push(new Obstacle(this.world, this.playerHitBoxes, i*this.obstacleWidth, 0, 20, this.obstacleWidth, this.speed, 'walls'));
      this.floor.push(new Obstacle(this.world, this.playerHitBoxes, i*this.obstacleWidth, this.height-80, 20, this.obstacleWidth, this.speed, 'walls'));
    }
    this.drawObstacles();
  };

  this.moveObstacles = function(){
    for(var i = 0; i < this.numberOfWallSections; i++){
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

  this.setMode = function(){
    console.log(this.viewMode);
      if (this.rainbowMode === true){
        this.viewMode = 'rainbow';
        this.rainbowModeDuration++;
      }else {
        this.viewMode = 'walls';
      }
      //add more here?

      if(this.rainbowModeDuration > 500) {
        this.rainbowMode = false;
        this.rainbowModeDuration = 0;
      }
  };

  this.shiftWalls = function(){
      var newHeight = this.generateNewWallHeight(this.difficultyFactor);

      this.ceiling.shift();
      this.ceiling.push(new Obstacle(this.world, this.playerHitBoxes, this.width-1, 0, newHeight, this.obstacleWidth, this.speed, this.viewMode));
      this.floor.shift();
      this.floor.push(new Obstacle(this.world, this.playerHitBoxes, this.width-1, this.height-newHeight-60, newHeight, this.obstacleWidth, this.speed, this.viewMode));
  };

  this.loadImages = function(){
    this.playerImage.src = './lib/imgs/googlyfish.png';
    this.mushroomImage.src = './lib/imgs/mushroom.png';
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
    this.moveMushrooms();
    this.distanceCount++;
    this.setMode();
    this.increaseDifficulty();
    if(this.ceiling[this.numberOfWallSections-1].x < (this.width-this.obstacleWidth+1)){
      this.shiftWalls();
    }

    if(this.distanceCount % 500 === 0){//generate new mushroom
      this.createNewMushroom();
      console.log('new mushroom created' + this.mushrooms[0]);
    }

    this.randomizeRockCreation();
    this.draw();
    if(this.collision === true){
      this.running = false;
      return false;
    }
  };

   this.increaseDifficulty = function(){
      if(this.distanceCount%50 === 0){
        this.difficultyFactor = this.difficultyFactor + 0.05;
        console.log(this.difficultyFactor);
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

  this.increaseRockFrequency = function(){
    this.rockFrequency = this.rockFrequency - 10;
  };

  this.randomizeRockCreation = function(){

    if(this.distanceCount < 4000 && this.distanceCount % 1000 === 0){
      this.increaseRockFrequency();
    }

    if(this.distanceCount % this.rockFrequency === 0){
      this.createNewRock();
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

  this.createNewRock = function(){
    if(this.rainbowMode === true){
      this.rocks.push(new Obstacle(this.world, this.playerHitBoxes, 700, this.generateNewRockX(), this.generateNewRockHeight(), 10, this.speed, 'rainbow'));
    }else{
      this.rocks.push(new Obstacle(this.world, this.playerHitBoxes, 700, this.generateNewRockX(), this.generateNewRockHeight(), 10, this.speed, 'rocks'));      
    }
  };

  this.createNewMushroom = function(){
    this.mushrooms.shift();
    this.mushrooms.push(new Obstacle(this.world, this.playerHitBoxes, 700, this.generateNewMushroomX(), 32, 25, this.speed, 'mushroom', this.mushroomImage));
  };

  this.drawMushrooms = function(){

    for(var i = 0; i < this.mushrooms.length; i++){
      this.mushrooms[i].draw();
    }

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

  this.moveMushrooms = function(){
    for(var i = 0; i < this.mushrooms.length; i++){
      this.mushrooms[i].move();
      this.ateMushroom = this.mushrooms[i].collisionDetectAllBoxes();
      if(this.ateMushroom === true){
        this.mushrooms.splice(this.mushrooms[i].indexOf);
        this.rainbowMode = true;
      }
    }
  };

  this.clearWorld = function(){
    this.world.clearRect(0,0,this.width, this.height);
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

  this.draw = function(){
    this.drawObstacles();
    this.drawMushrooms();
    this.playerHitBoxes.forEach(function(hitBox){
        return hitBox.draw();
    });
    this.playerFish.draw();
    this.scoreboard.updateScore(this.distanceCount);
  };
}

module.exports = GameWorld;
