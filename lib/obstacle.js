function Obstacle(world, playerHitBoxes, x, y, height, width, speed){
  this.world = world;
  this.playerHitBoxes = playerHitBoxes;
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.speed = speed || 4;
}

Obstacle.prototype = {
  draw: function(){
    // Create gradient
     var grd = this.world.createLinearGradient(0.000, 150.000, 600.000, 150.000);
     // Add colors
     grd.addColorStop(0.000, 'rgba(255, 0, 0, 1.000)');
     grd.addColorStop(0.150, 'rgba(255, 0, 255, 1.000)');
     grd.addColorStop(0.330, 'rgba(0, 0, 255, 1.000)');
     grd.addColorStop(0.490, 'rgba(0, 255, 255, 1.000)');
     grd.addColorStop(0.670, 'rgba(0, 255, 0, 1.000)');
     grd.addColorStop(0.840, 'rgba(255, 255, 0, 1.000)');
     grd.addColorStop(1.000, 'rgba(255, 0, 0, 1.000)');

    this.world.clearRect(this.x,this.y,this.width, this.height);
    this.world.fillStyle = grd;
    this.world.fillRect(this.x,this.y,this.width, this.height);

  },
  move : function(){
    this.x = this.x - this.speed;
  },
  moveUp: function(){

  },
  moveDown: function(){

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
