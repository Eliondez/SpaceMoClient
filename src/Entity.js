var Entity = function() {
  var self = {
    id: Math.random(),
    sprite: null,
    update: function() {

    }
  }
  console.log("Entity created!");
  return self;
}

export default Entity;