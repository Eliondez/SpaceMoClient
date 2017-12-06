"use strict";
import 'pixi.js';
import Entity from './Entity.js';

var Scene = function() {
  var self = {};
  var userScore = 0;
  var scoreObj;
  var player_ship;

  function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    key.downHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
    };

    key.upHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
    };
    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    );
    return key;
  }


  var left = keyboard(65),
      up = keyboard(87),
      right = keyboard(68),
      down = keyboard(83),
      fireBtn = keyboard(32);
  
  var state,
      // turret,
      centerLine,
      enemyList,
      bulletList = {};

  var Container = PIXI.Container,
      autoDetectRenderer = PIXI.autoDetectRenderer,
      loader = PIXI.loader,
      resources = PIXI.loader.resources,
      Sprite = PIXI.Sprite;

  var renderer = autoDetectRenderer(
    1000, 600,
    {antialias: true, transparent: false, resolution: 1}
  );
  renderer.view.style.border = "1px dashed black";
  renderer.backgroundColor = 0x000000;
  renderer.autoResize = true;
  renderer.resize(1000, 600)
  document.getElementById('canvas-container').appendChild(renderer.view);
  var stage = new Container();
  stage.interactive = true;

  for (var i = 0; i < 5; i++) {
    Entity();
  }
  stage.on('click', (event) => {
    var x = event.data.originalEvent.offsetX;
    var y = event.data.originalEvent.offsetY;
    var angle = Math.atan2(x - player_ship.x, player_ship.y - y);
    player_ship.moveTo({ x: x, y: y });
    // console.log(x, y);
    // Bullet({
    //   x: player_ship.x,
    //   y: player_ship.y,
    //   angle: angle
    // })
  });
  stage.on('rightclick', (event) => {
    event.data.originalEvent.preventDefault();
    console.log("Right click detected!!!");
    
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
    player_ship = createUser();
    bindKeys(player_ship);
    createEnemies();
    stage.checkCollision = function(ent1, ent2) {
      var colDist = 20;
      var dist = Math.hypot(ent1.x - ent2.x, ent1.y - ent2.y);
      if (dist < colDist) {
        return true;
      }
      return false;
    }
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
    for (var i in bulletList) {
      for (var j in enemyList) {
        if (stage.checkCollision(bulletList[i], enemyList[j])) {
          bulletList[i].toDestroy = true;
          enemyList[j].toDestroy = true;
          userScore += 1;
          scoreObj.text = "Score: " + userScore;
        }
      }
    }
  }

  var deleteAll = function() {
    bulletList = [];
    enemyList = [];
    for (var i = stage.children.length - 1; i >= 0; i-- ) {
      stage.removeChild(stage.children[i]);
    }
  }

  var createBg = function() {
    var bgCont = new Container();
    var stars1cont = new Container();
    var stars11 = new Sprite(resources["http://localhost:8080/public/stars1.png"].texture);
    stars11.position.set(0, 0);
    stars1cont.addChild(stars11);
    var stars12 = new Sprite(resources["http://localhost:8080/public/stars1.png"].texture);
    stars12.position.set(0, -800);
    stars1cont.addChild(stars12);
    var stars2cont = new Container();
    var stars21 = new Sprite(resources["http://localhost:8080/public/stars2.png"].texture);
    stars21.position.set(0, 0);
    stars2cont.addChild(stars21);
    var stars22 = new Sprite(resources["http://localhost:8080/public/stars2.png"].texture);
    stars22.position.set(0, -800);
    stars2cont.addChild(stars22);
    bgCont.addChild(stars1cont);
    bgCont.addChild(stars2cont);

    bgCont.update = function() {
      stars1cont.y += 0.01;
      if (stars1cont.y > 800) {
        stars1cont.y = 0;
      }
      stars2cont.y += 0.02;
      if (stars2cont.y > 800) {
        stars2cont.y = 0;
      }
    }

    stage.addChild(bgCont);
    scoreObj = new PIXI.Text('Score: ' + userScore,{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
    // scoreObj.anchor.set(0.5, 0.5);
    scoreObj.position.set(10, 10);
    scoreObj.update = function() {

    };
    scoreObj.interactive = true;
    scoreObj.buttonMode = true;
    scoreObj.cursor = 'wait';
    stage.addChild(scoreObj);
  }

  var createUser = function() {
    var id = resources["http://localhost:8080/public/ships.json"].textures;
    var hull = new Sprite(id["orangeship3.png"]);
    hull.anchor.set(0.5, 0.5);
    hull.position.set(0, 0);
    hull.scale.x = 0.3;
    hull.scale.y = 0.3;
    var sprite = new Container();
    sprite.position.set(500, 550);
    sprite.vx = 0;
    sprite.vy = 0;
    sprite.targetPos = {
      x: 500,
      y: 550
    }
    sprite.pewpew = false;
    sprite.reload = 0;
    sprite.reloadMax = 40;
    sprite.linearVel = 1.0;
    sprite.update = function() {
      var dist = Math.hypot(sprite.x - sprite.targetPos.x, sprite.y - sprite.targetPos.y);
      if (dist > 5) {
        sprite.x += sprite.vx;
        sprite.y += sprite.vy;
        // sprite.x = Math.max(Math.min(sprite.x + sprite.vx, renderer.width - 30), 30);
        // sprite.y = Math.max(Math.min(sprite.y + sprite.vy, renderer.height - 50), 50);
      }
            
      if (sprite.reload > 0) {
        sprite.reload -= 1;
      }

      if (sprite.pewpew && sprite.reload === 0) {
        sprite.shoot();
        sprite.reload = sprite.reloadMax;
      }
    }
    sprite.moveTo = function(target) {
      sprite.targetPos.x = target.x;
      sprite.targetPos.y = target.y;
      var angle = Math.atan2(sprite.targetPos.x - sprite.x, sprite.y - sprite.targetPos.y);
      sprite.rotation = angle
      sprite.vx = Math.sin(angle) * sprite.linearVel;
      sprite.vy = -Math.cos(angle) * sprite.linearVel;
    } 
    sprite.shoot = function() {
      var nums = 50;
      var angStep = 2 * Math.PI / nums;

      for (var i = 0; i < nums; i++) {
        Bullet({
          x: sprite.x,
          y: sprite.y,
          angle: sprite.rotation + angStep * i
        })
      }  
    }

    sprite.addChild(hull);
    stage.addChild(sprite);

    return sprite;
  }

  var bindKeys = function(sprite) {
    up.press = function() {
      sprite.vy -= sprite.linearVel;
    };

    up.release = function() {
      sprite.vy += sprite.linearVel;
    }

    down.press = function() {
      sprite.vy += sprite.linearVel;
    };

    down.release = function() {
      sprite.vy -= sprite.linearVel;
    }

    left.press = function() {
      sprite.vx -= sprite.linearVel;
      // turret.vRot = -1;
    };

    left.release = function() {
      sprite.vx += sprite.linearVel;
      // turret.vRot = 0;
    }
    right.press = function() {
      sprite.vx += sprite.linearVel;
      // turret.vRot = 1;
    };

    right.release = function() {
      sprite.vx -= sprite.linearVel;
      // turret.vRot = 0;
    }
    fireBtn.press = function() {
      sprite.pewpew = true;
    };

    fireBtn.release = function() {
      sprite.pewpew = false;
    }
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
    // b_sprite.anchor.set(0.5, 0.5);

    self.sprite = b_sprite;
    // self.sprite.zOrder = 100;
    console.log(self.sprite.zOrder);
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

  var Enemy = function(options) {
    var ships_textures = resources["http://localhost:8080/public/ships.json"].textures;
    var self = {
      id: Math.random(),
      sprite: new Sprite(ships_textures["greenship3.png"])
    }
    self.sprite.position.set(options.x, options.y);
    self.sprite.rotation = options.rotation || Math.PI;
    self.sprite.scale.x = options.scale || 0.2;
    self.sprite.scale.y = options.scale || 0.2;
    self.sprite.anchor.set(0.5, 0.5);

    self.vx = 0;
    self.vy = 0;
    self.targetPos = {
      x: options.x,
      y: options.y
    }
    self.linearVel = 0.5;

    self.sprite.update = function() {

      var dist = Math.hypot(self.sprite.x - self.targetPos.x, self.sprite.y - self.targetPos.y);
      if (dist > 5) {
        self.sprite.x += self.vx;
        self.sprite.y += self.vy;
      } else {
        self.moveTo({
          x: self.sprite.x + Math.random() * 200 - 100,
          y: self.sprite.y + Math.random() * 200 - 100
        })
      }

      self.sprite.y += self.vy;
      self.sprite.x += self.vx;

      if (self.sprite.toDestroy) {
        self.sprite.destroy();
        delete enemyList[self.id];
      }
    }
    self.moveTo = function(target) {
      self.targetPos.x = target.x;
      self.targetPos.y = target.y;
      var angle = Math.atan2(self.targetPos.x - self.sprite.x, self.sprite.y - self.targetPos.y);
      self.sprite.rotation = angle
      self.vx = Math.sin(angle) * self.linearVel;
      self.vy = -Math.cos(angle) * self.linearVel;
    }
    stage.addChild(self.sprite);
    enemyList[self.id] = self.sprite;
    return self;
  }

  var createEnemies = function() {
    enemyList = {};
    var enemyNum = 17;
    var enemySpan = 50;
    var centerPosition = 500;
    var enemyWide = (enemyNum - 1) * enemySpan;
    for (var i = 0; i < enemyNum; i++) {
      Enemy({
        x: 100 + Math.random() * (renderer.width - 200),
        y: 100 + Math.random() * (renderer.height - 200)
      })
    }
  }

  self.clearCache = function() {
    loader.reset();

  }

  self.reload = function() {
    deleteAll();
    createBg();
    player_ship = createUser();
    bindKeys(player_ship);
    createEnemies();
  }
  return self;
}

export default Scene;