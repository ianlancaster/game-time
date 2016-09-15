function Player(world, x, y, height, width){
  this.world = world;
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
  this.world.clearRect(this.x,this.y,this.width, this.height);

  this.world.fillStyle = '#85253b';

  this.world.fillRect(this.x,this.y,this.width, this.height);
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


module.exports = Player;
