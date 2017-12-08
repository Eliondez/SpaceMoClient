"use strict";
import 'pixi.js';

var Stage = function() {
  var stage = new PIXI.Container();
  stage.interactive = true;
  return stage;
}

export default Stage;