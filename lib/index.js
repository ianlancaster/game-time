var $ = require('jquery');
var Game = require('./game');

var canvas = document.getElementById('world');
var world = canvas.getContext('2d');
var $document = $(document);

var upSound = new Audio('./lib/audio/upSound.mp3');
var game = new Game(world);

  // tweezer.play();

// var timeoutMouse;
var timeoutSpacebar;
var mousePressed = false;

$document.ready(function(){
  game.world.loadImages();
  game.init();
  canvas.click();
});

$document.keypress(function(e){

  upSound.play();

  if (e.keyCode === 0 || e.keyCode === 32) {
   e.preventDefault();

     if(mousePressed === false){
       mousePressed = true;

       game.mouseDown();
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
   game.mouseUp();
 }
});


var gameLoop = function() {
  if(game.start === true){
    game.start = false;
    requestAnimationFrame(function loop(){

      game.gameFrame();
      if(game.running === true){
        requestAnimationFrame(loop);
      }else{
        game.world.renderEndText();
      }
    });
  }
};
