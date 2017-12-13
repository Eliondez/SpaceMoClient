"use strict";
import {Entity, addSprite} from './Entity.js';

var Ship = function() {
  var sprite = new PIXI.Container();
  var hull = new PIXI.Graphics();
  hull.rotAngle = 0;
  hull.beginFill(0xffc107, 1);
  hull.drawCircle(0, -5, 5);
  hull.drawRect(-5, -5, 10, 10);
  hull.drawCircle(0, 5, 5);
  hull.endFill();
  // hull.lineStyle(1, 0xff00ff, 1);
  // hull.arc(0, 0, 25, 0, Math.PI*2);
  // hull.endFill();
  // hull.arc(0, 0, 35, 0, Math.PI*2);
  sprite.addChild(hull);
  sprite.vx = 0;
  sprite.vy = -1;
  sprite.position.set(500, 300);
  sprite.linearVel = 0.5;
  sprite.targetPos = {
    x: 500,
    y: 275
  }
  sprite.update = function() {
    var dist = Math.hypot(sprite.x - sprite.targetPos.x, sprite.y - sprite.targetPos.y);
    if (dist > 5) {
      sprite.x += sprite.vx;
      sprite.y += sprite.vy;
    }
  }
  sprite.moveTo = function(target) {
    console.log(target);
    sprite.targetPos.x = target.x;
    sprite.targetPos.y = target.y;
    var angle = Math.atan2(sprite.targetPos.x - sprite.x, sprite.y - sprite.targetPos.y);
    sprite.rotation = angle
    sprite.vx = Math.sin(angle) * sprite.linearVel;
    sprite.vy = -Math.cos(angle) * sprite.linearVel;
    console.log(angle, sprite.vx, sprite.vy);
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
  return sprite
}


var makeShip = function(options) {
  var ent = Entity({x: options.x || 0, y: options.y || 0});
  var spr = addSprite(ent, {color: 0xffc100, startScale: options.startScale});
  return spr;
}


export {Ship, makeShip};