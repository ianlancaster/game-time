var $ = require('jquery');
var Game = require('./game');

var canvas = document.getElementById('world');
var world = canvas.getContext('2d');
var $document = $(document);

var game = new Game(world);



// var timeoutMouse;
var timeoutSpacebar;
var mousePressed = false;

$document.ready(function(){
  game.world.loadImages();
  game.world.init();
});

$document.keypress(function(e){
  if (e.keyCode === 0 || e.keyCode === 32) {
   e.preventDefault();

     if(mousePressed === false){
       mousePressed = true;

       game.world.mouseDown();
       gameLoop();

       timeoutSpacebar = setInterval(function(){
          game.world.playerFish.moveUp();
          game.world.playerHitBoxes.forEach(function(hitBox){
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
   game.world.mouseUp();
 }
});


var gameLoop = function() {
  if(game.world.start === true){
    game.world.start = false;
    requestAnimationFrame(function loop(){

      game.world.gameFrame();
      if(game.world.running === true){
        requestAnimationFrame(loop);
      }else{
        game.world.renderEndText();
      }
    });
  }
};
