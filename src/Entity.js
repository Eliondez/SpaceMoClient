"use strict";
import 'pixi.js';


var Entity = function(options) {
  var self = {
    id: Math.random(),
  }
  self.x = options.x || 0;
  self.y = options.y || 0;
  self.vx = 0;
  self.vy = 0;
  self.targetPos = {}
  self.linearVel = 0.5;
  return self;
}

var addSprite = function(obj, options) {
  obj.sprite = new PIXI.Container();
  var hull = new PIXI.Graphics();
  hull.rotAngle = 0;
  hull.beginFill(options.color || 0x0fc107, 1);
  hull.drawCircle(0, 0, 10);
  hull.endFill();
  obj.sprite.addChild(hull);
  obj.growing = true;
  obj.maxScale = 1.5;
  obj.resizeSpeed = 0.002;
  obj.sprite.scale.x =  obj.sprite.scale.y =  options.startScale || Math.random() * 0.5 + 1;

  obj.sprite.update = function() {
    // obj.x += obj.vx;
    // obj.y += obj.vy;
    if (obj.sprite.scale.x > obj.maxScale) {
      obj.growing = false;
    } else if (obj.sprite.scale.x < 1) {
      obj.growing = true;
    }
    if (obj.growing) {
      obj.sprite.scale.x += obj.resizeSpeed;
      obj.sprite.scale.y += obj.resizeSpeed;
    } else {
      obj.sprite.scale.x -= obj.resizeSpeed;
      obj.sprite.scale.y -= obj.resizeSpeed;
    }
    
    obj.sprite.position.set(obj.x, obj.y);
  }
  return obj.sprite;
}

export {addSprite, Entity};