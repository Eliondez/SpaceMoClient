"use strict";
import 'pixi.js';

var Background = function() {
  var resources = PIXI.loader.resources;
  var bgCont = new PIXI.Container();
  var stars1cont = new PIXI.Container();
  var stars11 = new PIXI.Sprite(resources["http://localhost:8080/public/stars1.png"].texture);
  stars11.position.set(0, 0);
  stars1cont.addChild(stars11);
  var stars12 = new PIXI.Sprite(resources["http://localhost:8080/public/stars1.png"].texture);
  stars12.position.set(0, -800);
  stars1cont.addChild(stars12);
  var stars2cont = new PIXI.Container();
  var stars21 = new PIXI.Sprite(resources["http://localhost:8080/public/stars2.png"].texture);
  stars21.position.set(0, 0);
  stars2cont.addChild(stars21);
  var stars22 = new PIXI.Sprite(resources["http://localhost:8080/public/stars2.png"].texture);
  stars22.position.set(0, -800);
  stars2cont.addChild(stars22);
  bgCont.addChild(stars1cont);
  bgCont.addChild(stars2cont);

  bgCont.update = function() {
    stars1cont.y += 0.1;
    if (stars1cont.y > 800) {
      stars1cont.y = 0;
    }
    stars2cont.y += 0.2;
    if (stars2cont.y > 800) {
      stars2cont.y = 0;
    }
  }
  return bgCont;
}

export default Background;
