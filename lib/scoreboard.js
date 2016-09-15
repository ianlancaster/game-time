function Scoreboard(){

  this.currentScore = 0;
  this.highScore = 0;


  this.updateScore = function(distanceCount){
    this.currentScore = distanceCount;

    this.renderScores();
  };

  this.updateHighScore = function(){

  };

  this.renderScores = function(){
    //display scores on page
  };

  this.storeNewHighScore = function(){
    //store new high score in local storage
  };

  this.retrieveStoredHighScore = function(){

  };

}
