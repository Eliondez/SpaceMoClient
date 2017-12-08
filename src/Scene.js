"use strict";
import 'pixi.js';
import Entity from './Entity.js';
import Renderer from './renderer.js';
import Stage from './Stage.js';
import Background from './background.js';
import Ship from './Ship.js'


var Scene = function() {
  var self = {};
  var userScore = 0;
  var scoreObj;
  var player_ship;

  var state,
      enemyList,
      bulletList = {};

  var Container = PIXI.Container,
      loader = PIXI.loader,
      resources = PIXI.loader.resources,
      Sprite = PIXI.Sprite;

  var renderer = Renderer();
  var stage = Stage();

  stage.on('click', (event) => {
    var x = event.data.originalEvent.offsetX;
    var y = event.data.originalEvent.offsetY;
    // var angle = Math.atan2(x - player_ship.x, player_ship.y - y);
    // player_ship.moveTo({ x: x, y: y });
  });

  self.loadRes = function() {
    loader
      .add("http://localhost:8080/public/ships.json")
      .add("http://localhost:8080/public/stars1.png")
      .add("http://localhost:8080/public/stars2.png")
      .load(setup);
  }

  self.loadRes();

  
  function setup() {
    createBg();
    var ship = Ship();
    stage.addChild(ship);

    // createEnemies();
    // stage.checkCollision = function(ent1, ent2) {
    //   var colDist = 20;
    //   var dist = Math.hypot(ent1.x - ent2.x, ent1.y - ent2.y);
    //   if (dist < colDist) {
    //     return true;
    //   }
    //   return false;
    // }

    state = play;
    renderer.render(stage);
    gameLoop();
  };
  function gameLoop() {
    requestAnimationFrame(gameLoop);
    state();
    renderer.render(stage);
  }

  function play() {
    for (var i = stage.children.length - 1; i >= 0; i-- ) {
     stage.children[i].update();
    }
    // for (var i in bulletList) {
    //   for (var j in enemyList) {
    //     if (stage.checkCollision(bulletList[i], enemyList[j])) {
    //       bulletList[i].toDestroy = true;
    //       enemyList[j].toDestroy = true;
    //       userScore += 1;
    //       scoreObj.text = "Score: " + userScore;
    //     }
    //   }
    // }
  }

  var deleteAll = function() {
    bulletList = [];
    enemyList = [];
    for (var i = stage.children.length - 1; i >= 0; i-- ) {
      stage.removeChild(stage.children[i]);
    }
  }

  var createBg = function() {
    var bg = Background();
    stage.addChild(bg);
    // scoreObj = new PIXI.Text('Score: ' + userScore,{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
    // scoreObj.position.set(10, 10);
    // stage.addChild(scoreObj);
  }

  var Bullet = function(options) {
    var self = {
      id: Math.random(),
      lifetime: 30,
      angle: options.angle || 0,
      vel: 5
    }
    self.xVel = Math.sin(self.angle) * self.vel;
    self.yVel = -Math.cos(self.angle) * self.vel;

    var b_sprite = new PIXI.Graphics();
    b_sprite.beginFill(0xffc107, 1);
    b_sprite.drawRect(-2, -4, 4, 8);
    b_sprite.endFill();
    b_sprite.position.set(options.x, options.y);
    b_sprite.rotation = self.angle;

    self.sprite = b_sprite;
    self.sprite.update = function() {
      self.sprite.y += self.yVel;
      self.sprite.x += self.xVel;
      self.lifetime -= 1;
      if (self.lifetime <= 0) {
        self.sprite.toDestroy = true;
      }
      if (self.sprite.toDestroy) {
        self.sprite.destroy();
        delete bulletList[self.id];
      }
    };
    bulletList[self.id] = self.sprite;
    stage.addChild(self.sprite);
  }

  

  var createEnemies = function() {
    enemyList = {};
    var enemyNum = 17;
    var enemySpan = 50;
    var centerPosition = 500;
    var enemyWide = (enemyNum - 1) * enemySpan;
    var textures = resources["http://localhost:8080/public/ships.json"].textures;
    for (var i = 0; i < enemyNum; i++) {
      // var ent = Entity({
      //   textures: textures,
      //   x: 100 + Math.random() * (renderer.width - 200),
      //   y: 100 + Math.random() * (renderer.height - 200)
      // })
      // stage.addChild(ent.sprite);
      // Enemy({
      //   x: 100 + Math.random() * (renderer.width - 200),
      //   y: 100 + Math.random() * (renderer.height - 200)
      // })
    }
  }

  self.clearCache = function() {
    loader.reset();
  }

  self.reload = function() {
    deleteAll();
    createBg();
    createEnemies();
  }
  return self;
}

export default Scene;