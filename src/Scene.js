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
  
  var sprite,
      state,
      // turret,
      centerLine,
      hull,
      bgCont,
      stars1cont,
      stars2cont,
      enemyList,
      bulletList;

  var Container = PIXI.Container,
      autoDetectRenderer = PIXI.autoDetectRenderer,
      loader = PIXI.loader,
      resources = PIXI.loader.resources,
      Sprite = PIXI.Sprite;

  var renderer = autoDetectRenderer(
    1000, 800,
    {antialias: true, transparent: false, resolution: 1}
  );
  renderer.view.style.border = "1px dashed black";
  renderer.backgroundColor = 0x000000;
  renderer.autoResize = true;
  renderer.resize(1000, 768)
  document.getElementById('canvas-container').appendChild(renderer.view);
  var stage = new Container();
  loader
    .add("http://localhost:8080/public/ships.json")
    .add("http://localhost:8080/public/stars1.png")
    .add("http://localhost:8080/public/stars2.png")
    .load(setup);

  function setup() {
    var id = resources["http://localhost:8080/public/ships.json"].textures;
    bgCont = new Container();
    stars1cont = new Container();
    var stars11 = new Sprite(resources["http://localhost:8080/public/stars1.png"].texture);
    stars11.position.set(0, 0);
    stars1cont.addChild(stars11);
    var stars12 = new Sprite(resources["http://localhost:8080/public/stars1.png"].texture);
    stars12.position.set(0, -800);
    stars1cont.addChild(stars12);

    stars2cont = new Container();
    var stars21 = new Sprite(resources["http://localhost:8080/public/stars2.png"].texture);
    stars21.position.set(0, 0);
    stars2cont.addChild(stars21);
    var stars22 = new Sprite(resources["http://localhost:8080/public/stars2.png"].texture);
    stars22.position.set(0, -800);
    stars2cont.addChild(stars22);
    bgCont.addChild(stars1cont);
    bgCont.addChild(stars2cont);
    stage.addChild(bgCont);
    
    enemyList = [];
    var enemyNum = 11;
    var enemySpan = 50;
    var centerPosition = 500;
    var enemyWide = (enemyNum - 1) * enemySpan;
    for (var i = 0; i < enemyNum; i++) {
      var id = resources["http://localhost:8080/public/ships.json"].textures;
      var enemy = new Sprite(id["greenship3.png"]);
      enemy.position.set(centerPosition - enemyWide / 2 + i * 50, 100);
      enemy.rotation = Math.PI;
      enemy.scale.x = 0.2;
      enemy.scale.y = 0.2;
      stage.addChild(enemy);
    }

    
    hull = new Sprite(id["orangeship3.png"]);
    hull.anchor.set(0.5, 0.5);
    hull.position.set(0, 0);
    hull.scale.x = 0.3;
    hull.scale.y = 0.3;

    // turret = new Sprite(id["turret_small.png"]);
    // turret.anchor.set(0.5, 0.6);
    // turret.position.set(0, -45);
    // turret.scale.x = 0.6;
    // turret.scale.y = 0.6;
    // turret.vRot = 0;

    // centerLine = new PIXI.Graphics();
    // centerLine.lineStyle(4, 0xFF00FF, 1);
    // centerLine.moveTo(0, 0);
    // centerLine.lineTo(0, -400);
    // centerLine.x = 512;
    // centerLine.y = 406;
    // stage.addChild(centerLine);
    

    sprite = new Container();
    sprite.position.set(500, 700);
    sprite.vx = 0;
    sprite.vy = 0;
    sprite.pewpew = false;
    sprite.reload = 0;
    sprite.reloadMax = 30;
    sprite.linearVel = 1.5; 
    sprite.addChild(hull);
    // sprite.addChild(turret);
    stage.addChild(sprite);

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
    // turret.rotation += turret.vRot * 0.05;
    sprite.x += sprite.vx;
    sprite.y += sprite.vy;
    stars1cont.y += 0.5;
    if (stars1cont.y > 800) {
      stars1cont.y = 0;
    }
    stars2cont.y += 0.8;
    if (stars2cont.y > 800) {
      stars2cont.y = 0;
    }
    if (sprite.reload > 0) {
      sprite.reload -= 1;
    }

    if (sprite.pewpew && sprite.reload === 0) {
      console.log("Shoot!");
      sprite.reload = sprite.reloadMax;
    }

  }

  self.init = function () {
    console.log("Olala!!");
  }
  return self;
}

export default Scene;