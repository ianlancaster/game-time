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
var spacebarPressed = false;

$document.ready(function(){
  game.world.loadImages();
  game.init();
  canvas.click();
});

$document.keypress(function(e){

  // upSound.play();

  if (e.keyCode === 0 || e.keyCode === 32) {
   e.preventDefault();

     if(spacebarPressed === false){
       spacebarPressed = true;
       game.spacebarDown();
       gameLoop();
       timeoutSpacebar = setInterval(function(){
          game.spacebarDown();
        },8);
     }
 }
});

$document.keyup(function(e){
  if (e.keyCode === 0 || e.keyCode === 32) {
   e.preventDefault();
   spacebarPressed = false;
   clearInterval(timeoutSpacebar);
   game.spacebarUp();
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
