const assert = require('chai').assert;

const Player = require('../lib/player');
const World = require('../lib/world');


describe('Player Tests', function(){
  context('check player moves', function(){
    var gameWorld = new World();

    it('player should be a function', function(){
      assert.isFunction(Player, true);
    });

    it('should have a method called "moveUp()"', function (){
      var player = new Player(gameWorld, 200, 250, 20, 50);
      assert.isFunction(player.moveUp);
    });

    it('"moveUp()" should decrement the "y" property by 3', function () {
      var player = new Player(gameWorld, 200, 250, 20, 50);
      player.moveUp();
      assert.equal(player.y, 247);
    });

    it('should have a method called "moveDown()"', function (){
      var player = new Player(gameWorld, 200, 250, 20, 50);
      assert.isFunction(player.moveDown);
    });

    it('"moveDown()" should increment the "y" property by 3', function () {
      var player = new Player(gameWorld, 200, 250, 20, 50);
      player.moveDown();
      assert.equal(player.y, 253);
    });

    it('should have a method called "draw()"', function (){
      var player = new Player(gameWorld, 200, 250, 20, 50);
      assert.isFunction(player.draw);
    });

    it('should have a method called "topRight()"', function (){
        var player = new Player(gameWorld, 200, 250, 20, 50);
        assert.isFunction(player.topRight);
    });

    it('"topRight()" should return both the x,y coordinates of its top right corner', function(){
      var player = new Player(gameWorld, 200, 250, 20, 50);
      assert.equal(player.topRight().x, 250);
      assert.equal(player.topRight().y, 250);
    });

    it('should have a method called "topLeft()"', function (){
      var player = new Player(gameWorld, 200, 250, 20, 50);
      assert.isFunction(player.topLeft);
    });

    it('"topLeft()" should return both the x,y coordinates of its top right corner', function(){
      var player = new Player(gameWorld, 200, 250, 20, 50);
      assert.equal(player.topLeft().x, 200);
      assert.equal(player.topLeft().y, 250);
    });

    it('should have a method called "bottomRight()"', function (){
      var player = new Player(gameWorld, 200, 250, 20, 50);
      assert.isFunction(player.bottomRight);
    });

    it('"bottomRight()" should return both the x,y coordinates of its bottom right corner', function(){
      var player = new Player(gameWorld, 200, 250, 20, 50);
      assert.equal(player.bottomRight().x, 250);
      assert.equal(player.bottomRight().y, 270);
    });

    it('should have a method called "bottomLeft()"', function (){
      var player = new Player(gameWorld, 200, 250, 20, 50);
      assert.isFunction(player.bottomLeft);
    });

    it('"bottomLeft()" should return both the x,y coordinates of its bottom right corner', function(){
      var player = new Player(gameWorld, 200, 250, 20, 50);
      assert.equal(player.bottomLeft().x, 200);
      assert.equal(player.bottomLeft().y, 270);
    });
  });
});
