function Obstacle(world, x, y, height, width){
  this.world = world;
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
}

Obstacle.prototype = {
  draw: function(){
    this.world.fillRect(this.x,this.y,this.width, this.height);
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


module.exports = Obstacle;
