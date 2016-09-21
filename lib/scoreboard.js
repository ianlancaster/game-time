function Scoreboard(ctx){
  this.ctx = ctx;
  this.currentScore = 0;
  this.highScore = 0;

  this.incrementScore = function(){
    this.currentScore++;
  };

  this.resetScore = function(){
    this.currentScore = 0;
  };

  this.addValueToScore = function (value){
    this.currentScore = this.currentScore + value;
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
    this.ctx.fillStyle = 'black';
    this.ctx.font = "25px serif";
    this.ctx.fillText(currentScoreText, 25, 540);
    this.ctx.fillText(highScoreText, 450, 540);
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
