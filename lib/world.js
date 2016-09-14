// var $ = require('jquery');

var Player = require('./player');
var Obstacle = require('./obstacle');

function GameWorld(height, width, world) {
  this.world = world;
  this.running = false;
  this.start = false;
  this.height= height || 500;
  this.width= width || 700;
  this.player = new Player(this.world);
  this.ceiling = [];
  this.floor = [];
  this.rocks = [];
  this.collision = false;
  this.distanceCount=0;
  this.difficultyFactor = 1;


  this.initObstacles = function(){
    for(var i = 0; i < 21; i++){
      this.ceiling.push(new Obstacle(this.world, this.player, i*35, 0, 20, 35));
      this.floor.push(new Obstacle(this.world, this.player, i*35, this.height-20, 20, 35));
    }
    this.drawObstacles();
  };

  this.init = function(){
    this.initObstacles();
    this.player.draw();
    //draw obstacles
  };

  this.mouseDown = function(){

    //
    // if(this.collision === true){
    //
    // }

    if(this.running === true){
      this.player.moveUp();
    }

    if(this.running === false){
      this.reset();
      this.running = true;
      this.start = true;
    }

          if(this.collision === false){

          }else{
            this.running = false;
          }

    return false;
  };

  this.mouseUp = function(){
    return false;
  };

  this.gameFrame = function(){
    this.clearWorld();
    this.player.moveDown();
    this.moveObstacles();
    this.distanceCount++;
    if(this.ceiling[20].x < 666){
      this.shiftObstacles();
    }

    if(this.distanceCount % 100 === 0){
      this.createNewRock();
    }

    this.draw();
    // this.detectCollisions();
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
    this.player = new Player(this.world);
    this.player.draw();
    this.initObstacles();

  };

  this.setGameOptions = function(){

  };

  this.createNewRock = function(){
    this.rocks.push(new Obstacle(this.world, this.player, 700, 200, 80, 5));

  };

  this.moveObstacles = function(){
    for(var i = 0; i < 21; i++){
      this.ceiling[i].move();
      this.floor[i].move();
      this.collision = this.ceiling[i].collisionDetect() || this.floor[i].collisionDetect();
      if(this.collision === true){
        this.running = false;
      }
    }

    for(var j = 0; j < this.rocks.length; j++){
      this.rocks[j].move();
      this.collision = this.rocks[j].collisionDetect();
      if(this.collision === true){
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
      this.ceiling.shift();

      if(this.distanceCount%100 === 0){
        this.difficultyFactor = this.difficultyFactor + 0.5;
        console.log(this.difficultyFactor);
      }
      var newHeight = this.generateNewObstacleHeight(this.difficultyFactor);
      this.ceiling.push(new Obstacle(this.world, this.player, this.width , 0, newHeight, 35));
      this.floor.shift();
      this.floor.push(new Obstacle(this.world, this.player, this.width, this.height-newHeight, newHeight, 35));
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
    this.player.draw();
    console.log('draw');
  };
}

module.exports = GameWorld;
