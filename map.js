/**
 * Initialize a new `Map`.
 */

function Map(svg) {
  this.svg = svg;
  this.el = document.createElement('div');
  this.el.className = 'map';
  this._width = 140;
  this._height = 140;
  this._values = {};
  this.draw();
}

/**
 * Set `width` and `height` dimensions.
 *
 * @param {Number} width
 * @param {Number} height
 * @return {Map}
 * @api public
 */

Map.prototype.size = function(width, height){
  this._width = width;
  this._height = height;
  return this;
};

/**
 * Adds scale by given amount to the paths.
 *
 * @param {Number} amount
 * @return {Map}
 * @api public
 */

Map.prototype.scale = function(amount){
  this.paths.scale(amount, amount, 0, 0);
  return this;
};

/**
 * Set the `attributes` for every path.
 *
 * @param {Object} attributes
 * @return {Map}
 * @api public
 */

Map.prototype.style = function(attributes){
  this.paths.attr(attributes);
  return this;
};

/**
 * Find path with given `id`.
 *
 * @param {Number} id
 * @return {Map}
 * @api public
 */

Map.prototype.find = function(id){
  for (var i = 0, len = this.paths.length; i < len; i++) {
    if (this.paths[i].data("id") === id) {
      return this.paths[i];
    }
  }
};

/**
 * Set key and value.
 *
 * @param {String} key
 * @param {Number} value
 * @return {Map}
 * @api public
 */

Map.prototype.set = function(key, value){
  this._values[key] = parseInt(value, 10);
  return this;
};

/**
 * Set range of colors.
 *
 * @param {Array} arguments
 * @return {Map}
 * @api public
 */

Map.prototype.colors = function(){
  this._colors = [];
  for (var i = 0; i < arguments.length; i++) {
    this._colors.push(arguments[i]);
  }
  return this;
};

/**
 * Get key value or min and max values.
 *
 * @param {String} key
 * @return {Number}
 * @api private
 */

Map.prototype.get = function(key){
  if (['min', 'max'].indexOf(key) > -1) {
    var numbers = [];
    for (var k in this._values) {
      numbers.push(this._values[k]);
    }
    return Math[key].apply(this, numbers);
  }
  return this._values[key];
};

/**
 * Get color by given `weight`.
 *
 * @param {Integer} weight
 * @return {String}
 * @api private
 */

Map.prototype.color = function(weight){
  var len = this._colors.length
    , ranges = []
    , r = 1 / len;

  for (var i = 1; i <= this._colors.length; i++) {
    ranges.push(i * r);
  }

  for (var j = 0; j < this._colors.length; j++) {
    if (weight <= ranges[j]) {
      return this._colors[j];
    }
  }
};

/**
 * Set color of each path on the map.
 *
 * @param {Boolean} animate
 * @return {Map}
 * @api public
 */

Map.prototype.colorize = function(animate){
  var min = this.get('min')
    , max = this.get('max');

  for (var k in this._values) {
    var value = this._values[k]
      , weight = (value - min) / (max - min)
      , path = this.find(k)
      , color = this.color(weight);

    if (animate) {
      path.animate({ fill: color }, 1000, '<>');
    } else {
      path.attr("fill", color);
    }
  }

  return this;
};

/**
 * Draw on `el`.
 *
 * @return {Map}
 * @api public
 */

Map.prototype.draw = function(){
  var paths = this.svg.getElementsByTagName('path')
    , path
    , len
    , i;

  this.el.innerHTML = '';
  this.ctx = Raphael(this.el, this._width, this._height);
  this.paths = this.ctx.set();

  for (i = 0, len = paths.length; i < len; i++) {
    path = this.ctx.path(paths[i].getAttribute("d"));
    path.data("id", paths[i].getAttribute("id"));
    path.attr("fill", "#cfd4d8");
    path.attr("stroke", "#ffffff");
    path.attr("stroke-width", "1.1");
    this.paths.push(path);
  }

  return this;
};
