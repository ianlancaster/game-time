function Player(world, x, y, height, width, type, image){
  this.world = world;
  this.x = x || 180;
  this.y = y || 250;
  this.height = height || 40;
  this.width = width || 100;
  this.type = type;
  this.image = image;

}

Player.prototype = {
  moveUp: function(){
    this.y = this.y-3;
  },
  moveDown:  function(){
    this.y = this.y+3;
  },
  draw: function(){
    if (this.type === "image") {
      this.world.fillStyle = 'none';
       this.world.drawImage(this.image,
         this.x,
         this.y,
         this.width, this.height);
     } else {
       this.world.clearRect(this.x,this.y,this.width, this.height);
       this.world.fillStyle = 'none';
       this.world.fillRect(this.x, this.y, this.width, this.height);
     }
  },
  topRight:  function(){
    return {x:this.x+this.width, y:this.y};
  },
  topLeft: function(){
    return {x:this.x, y:this.y};
  },
  bottomRight: function(){
    return {x:this.x+this.width, y:this.y+this.height};
  },
  bottomLeft: function(){
    return {x:this.x, y:this.y+this.height};
  },
};

module.exports = Player;
