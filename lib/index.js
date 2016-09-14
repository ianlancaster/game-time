var $ = require('jquery');

var canvas = document.getElementById('world');
var world = canvas.getContext('2d');

var $world = $('#world');

function GameWorld(height, width) {
  this.running = false;
  this.height= height;
  this.width= width;
  this.player = new Player();
  this.ceiling = [];
  this.floor = [];
  this.rocks = [];


  this.initObstacles = function(){
    for(var i = 0; i < 20; i++){
      this.ceiling.push(new Obstacle(20, 35, i*35, 0));
      this.floor.push(new Obstacle(20, 35, i*35, this.height-20));
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
  };

  this.reset = function(){

  };

  this.setGameOptions = function(){

  };

  this.shiftObstacles = function(){

  };

  this.clearWorld = function(){
    world.clearRect(0,0,this.width, this.height);
  };

  this.drawObstacles = function(){
    for(var i = 0; i < 20; i++){
      this.ceiling[i].draw();
      this.floor[i].draw();
    }
  };

  this.draw = function(){
    this.drawObstacles();
    this.player.draw();
  };
}

function Player(x, y, height, width){
  this.x = x || 200;
  this.y = y || 250;
  this.height = height || 20;
  this.width = width || 20;

}

Player.prototype.moveUp = function(){
  this.y = this.y-5;
};

Player.prototype.moveDown = function(){
  this.y++;
};

Player.prototype.draw = function(){
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


function Obstacle(height, width, x, y){
  this.height = height;
  this.width = width;
  this.x = x;
  this.y = y;
}

Obstacle.prototype.draw = function(){
  world.fillRect(this.x,this.y,this.width, this.height);
};

var gameWorld = new GameWorld(500,700);

gameWorld.init();

var timeout;

$world.on('mousedown',function(){

  if(gameWorld.running === false){
    gameWorld.running = true;
      requestAnimationFrame(function loop(){
        gameWorld.runGameLoop();
        gameWorld.draw();

        requestAnimationFrame(loop);
      });
  }


  timeout = setInterval(function(){
    gameWorld.player.moveUp();
  },10);


  return false;
});



$world.on('mouseup',function(){

  clearInterval(timeout);
  return false;
});
