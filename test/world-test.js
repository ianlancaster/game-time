const assert = require('chai').assert;

const Obstacle = require('../lib/obstacle');
const Player = require('../lib/player');
const World = require('../lib/world');

describe('GameWorld', function () {
  context('default', function(){
    var gameWorld = new World();
    it('World should be a function', function () {
      assert.isFunction(World, true);
    });
    it('GameWorld should be an object', function () {
      assert.isObject(gameWorld, true);
    });
    it('gameWorld.initObstacles should be a method', function () {
      assert.isFunction(gameWorld.initObstacles, true);
    });
    it('gameWorld.drawObstacles should be a method', function () {
      assert.isFunction(gameWorld.drawObstacles, true);
    });
    it('gameWorld.init should be a method', function () {
      assert.isFunction(gameWorld.init, true);
    });
    it('gameWorld.mouseDown should be a method', function () {
      assert.isFunction(gameWorld.mouseDown, true);
    });
    it('gameWorld.mouseUp should be a method', function () {
      assert.isFunction(gameWorld.mouseUp, true);
    });
    it('gameWorld.gameFrame should be a method', function () {
      assert.isFunction(gameWorld.gameFrame, true);
    });
    it('gameWorld.reset should be a method', function () {
      assert.isFunction(gameWorld.reset, true);
    });
    it('gameWorld.setGameOptions should be a method', function () {
      assert.isFunction(gameWorld.setGameOptions, true);
    });
    it('gameWorld.createNewRock should be a method', function () {
      assert.isFunction(gameWorld.createNewRock, true);
    });
    it('gameWorld.moveObstacles should be a method', function () {
      assert.isFunction(gameWorld.moveObstacles, true);
    });
    it('gameWorld.generateNewObstacleHeight should be a method', function () {
      assert.isFunction(gameWorld.generateNewObstacleHeight, true);
    });
    it('gameWorld.shiftObstacles should be a method', function () {
      assert.isFunction(gameWorld.shiftObstacles, true);
    });
    it('gameWorld.clearWorld should be a method', function () {
      assert.isFunction(gameWorld.clearWorld, true);
    });
    it('gameWorld.drawObstacles should be a method', function () {
      assert.isFunction(gameWorld.drawObstacles, true);
    });
    it('gameWorld.draw should be a method', function () {
      assert.isFunction(gameWorld.draw, true);
    });
  });
});
