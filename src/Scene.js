"use strict";
import 'pixi.js';

var Scene = function() {
  var self = {};

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
  loader.reset();
  loader
    .add("http://localhost:8080/public/ships.json")
    .add("http://localhost:8080/public/stars1.png")
    .add("http://localhost:8080/public/stars2.png")
    .load(setup);

  
  function setup() {
    createBg();
    var player_ship = createUser();
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
        // if (stage.checkCollision(bulletList[i], enemyList[j])) {
        //   bulletList[i].toDestroy = true;
        //   enemyList[j].toDestroy = true;
        // }
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
      stars1cont.y += 0.5;
      if (stars1cont.y > 800) {
        stars1cont.y = 0;
      }
      stars2cont.y += 0.8;
      if (stars2cont.y > 800) {
        stars2cont.y = 0;
      }
    }

    stage.addChild(bgCont);
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
    sprite.pewpew = false;
    sprite.reload = 0;
    sprite.reloadMax = 14;
    sprite.linearVel = 1.5;
    sprite.update = function() {
      sprite.x += sprite.vx;
      sprite.y += sprite.vy;
            
      if (sprite.reload > 0) {
        sprite.reload -= 1;
      }

      if (sprite.pewpew && sprite.reload === 0) {
        sprite.shoot();
        sprite.reload = sprite.reloadMax;
      }
    } 
    sprite.shoot = function() {
      var bullet = new PIXI.Graphics();
      bullet.id = Math.random();
      bullet.beginFill(0xffc107, 1);
      bullet.drawRect(-2, -4, 4, 8);
      bullet.endFill();
      bullet.position.set(sprite.x, sprite.y - 30);
      bullet.lifetime = 250;
      bullet.update = function() {
        bullet.y -= 3;
        bullet.lifetime -= 1;
        if (bullet.lifetime <= 0) {
          bullet.toDestroy = true;
        }
        if (bullet.toDestroy) {
          bullet.destroy();
          delete bulletList[bullet.id];
        }
      };

      bulletList[bullet.id] = bullet;
      stage.addChild(bullet);
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

  var createEnemies = function() {
    enemyList = {};
    var enemyNum = 17;
    var enemySpan = 50;
    var centerPosition = 500;
    var enemyWide = (enemyNum - 1) * enemySpan;
    for (var i = 0; i < enemyNum; i++) {
      var id = resources["http://localhost:8080/public/ships.json"].textures;
      var enemy = new Sprite(id["greenship3.png"]);
      var sprite = new Container();
      enemy.id = Math.random();
      enemy.position.set(centerPosition - enemyWide / 2 + i * 50, 100);
      enemy.rotation = Math.PI;
      enemy.scale.x = 0.2;
      enemy.scale.y = 0.2;
      enemy.update = function() {
        enemy.y += 0.5;
        if (enemy.toDestroy) {
          enemy.destroy();
          delete enemyList[enemy.id];
        }
      }
      stage.addChild(enemy);
      enemyList[enemy.id] = enemy;
    }
  }

  self.init = function () {
    console.log("Olala!!");
  }

  self.reload = function() {
    deleteAll();
    createBg();
    createUser();
    createEnemies();
  }
  return self;
}

export default Scene;