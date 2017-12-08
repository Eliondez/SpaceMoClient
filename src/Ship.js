"use strict";

var Ship = function() {
  // var id = resources["http://localhost:8080/public/ships.json"].textures;
  // var hull = new Sprite(id["orangeship3.png"]);
  // hull.anchor.set(0.5, 0.5);
  // hull.position.set(0, 0);
  // hull.scale.x = 0.3;
  // hull.scale.y = 0.3;
  // var sprite = new Container();
  var sprite = new PIXI.Graphics();
  sprite.beginFill(0xffc107, 1);
  sprite.drawCircle(0, 0, 10);
  sprite.endFill();
  sprite.arc(0,0, 30, 0, Math.PI * 2);
  sprite.position.set(500, 300);
  sprite.vx = 0;
  sprite.vy = 0;
  sprite.targetPos = {
    x: 500,
    y: 275
  }
  // sprite.pewpew = false;
  // sprite.reload = 0;
  // sprite.reloadMax = 40;
  // sprite.linearVel = 1.0;
  sprite.update = function() {
    // var dist = Math.hypot(sprite.x - sprite.targetPos.x, sprite.y - sprite.targetPos.y);
    // if (dist > 5) {
    //   sprite.x += sprite.vx;
    //   sprite.y += sprite.vy;
    //   // sprite.x = Math.max(Math.min(sprite.x + sprite.vx, renderer.width - 30), 30);
    //   // sprite.y = Math.max(Math.min(sprite.y + sprite.vy, renderer.height - 50), 50);
    // }
          
    // if (sprite.reload > 0) {
    //   sprite.reload -= 1;
    // }

    // if (sprite.pewpew && sprite.reload === 0) {
    //   sprite.shoot();
    //   sprite.reload = sprite.reloadMax;
    // }
  }
  sprite.moveTo = function(target) {
    // sprite.targetPos.x = target.x;
    // sprite.targetPos.y = target.y;
    // var angle = Math.atan2(sprite.targetPos.x - sprite.x, sprite.y - sprite.targetPos.y);
    // sprite.rotation = angle
    // sprite.vx = Math.sin(angle) * sprite.linearVel;
    // sprite.vy = -Math.cos(angle) * sprite.linearVel;
  } 
  sprite.shoot = function() {
    // var nums = 50;
    // var angStep = 2 * Math.PI / nums;

    // for (var i = 0; i < nums; i++) {
    //   Bullet({
    //     x: sprite.x,
    //     y: sprite.y,
    //     angle: sprite.rotation + angStep * i
    //   })
    // }  
  }
  return sprite
}


export default Ship;
  // sprite.addChild(hull);