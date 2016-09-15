function Scoreboard(world){
  this.world = world;
  this.currentScore = 0;
  this.highScore = 0;

  this.updateScore = function(distanceCount){
    this.currentScore = distanceCount;
    this.renderScores();
  };

  this.updateHighScore = function(){
    if(this.currentScore > this.highScore){
      this.highScore = this.currentScore;
      this.storeNewHighScore();
    }
    this.renderScores();
  };

  this.renderScores = function(){
    //display scores on page
    var currentScoreText = "Score: "+this.currentScore;
    var highScoreText = "Your High Score: "+this.highScore;
    this.world.fillStyle = 'black';
    this.world.font = "25px serif";
    this.world.fillText(currentScoreText, 25, 540);
    this.world.fillText(highScoreText, 450, 540);
  };

  this.storeNewHighScore = function(){
    //store new high score in local storage
    localStorage.setItem('highScore', this.highScore);
  };

  this.retrieveStoredHighScore = function(){
    this.highScore = localStorage.getItem('highScore');
  };

}

module.exports = Scoreboard;
