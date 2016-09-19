const assert = require('chai').assert;

const Obstacle = require('../lib/obstacle');
const Player = require('../lib/player');
const World = require('../lib/world');

describe('GameWorld', function () {
  context('default checks', function(){
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
    it('gameWorld.generateNewWallsHeight should be a method', function () {
      assert.isFunction(gameWorld.generateNewWallHeight, true);
    });
    it('gameWorld.shiftWalls should be a method', function () {
      assert.isFunction(gameWorld.shiftWalls, true);
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

  context('collision checks pre and post moves', function(){
    var gameWorld = new World();

    //Player(world, x, y, height, width, type, image){
    it('player starts safe, moves down, collides with obstacle', function(){

      var playerHitBoxes = [];
      playerHitBoxes[0] = new Player(null, 15, 4, 5, 5, "box");
      playerHitBoxes[1] = new Player(null, 15, 4, 5, 5, "box");
      playerHitBoxes[2] = new Player(null, 15, 4, 5, 5, "box");

      var obstacle = new Obstacle(gameWorld, playerHitBoxes, 10, 10, 10, 10);
      assert.equal(obstacle.collisionDetectAllBoxes(), false);
      playerHitBoxes[0].moveDown();
      playerHitBoxes[1].moveDown();
      playerHitBoxes[2].moveDown();
      assert.equal(obstacle.collisionDetectAllBoxes(), true);
    });

    it('player starts safe, moves down, still safe', function(){

      var playerHitBoxes = [];
      playerHitBoxes[0] = new Player(null, 15, 1, 5, 5, "box");
      playerHitBoxes[1] = new Player(null, 15, 1, 5, 5, "box");
      playerHitBoxes[2] = new Player(null, 15, 1, 5, 5, "box");

      var obstacle = new Obstacle(gameWorld, playerHitBoxes, 10, 10, 10, 10);
      assert.equal(obstacle.collisionDetectAllBoxes(), false);
      playerHitBoxes[0].moveDown();
      playerHitBoxes[1].moveDown();
      playerHitBoxes[2].moveDown();
      assert.equal(obstacle.collisionDetectAllBoxes(), false);
    });

    it('player starts safe, moves up, collides with obstacle', function(){

      var playerHitBoxes = [];
      playerHitBoxes[0] = new Player(null, 15, 22, 5, 5, "box");
      playerHitBoxes[1] = new Player(null, 15, 22, 5, 5, "box");
      playerHitBoxes[2] = new Player(null, 15, 22, 5, 5, "box");

      var obstacle = new Obstacle(gameWorld, playerHitBoxes, 10, 10, 10, 10);
      assert.equal(obstacle.collisionDetectAllBoxes(), false);
      playerHitBoxes[0].moveUp();
      playerHitBoxes[1].moveUp();
      playerHitBoxes[2].moveUp();
      assert.equal(obstacle.collisionDetectAllBoxes(), true);
    });

    it('player starts safe, moves up, still safe', function(){
      var playerHitBoxes = [];
      playerHitBoxes[0] = new Player(null, 15, 25, 5, 5, "box");
      playerHitBoxes[1] = new Player(null, 15, 25, 5, 5, "box");
      playerHitBoxes[2] = new Player(null, 15, 25, 5, 5, "box");

      var obstacle = new Obstacle(gameWorld, playerHitBoxes, 10, 10, 10, 10);
      assert.equal(obstacle.collisionDetectAllBoxes(), false);
      playerHitBoxes[0].moveUp();
      playerHitBoxes[1].moveUp();
      playerHitBoxes[2].moveUp();
      assert.equal(obstacle.collisionDetectAllBoxes(), false);
    });

    it('player starts safe, obstacle moves, collides with obstacle', function(){
      var playerHitBoxes = [];
      playerHitBoxes[0] = new Player(null, 4, 15, 5, 5, "box");
      playerHitBoxes[1] = new Player(null, 4, 15, 5, 5, "box");
      playerHitBoxes[2] = new Player(null, 4, 15, 5, 5, "box");

      var obstacle = new Obstacle(gameWorld, playerHitBoxes, 10, 10, 10, 10);
      assert.equal(obstacle.collisionDetectAllBoxes(), false);
      obstacle.move();
      assert.equal(obstacle.collisionDetectAllBoxes(), true);
    });

    it('player starts safe, obstacle moves, still safe', function(){
      var playerHitBoxes = [];
      playerHitBoxes[0] = new Player(null, 0, 15, 5, 5, "box");
      playerHitBoxes[1] = new Player(null, 0, 15, 5, 5, "box");
      playerHitBoxes[2] = new Player(null, 0, 15, 5, 5, "box");
      var obstacle = new Obstacle(gameWorld, playerHitBoxes, 10, 10, 10, 10);
      obstacle.x = obstacle.speed + 1;

      assert.equal(obstacle.collisionDetectAllBoxes(), false);
      obstacle.move();
      assert.equal(obstacle.collisionDetectAllBoxes(), false);
    });


  });
});
