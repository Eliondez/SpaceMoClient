"use strict";

var Ship = function() {
  // var id = resources["http://localhost:8080/public/ships.json"].textures;
  // var hull = new Sprite(id["orangeship3.png"]);
  // hull.anchor.set(0.5, 0.5);
  // hull.position.set(0, 0);
  // hull.scale.x = 0.3;
  // hull.scale.y = 0.3;
  // var sprite = new Container();
  var sprite = new PIXI.Container();
  var hull = new PIXI.Graphics();
  hull.rotAngle = 0;
 
  hull.beginFill(0xffc107, 1);

  // var tX = Math.sin(angle) * self.linearVel;
  // var angle = Math.atan2(self.targetPos.x - self.sprite.x, self.sprite.y - self.targetPos.y);
  //     self.sprite.rotation = angle
  //     self.vx = Math.sin(angle) * self.linearVel;
  //     self.vy = -Math.cos(angle) * self.linearVel;

  hull.drawCircle(0, -10, 10);
  hull.drawRect(-10, -10, 20, 20);
  hull.drawCircle(0, 10, 10);
  hull.endFill();
  hull.lineStyle(0.5, 0xff00ff, 1);
  hull.arc(0, 0, 35, 0, Math.PI*2);
  sprite.addChild(hull);


  sprite.vx = 0;
  sprite.vy = -1;
  sprite.position.set(500, 300);
  sprite.targetPos = {
    x: 500,
    y: 275
  }
  // sprite.pewpew = false;
  // sprite.reload = 0;
  // sprite.reloadMax = 40;
  // sprite.linearVel = 1.0;
  sprite.update = function() {
    var dist = Math.hypot(sprite.x - sprite.targetPos.x, sprite.y - sprite.targetPos.y);
    if (dist > 5) {
      sprite.x += sprite.vx;
      sprite.y += sprite.vy;
    }
          
    // if (sprite.reload > 0) {
    //   sprite.reload -= 1;
    // }

    // if (sprite.pewpew && sprite.reload === 0) {
    //   sprite.shoot();
    //   sprite.reload = sprite.reloadMax;
    // }
  }
  // sprite.moveTo = function(target) {
  //   sprite.targetPos.x = target.x;
  //   sprite.targetPos.y = target.y;
  //   var angle = Math.atan2(sprite.targetPos.x - sprite.x, sprite.y - sprite.targetPos.y);
  //   sprite.rotation = angle
  //   sprite.vx = Math.sin(angle) * sprite.linearVel;
  //   sprite.vy = -Math.cos(angle) * sprite.linearVel;
  // } 
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