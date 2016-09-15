function Obstacle(world, playerHitBoxes, x, y, height, width){
  this.world = world;
  this.playerHitBoxes = playerHitBoxes;
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
}

Obstacle.prototype = {
  draw: function(){

    this.world.clearRect(this.x,this.y,this.width, this.height);
    this.world.fillStyle = '#5E9732';
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
  },
  collisionDetect : function(player){
    var obsLeft = this.topLeft().x;
    var obsRight = this.topRight().x;
    var obsTop = this.topLeft().y;
    var obsBottom = this.bottomRight().y;
    var collision = true;

    var playerLeft = player.topLeft().x;
    var playerRight = player.topRight().x;
    var playerTop = player.topLeft().y;
    var playerBottom = player.bottomRight().y;

      if ((playerRight < obsLeft) || (playerLeft > obsRight)){
        collision = false;
      }if ((playerBottom < obsTop) || (playerTop > obsBottom)){
        collision = false;
      }


      return collision;

  },

  collisionDetectAllBoxes : function(){

    var results = [];

    this.playerHitBoxes.forEach(function(player){
      results.push(this.collisionDetect(player));
    }.bind(this));

      return results.includes(true);
  }
};


module.exports = Obstacle;
