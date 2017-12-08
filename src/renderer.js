"use strict";
import 'pixi.js';

var Renderer = function() {
  var renderer = PIXI.autoDetectRenderer(
    1000, 600,
    {antialias: true, transparent: false, resolution: 1}
  );
  renderer.view.style.border = "1px dashed black";
  renderer.backgroundColor = 0x000000;
  renderer.autoResize = true;
  renderer.resize(1000, 600)
  document.getElementById('canvas-container').appendChild(renderer.view);
  return renderer;
}


export default Renderer;
