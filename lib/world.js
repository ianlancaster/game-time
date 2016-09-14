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


  this.initObstacles = function(){
    for(var i = 0; i < 21; i++){
      this.ceiling.push(new Obstacle(this.world, i*35, 0, 20, 35));
      this.floor.push(new Obstacle(this.world, i*35, this.height-20, 20, 35));
    }
    this.drawObstacles();
  };

  this.init = function(){
    this.initObstacles();
    this.player.draw();
    //draw obstacles
  };

  this.mouseDown = function(){


    if(this.collision === true){
      this.reset();
    }

    if(this.running === true){
      this.player.moveUp();
    }
    
    if(this.running === false){
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
    if(this.ceiling[20].x < 666){
      this.shiftObstacles();
    }

    if(this.distanceCount%100 === 0){
      this.createNewRock();
    }

    this.draw();
    this.detectCollisions();
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
    this.player = new Player(this.world);
    this.initObstacles();
    this.player.draw();

  };

  this.setGameOptions = function(){

  };

  this.createNewRock = function(){
    this.rocks.push(new Obstacle(this.world, 700, 200, 80, 5));

  };

  this.moveObstacles = function(){
    for(var i = 0; i < 21; i++){
      this.ceiling[i].move();
      this.floor[i].move();
    }

    for(var j = 0; j < this.rocks.length; j++){
      this.rocks[j].move();
    }
  };

  this.generateNewObstacleHeight = function(difficultyFactor){

    var max = 50*difficultyFactor;
    var min = 20*difficultyFactor;
    return Math.random()*(max-min)+min;
  };

  this.shiftObstacles = function(){
      this.ceiling.shift();
      var difficultyFactor = 1;
      var newHeight = this.generateNewObstacleHeight(difficultyFactor);
      this.ceiling.push(new Obstacle(this.world, width , 0, newHeight, 35));
      this.floor.shift();
      this.floor.push(new Obstacle(this.world, width, this.height-newHeight, newHeight, 35));
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

  this.detectCollisions = function(){
    this.collisonDetectCeiling();
    this.collisionDetectFloor();
  };

  this.collisonDetectCeiling = function(){
    //if player upper right corner y < obstacle bottom left or right corner
    for(var i = 6; i < 8 ; i++){
      // if(this.player.topRight().x > this.ceiling[i].bottomLeft().x ){
      //   if(this.player.topRight().y < this.ceiling[i].bottomRight().y){
      //   this.collision = true;
      //   console.log("Player top right coords:");
      //   console.log(this.player.topRight());
      //   console.log("Ceiling bottom left coords");
      //   console.log(this.ceiling[i].bottomLeft());
      //   console.log("Ceiling bottom right coords");
      //   console.log(this.ceiling[i].bottomRight());
      //   alert('there was a collision at element'+i);
      //   }
      // }
    if( (this.player.topRight().x > this.ceiling[i].bottomLeft().x) &&
        (this.player.topRight().y < this.ceiling[i].bottomRight().y)
      ){
        this.collision = true;
        console.log("Player top right coords:");
        console.log(this.player.topRight());
        console.log("Ceiling bottom left coords");
        console.log(this.ceiling[i].bottomLeft());
        console.log("Ceiling bottom right coords");
        console.log(this.ceiling[i].bottomRight());
        console.log('collision');
      }
    }
  };

  this.collisionDetectFloor = function(){
    for(var i = 6; i < 8 ; i++){
      if(this.player.bottomRight().x > this.floor[i].topLeft().x){
        if(this.player.bottomRight().y > this.floor[i].topRight().y){
          this.collision = true;
        }
      }
    }

  };
}

module.exports = GameWorld;
