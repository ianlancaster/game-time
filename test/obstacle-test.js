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

  it('should collide if player bottom right corner overlaps wth objects top left', function(){
    var player = new Player(null, 6, 6, 5, 5);
    var obstacle = new Obstacle(gameWorld, player, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetect(), true);
  });

  it('should not collide if player bottom right corner does not overlap wth objects top left', function(){
    var player = new Player(null, 4, 4, 5, 5);
    var obstacle = new Obstacle(gameWorld, player, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetect(), false);

  });
  it('should collide if player bottom left corner overlaps wth objects top right', function(){
    var player = new Player(null, 19, 6, 5, 5);
    var obstacle = new Obstacle(gameWorld, player, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetect(), true);
  });
  it('should not collide if player bottom left corner does not overlap wth objects top right', function(){
    var player = new Player(null, 21, 4, 5, 5);
    var obstacle = new Obstacle(gameWorld, player, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetect(), false);

  });
  it('should collide if player top right corner overlaps wth objects bottom left', function(){
    var player = new Player(null, 6, 19, 5, 5);
    var obstacle = new Obstacle(gameWorld, player, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetect(), true);
  });
  it('should not collide if player top right corner does not overlap wth objects bottom left', function(){
    var player = new Player(null, 4, 21, 5, 5);
    var obstacle = new Obstacle(gameWorld, player, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetect(), false);
  });
  it('should collide if player top left corner overlaps wth objects bottom right ', function(){
    var player = new Player(null, 19, 19, 5, 5);
    var obstacle = new Obstacle(gameWorld, player, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetect(), true);
  });
  it('should not collide if player top left corner does not overlap wth objects bottom right ', function(){
    var player = new Player(null, 21, 21, 5, 5);
    var obstacle = new Obstacle(gameWorld, player, 10, 10, 10, 10);
    assert.equal(obstacle.collisionDetect(), false);
  });







  });
});
