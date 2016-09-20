const assert = require('chai').assert;

const Obstacle = require('../lib/obstacle');
const Player = require('../lib/player');
const World = require('../lib/world');

describe('World', function () {
  context('default checks', function(){
    var world = new World();
    it('world should be a function', function () {
      assert.isFunction(World, true);
    });
    it('world should be an object', function () {
      assert.isObject(world, true);
    });
    it('world.initObstacles should be a method', function () {
      assert.isFunction(world.initObstacles, true);
    });
    it('world.drawObstacles should be a method', function () {
      assert.isFunction(world.drawObstacles, true);
    });
    it('world.init should be a method', function () {
      assert.isFunction(world.init, true);
    });
  
    it('world.reset should be a method', function () {
      assert.isFunction(world.reset, true);
    });
    // it('world.setGameOptions should be a method', function () {
    //   assert.isFunction(world.setGameOptions, true);
    // });
    it('world.createNewRock should be a method', function () {
      assert.isFunction(world.createNewRock, true);
    });
    it('world.moveObstacles should be a method', function () {
      assert.isFunction(world.moveObstacles, true);
    });
    // it('world.generateNewWallsHeight should be a method', function () {
    //   assert.isFunction(world.generateNewWallHeight, true);
    // });
    it('world.shiftWalls should be a method', function () {
      assert.isFunction(world.shiftWalls, true);
    });
    it('world.clearworld should be a method', function () {
      assert.isFunction(world.clearWorld, true);
    });
    it('World.drawObstacles should be a method', function () {
      assert.isFunction(world.drawObstacles, true);
    });
    it('world.draw should be a method', function () {
      assert.isFunction(world.draw, true);
    });
  });

  context('collision checks pre and post moves', function(){
    var world = new World();

    //Player(world, x, y, height, width, type, image){
    it('player starts safe, moves down, collides with obstacle', function(){

      var playerHitBoxes = [];
      playerHitBoxes[0] = new Player(null, 15, 4, 5, 5, "box");
      playerHitBoxes[1] = new Player(null, 15, 4, 5, 5, "box");
      playerHitBoxes[2] = new Player(null, 15, 4, 5, 5, "box");

      var obstacle = new Obstacle(World, playerHitBoxes, 10, 10, 10, 10);
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

      var obstacle = new Obstacle(world, playerHitBoxes, 10, 10, 10, 10);
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

      var obstacle = new Obstacle(world, playerHitBoxes, 10, 10, 10, 10);
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

      var obstacle = new Obstacle(world, playerHitBoxes, 10, 10, 10, 10);
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

      var obstacle = new Obstacle(world, playerHitBoxes, 10, 10, 10, 10);
      assert.equal(obstacle.collisionDetectAllBoxes(), false);
      obstacle.move();
      assert.equal(obstacle.collisionDetectAllBoxes(), true);
    });

    it('player starts safe, obstacle moves, still safe', function(){
      var playerHitBoxes = [];
      playerHitBoxes[0] = new Player(null, 0, 15, 5, 5, "box");
      playerHitBoxes[1] = new Player(null, 0, 15, 5, 5, "box");
      playerHitBoxes[2] = new Player(null, 0, 15, 5, 5, "box");
      var obstacle = new Obstacle(world, playerHitBoxes, 10, 10, 10, 10);
      obstacle.x = obstacle.speed + 1;

      assert.equal(obstacle.collisionDetectAllBoxes(), false);
      obstacle.move();
      assert.equal(obstacle.collisionDetectAllBoxes(), false);
    });


  });
});
