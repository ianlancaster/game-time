const assert = require('chai').assert;

const Game = require('../lib/game');

describe('Game', function () {
  context('default checks', function(){
    var game = new Game();

    it('Game should be a function', function () {
      assert.isFunction(Game, true);
    });
    it('game should be an object', function () {
      assert.isObject(game, true);
    });
    it('game.init should be a method', function () {
      assert.isFunction(game.init, true);
    });
    it('game.spacebarDown should be a method', function () {
      assert.isFunction(game.spacebarDown, true);
    });
    it('game.spacebarUp should be a method', function () {
      assert.isFunction(game.spacebarUp, true);
    });
    it('game.gameFrame should be a method', function () {
      assert.isFunction(game.gameFrame, true);
    });
    it('game.increaseDifficulty should be a method', function () {
      assert.isFunction(game.increaseDifficulty, true);
    });
    it('game.increaseRockFrequency should be a method', function () {
      assert.isFunction(game.increaseRockFrequency, true);
    });
    it('game.randomizeRockCreation should be a method', function () {
      assert.isFunction(game.randomizeRockCreation, true);
    });
    it('game.generateNewRockHeight should be a method', function () {
      assert.isFunction(game.generateNewRockHeight, true);
    });
    it('game.generateNewWallHeight should be a method', function () {
      assert.isFunction(game.generateNewWallHeight, true);
    });
    it('game.executeMushroomFunctions should be a method', function () {
      assert.isFunction(game.executeMushroomFunctions, true);
    });
  });

  context('game checks', function(){
    var canvas = document.getElementById('world');
    var context = canvas.getContext('2d');
    var game = new Game(context);
    it('game.init should reset dificulty factor and distancecount', function () {
      game.difficultyFactor = 5;
      game.distanceCount = 3000;
      game.init();
      assert.equal(game.difficultyFactor, 1);
      assert.equal(game.distanceCount, 0);
    });

    it('spacebar.Down moves hitbox and player up', function(){
      var fishStart = game.world.playerFish.y;
      var hitboxStart = game.world.playerHitBoxes[0].y;
      game.spacebarDown();
      game.spacebarDown();
      var fishStop = game.world.playerFish.y;
      var hitboxStop = game.world.playerHitBoxes[0].y;
      assert.isAbove(fishStart, fishStop);
      assert.isAbove(hitboxStart, hitboxStop);
    });

    it('increaseDifficulty() increases the difficulty factor by .05', function(){
      game.distanceCount = 50;
      var startDifficulty = game.difficultyFactor;
      game.increaseDifficulty();
      assert.equal(game.difficultyFactor, startDifficulty+0.05);
    });

    it('increaeRockFrequency increases decreases the rock frequency factor by 10', function(){
      var startFrequency = game.rockFrequency;
      game.increaseRockFrequency();
      assert.equal(game.rockFrequency, startFrequency-10);
    });




  });
});
