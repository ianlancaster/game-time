const assert = require('chai').assert;

const Obstacle = require('../lib/obstacle');
const Player = require('../lib/player');
const World = require('../lib/world');


describe('Obstacle', function(){
  context('check obstacle functions', function(){
  var gameWorld = new World();

  it('should be a function', function(){
    assert.isFunction(Obstacle, true);
  });

  it('should have a method called "draw()"', function (){
    var player = new Player(gameWorld, 200, 250, 20, 50);
    var obstacle = new Obstacle(gameWorld, player, 200, 250, 20, 50);
    assert.isFunction(obstacle.draw);
  });

  it('should have a method called "topRight()"', function (){
    var player = new Player(gameWorld, 200, 250, 20, 50);
    var obstacle = new Obstacle(gameWorld, player, 200, 250, 20, 50);
      assert.isFunction(obstacle.topRight);
  });

  it('"topRight()" should return both the x,y coordinates of its top right corner', function(){
    var player = new Player(gameWorld, 200, 250, 20, 50);
    var obstacle = new Obstacle(gameWorld, player, 200, 250, 20, 50);

    assert.equal(obstacle.topRight().x, 250);
    assert.equal(obstacle.topRight().y, 250);
  });

  it('should have a method called "topLeft()"', function (){
    var player = new Player(gameWorld, 200, 250, 20, 50);
    var obstacle = new Obstacle(gameWorld, player, 200, 250, 20, 50);
    assert.isFunction(obstacle.topLeft);
  });

  it('"topLeft()" should return both the x,y coordinates of its top right corner', function(){
    var player = new Player(gameWorld, 200, 250, 20, 50);
    var obstacle = new Obstacle(gameWorld, player, 200, 250, 20, 50);
    assert.equal(obstacle.topLeft().x, 200);
    assert.equal(obstacle.topLeft().y, 250);
  });

  it('should have a method called "bottomRight()"', function (){
    var player = new Player(gameWorld, 200, 250, 20, 50);
    var obstacle = new Obstacle(gameWorld, player, 200, 250, 20, 50);
    assert.isFunction(obstacle.bottomRight);
  });

  it('"bottomRight()" should return both the x,y coordinates of its bottom right corner', function(){
    var player = new Player(gameWorld, 200, 250, 20, 50);
    var obstacle = new Obstacle(gameWorld, player, 200, 250, 20, 50);
    assert.equal(obstacle.bottomRight().x, 250);
    assert.equal(obstacle.bottomRight().y, 270);
  });

  it('should have a method called "bottomLeft()"', function (){
    var player = new Player(gameWorld, 200, 250, 20, 50);
    var obstacle = new Obstacle(gameWorld, player, 200, 250, 20, 50);
    assert.isFunction(obstacle.bottomLeft);
  });

  it('"bottomLeft()" should return both the x,y coordinates of its bottom right corner', function(){
    var player = new Player(gameWorld, 200, 250, 20, 50);
    var obstacle = new Obstacle(gameWorld, player, 200, 250, 20, 50);
    assert.equal(obstacle.bottomLeft().x, 200);
    assert.equal(obstacle.bottomLeft().y, 270);
  });
//need to create player hit boxes
  it('should collide if player bottom right corner overlaps wth objects top left', function(){
    var playerHitBoxes = [];
    playerHitBoxes[0] = new Player(null, 6, 6, 5, 5, "box");
    playerHitBoxes[1] = new Player(null, 6, 6, 5, 5, "box");
    playerHitBoxes[2] = new Player(null, 6, 6, 5, 5, "box");
    var obstacle = new Obstacle(gameWorld, playerHitBoxes, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetectAllBoxes(), true);
  });

  it('should not collide if player bottom right corner does not overlap wth objects top left', function(){
    var playerHitBoxes = [];
    playerHitBoxes[0] = new Player(null, 6, 6, 5, 5, "box");
    playerHitBoxes[1] = new Player(null, 6, 6, 5, 5, "box");
    playerHitBoxes[2] = new Player(null, 6, 6, 5, 5, "box");
    var obstacle = new Obstacle(gameWorld, playerHitBoxes, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetectAllBoxes(), true);
  });
  it('should collide if player bottom left corner overlaps wth objects top right', function(){
    var playerHitBoxes = [];
    playerHitBoxes[0] = new Player(null, 19, 6, 5, 5, "box");
    playerHitBoxes[1] = new Player(null, 19, 6, 5, 5, "box");
    playerHitBoxes[2] = new Player(null, 19, 6, 5, 5, "box");
    var obstacle = new Obstacle(gameWorld, playerHitBoxes, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetectAllBoxes(), true);
  });
  it('should not collide if player bottom left corner does not overlap wth objects top right', function(){
    var playerHitBoxes = [];
    playerHitBoxes[0] = new Player(null, 21, 4, 5, 5, "box");
    playerHitBoxes[1] = new Player(null, 21, 4, 5, 5, "box");
    playerHitBoxes[2] = new Player(null, 21, 4, 5, 5, "box");
    var obstacle = new Obstacle(gameWorld, playerHitBoxes, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetectAllBoxes(), false);
  });
  it('should collide if player top right corner overlaps wth objects bottom left', function(){
    var playerHitBoxes = [];
    playerHitBoxes[0] = new Player(null, 6, 19, 5, 5, "box");
    playerHitBoxes[1] = new Player(null, 6, 19, 5, 5, "box");
    playerHitBoxes[2] = new Player(null, 6, 19, 5, 5, "box");
    var obstacle = new Obstacle(gameWorld, playerHitBoxes, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetectAllBoxes(), true);
  });

  it('should not collide if player top right corner does not overlap wth objects bottom left', function(){
    var playerHitBoxes = [];
    playerHitBoxes[0] = new Player(null, 4, 21, 5, 5, "box");
    playerHitBoxes[1] = new Player(null, 4, 21, 5, 5, "box");
    playerHitBoxes[2] = new Player(null, 4, 21, 5, 5, "box");
    var obstacle = new Obstacle(gameWorld, playerHitBoxes, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetectAllBoxes(), false);
  });

  it('should collide if player top left corner overlaps wth objects bottom right ', function(){
    var playerHitBoxes = [];
    playerHitBoxes[0] = new Player(null, 19, 19, 5, 5, "box");
    playerHitBoxes[1] = new Player(null, 19, 19, 5, 5, "box");
    playerHitBoxes[2] = new Player(null, 19, 19, 5, 5, "box");
    var obstacle = new Obstacle(gameWorld, playerHitBoxes, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetectAllBoxes(), true);

  });
  it('should not collide if player top left corner does not overlap wth objects bottom right ', function(){
    var playerHitBoxes = [];
    playerHitBoxes[0] = new Player(null, 21, 21, 5, 5, "box");
    playerHitBoxes[1] = new Player(null, 21, 21, 5, 5, "box");
    playerHitBoxes[2] = new Player(null, 21, 21, 5, 5, "box");
    var obstacle = new Obstacle(gameWorld, playerHitBoxes, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetectAllBoxes(), false);
  });


  });
});
