/**
 * Javascript object validation
 */

/**
 * Module dependencies
 */

var Queue   = require('seed-queue');
var extend  = require('seed-extend');

var any     = require('./plugins/any');
var array   = require('./plugins/array');
var boolean = require('./plugins/boolean');
var date    = require('./plugins/date');
var func    = require('./plugins/function');
var number  = require('./plugins/number');
var object  = require('./plugins/object');
var string  = require('./plugins/string');
var or      = require('./plugins/or');

/**
 * Helpers
 */

function sortByWeight(a, b) {
  return a[0].weight - b[0].weight;
}

function buildScope(methods) {
  var scope = {
    _queue: []
  };
  
  Object.keys(methods).forEach(function(name) {
    scope[name] = function() {
      scope._queue.push([
        methods[name], 
        [].slice.call(arguments)
      ]);
      return scope;
    }
  });
  
  return scope;
}

function defineType(v, name, weight, fn) {
  var types = v._types;
  
  if (types[name]) {
    throw new Error('type is already defined: ' + name);
  }
  
  if (v[name]) {
    throw new Error('property is already defined: ' + name);
  }
  
  types[name] = {
    type: name,
    name: name,
    weight: weight,
    fn: fn,
    methods: {}
  }
  
  v[name] = function() {
    var scope = (name === 'any') 
      ? buildScope(extend({}, types.any.methods ))
      : buildScope(extend({}, types.any.methods, types[name].methods));
    
    // schedule initial type check
    scope._queue.push([types[name], [].slice.call(arguments)]);
    
    return scope;
  }
}

function defineMethod(v, type, name, weight, fn) {
  var types = v._types;
  
  if (!types[type]) {
    defineType(v, type, 30, function(value, context, cb) {
      cb();
    });
  }
  
  if (types[type].methods[name]) {
    throw new Error(type + ' method is already defined: ' + method);
  }
  
  types[type].methods[name] = {
    type: type,
    name: name,
    weight: weight,
    fn: fn
  };
}

function formatError(context, error) {
  return {
    type: context.validator.type,
    name: context.validator.name,
    path: context.path,
    value: context.value,
    error: error
  }
}

/**
 * Constructor
 *
 * @param {Object} options
 */

function v(options) {
  if (!(this instanceof v)) {
    return new v(options);
  }
  
  this._types = {};
  this._options = options || {};
  
  this.register('any', function(value, context, cb) {
    cb(); // pass through
  });
}

/**
 * Use plugins
 *
 * @param {Function} plugin(v, options)
 * @param {Object} options, optional plugin options
 * @return self
 */

v.prototype.use = function(plugin, options) {
  plugin(this, options);
  return this;
}

/**
 * Register a new validation type/method
 *
 * @param {String} type, eg. 'string'
 * @param {String} method, optional, eg. 'length'
 * @param {Number} weight, optional, defaults to 50
 * @param {Function} fn(value, context, cb)
 */

v.prototype.register = function(type, method, weight, fn) {
  
  // defining a method
  if (typeof weight === 'function') {
    fn = weight;
    weight = 50;
  }
  
  // defining a type
  if (typeof method === 'function') {
    fn = method;
    weight = 30;
    method = null;
  }
  
  if (!method) {
    defineType(this, type, weight, fn);
  } else {
    defineMethod(this, type, method, weight, fn);
  }
}

/**
 * Run validation check
 *
 * @param {*} value, value to check against schema
 * @param {Object|Array} schema, v schema
 * @param {Object} options, optional
 * @param {Function} callback(err, result)
 */

v.prototype.validate = function(value, schema, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  
  var context = {
    value: value,
    path: '_',
    options: extend({}, this._options, options)
  }
  
  var queue = schema._queue.sort(sortByWeight);
  
  (function next(err, result){
    
    if (err === true) {
      return cb(null, context.value);
    }
    
    if (err) {
      return cb(formatError(context, err));
    }
    
    if (typeof result !== 'undefined') {
      context.value = result;
    }
    
    var pair = queue.shift();
    
    if (!pair) {
      return cb(null, context.value);
    }
    
    pair[0].fn(context.value, extend(context, { args: pair[1], validator: pair[0] }), next);
  })();
}

/**
 * Use all build-in plugins by default
 *
 * @param {Object} options, optional
 */

v.scaffold = function(options) {
  return v(options)
    .use(any)
    .use(date)
    .use(func)
    .use(array)
    .use(number)
    .use(string)
    .use(object)
    .use(boolean)
    .use(or);
}

/**
 * Expose
 */

exports = module.exports = v;
