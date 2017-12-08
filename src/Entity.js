"use strict";
import 'pixi.js';


var Entity = function(options) {
  var self = {
    id: Math.random(),
  }
  self.vx = 0;
  self.vy = 0;
  self.targetPos = {}
  self.linearVel = 0.5;
  return self;
}

// var Enemy = function(options) {
//   var ships_textures = resources["http://localhost:8080/public/ships.json"].textures;
//   var self = {
//     id: Math.random(),
//     sprite: new Sprite(ships_textures["greenship3.png"])
//   }
//   self.sprite.position.set(options.x, options.y);
//   self.sprite.rotation = options.rotation || Math.PI;
//   self.sprite.scale.x = options.scale || 0.2;
//   self.sprite.scale.y = options.scale || 0.2;
//   self.sprite.anchor.set(0.5, 0.5);

//   self.vx = 0;
//   self.vy = 0;
//   self.targetPos = {
//     x: options.x,
//     y: options.y
//   }
//   self.linearVel = 0.5;

//   self.sprite.update = function() {

//     var dist = Math.hypot(self.sprite.x - self.targetPos.x, self.sprite.y - self.targetPos.y);
//     if (dist > 5) {
//       self.sprite.x += self.vx;
//       self.sprite.y += self.vy;
//     } else {
//       self.moveTo({
//         x: self.sprite.x + Math.random() * 200 - 100,
//         y: self.sprite.y + Math.random() * 200 - 100
//       })
//     }

//     self.sprite.y += self.vy;
//     self.sprite.x += self.vx;

//     if (self.sprite.toDestroy) {
//       self.sprite.destroy();
//       delete enemyList[self.id];
//     }
//   }
//   self.moveTo = function(target) {
//     self.targetPos.x = target.x;
//     self.targetPos.y = target.y;
//     var angle = Math.atan2(self.targetPos.x - self.sprite.x, self.sprite.y - self.targetPos.y);
//     self.sprite.rotation = angle
//     self.vx = Math.sin(angle) * self.linearVel;
//     self.vy = -Math.cos(angle) * self.linearVel;
//   }
//   stage.addChild(self.sprite);
//   enemyList[self.id] = self.sprite;
//   return self;
// }

export default Entity;