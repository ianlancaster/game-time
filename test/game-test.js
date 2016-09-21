const assert = require('chai').assert;

const Game = require('../lib/game');
const World = require('../lib/world');

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
    it('game.mouseDown should be a method', function () {
      assert.isFunction(game.mouseDown, true);
    });
    it('game.mouseUp should be a method', function () {
      assert.isFunction(game.mouseUp, true);
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

  });
});
