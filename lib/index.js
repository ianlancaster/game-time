var $ = require('jquery');
var GameWorld = require('./world');

var canvas = document.getElementById('world');
var world = canvas.getContext('2d');
var $world = $('#world');

var gameWorld = new GameWorld(500,700, world);

gameWorld.init();
var timeout;
var mousePressed = false;

$world.on('mousedown',function(event){
  event.preventDefault();
  switch(event.which){
    case 3:
      // gameWorld.pause
      break;
    default:
    if(mousePressed === false){
      mousePressed = true;

      gameWorld.mouseDown();
      gameLoop();

      timeout = setInterval(function(){
         gameWorld.player.moveUp();
       },8);
    }
  }
});

$world.on('mouseup',function(){
  mousePressed = false;
  clearInterval(timeout);
  gameWorld.mouseUp();
});


////something happens

var gameLoop = function() {
  if(gameWorld.start === true){
    gameWorld.start = false;
    requestAnimationFrame(function loop(){

      gameWorld.gameFrame();
      if(gameWorld.running === true){
        requestAnimationFrame(loop);
      }
    });
  }
};
