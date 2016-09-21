function Scoreboard(ctx){
  this.ctx = ctx;
  this.currentScore = 0;
  this.highScore = 0;
  this.showingMushroomBonus = false;

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



  // this.renderMushroomBonus = function(){
  //   var mushroomBonusText = "+500!";
  //   this.ctx.fillStyle = 'red';
  //   this.ctx.font = "25px serif";
  //   this.ctx.fillText(mushroomBonusText, 200, 540);
  // };

  this.clearMushroomBonus = function(){
    this.ctx.clearRect(450, 540);
  };

  this.renderScores = function(showMushroomText){
    //display scores on page
    var currentScoreText = "Score: "+this.currentScore;
    var highScoreText = "Your High Score: "+this.highScore;
    this.ctx.fillStyle = 'black';
    this.ctx.font = "23px 'Trebuchet MS'";
    this.ctx.fillText(currentScoreText, 25, 540);
    this.ctx.fillText(highScoreText, 450, 540);

    if(showMushroomText === true){
      var mushroomBonusText = "+500!";
      this.ctx.fillStyle = 'red';
      this.ctx.font = "23px 'Trebuchet MS'";
      this.ctx.fillText(mushroomBonusText, 160, 540);
    }
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
