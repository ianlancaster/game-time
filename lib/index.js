var $ = require('jquery');

var canvas = document.getElementById('world');
var world = canvas.getContext('2d');

var $world = $('#world');

function GameWorld(height, width) {
  this.running = false;
  this.height= height || 500;
  this.width= width || 700;
  this.player = new Player();
  this.ceiling = [];
  this.floor = [];
  this.rocks = [];
  this.collision = false;


  this.initObstacles = function(){
    for(var i = 0; i < 21; i++){
      this.ceiling.push(new Obstacle(i*35, 0, 20, 35));
      this.floor.push(new Obstacle(i*35, this.height-20, 20, 35));
    }
    this.drawObstacles();
  };

  this.init = function(){
    this.initObstacles();
    this.player.draw();
    //draw obstacles
  };

  this.runGameLoop = function(){
    this.clearWorld();
    this.player.moveDown();
    this.moveObstacles();
    if(this.ceiling[20].x < 666){
      this.shiftObstacles();
    }

    if(distanceCount%100 === 0){
      this.createNewRock();
    }
    gameWorld.draw();
    this.detectCollisions();
      if(this.collision === true){
        return false;
      }
  };

  this.reset = function(){
    this.clearWorld();
    this.collision = false;
    this.ceiling = [];
    this.floor = [];
    this.rocks = [];
    this.player = new Player();
    this.initObstacles();
    this.player.draw();

  };

  this.setGameOptions = function(){

  };

  this.createNewRock = function(){
    this.rocks.push(new Obstacle(700, 200, 80, 5));

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
      this.ceiling.push(new Obstacle( width , 0, newHeight, 35));
      this.floor.shift();
      this.floor.push(new Obstacle( width, this.height-newHeight, newHeight, 35));
  };

  this.clearWorld = function(){
    world.clearRect(0,0,this.width, this.height);
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

function Player(x, y, height, width){
  this.x = x || 200;
  this.y = y || 250;
  this.height = height || 20;
  this.width = width || 50;
}

Player.prototype.moveUp = function(){
  this.y = this.y-3;
};

Player.prototype.moveDown = function(){
  this.y = this.y+3;
};

Player.prototype.draw = function(){
  // world.fillStyle('#FF0000');
  world.fillRect(this.x,this.y,this.width, this.height);
};

Player.prototype.topRight = function(){
  return {x:this.x+this.width, y:this.y};
};

Player.prototype.topLeft = function(){
  return {x:this.x, y:this.y};
};

Player.prototype.bottomRight = function(){
  return {x:this.x+this.width, y:this.y+this.height};
};

Player.prototype.bottomLeft = function(){
  return {x:this.x, y:this.y+this.height};
};


function Obstacle(x, y, height, width){
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
}

Obstacle.prototype = {
  draw: function(){
    // world.fillStyle("#FF0000");
    world.fillRect(this.x,this.y,this.width, this.height);
  },
  move : function(){
    var speed = 3;
    this.x = this.x - speed;
  },
  topRight : function(){
    return {x:this.x+this.width, y:this.y};
  },
  topLeft : function(){
    return {x:this.x, y:this.y};
  },
  bottomRight : function(){
    return {x:this.x+this.width, y:this.y+this.height};
  },
  bottomLeft : function(){
    return {x:this.x, y:this.y+this.height};
  }
};


var gameWorld = new GameWorld(500,700);

gameWorld.init();

var timeout;
var distanceCount=0;

$world.on('mousedown',function(){

  if(gameWorld.collision === true){
    gameWorld.reset();
  }

  if(gameWorld.running === false){
    gameWorld.running = true;
      requestAnimationFrame(function loop(){
        gameWorld.runGameLoop();
        distanceCount++;
        if(gameWorld.collision === false){
          requestAnimationFrame(loop);
        }else{
          gameWorld.running = false;
          clearInterval(timeout);
      }
      });
  }

  timeout = setInterval(function(){
    gameWorld.player.moveUp();
  },8);


  return false;
});



$world.on('mouseup',function(){

  clearInterval(timeout);
  return false;
});
