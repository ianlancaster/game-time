function Player(world, x, y, height, width, type, image){
  this.world = world;
  this.x = x || 200;
  this.y = y || 250;
  this.height = height || 40;
  this.width = width || 100;
  this.type = type;
  this.image = image;
}


Player.prototype.moveUp = function(){
  this.y = this.y-3;
};

Player.prototype.moveDown = function(){
  this.y = this.y+3;
};

Player.prototype.draw = function(){

  console.log(this.type);

  if (this.type === "image") {
     this.world.drawImage(this.image,
       this.x,
       this.y,
       this.width, this.height);
   } else {
     this.world.clearRect(this.x,this.y,this.width, this.height);
     this.world.fillStyle = '#85253b';
     this.world.fillRect(this.x, this.y, this.width, this.height);
   }
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
