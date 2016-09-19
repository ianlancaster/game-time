var $ = require('jquery');
var GameWorld = require('./world');

var canvas = document.getElementById('world');
var world = canvas.getContext('2d');
var $world = $('#world');
var $document = $(document);

var gameWorld = new GameWorld(560,700, world);


// var timeoutMouse;
var timeoutSpacebar;
var mousePressed = false;

$document.ready(function(){
  gameWorld.loadImages();
  gameWorld.init();
});

$document.keypress(function(e){
  if (e.keyCode === 0 || e.keyCode === 32) {
   e.preventDefault();

     if(mousePressed === false){
       mousePressed = true;

       gameWorld.mouseDown();
       gameLoop();

       timeoutSpacebar = setInterval(function(){
          gameWorld.playerFish.moveUp();
          gameWorld.playerHitBoxes.forEach(function(hitBox){
              return hitBox.moveUp();
        });
        },8);
     }
 }
});

$document.keyup(function(e){
  if (e.keyCode === 0 || e.keyCode === 32) {
   e.preventDefault();
   mousePressed = false;
   clearInterval(timeoutSpacebar);
   gameWorld.mouseUp();
 }
});


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
