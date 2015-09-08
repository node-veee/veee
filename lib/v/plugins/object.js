var Queue = require('seed-queue');

exports = module.exports = function(v, options) {
  
  v.register('object', function(value, context, cb) {
    if (typeof value === 'object' && value !== null) {
      cb();
    } else {
      cb('is not an object');
    }
  });
  
  v.register('object', 'keys', function(value, context, cb) {
    var queue = new Queue();
    
    // todo: support mixed args
    
    Object.keys(context.args[0]).forEach(function(key) {
      queue.add(function(next) {
        v.validate(value[key], context.args[0][key], function(err, result) {
          if (err) {
            err.path = '.' + key;
            return next(err);
          }
          value[key] = result;
          next();
        });
      });
    });
    
    queue.done(function(err) {
      if (err) return cb(err);
      cb();
    });
  });
  
  v.register('object', 'length', function(value, context, cb) {
    if (Object.keys(value).length !== context.args[0]) {
      cb('is not same length');
    } else {
      cb();
    }
  });
  
  v.register('object', 'min', function(value, context, cb) {
    if (Object.keys(value).length < context.args[0]) {
      cb('is too short');
    } else {
      cb();
    }
  });
  
  v.register('object', 'max', function(value, context, cb) {
    if (Object.keys(value).length > context.args[0]) {
      cb('is too long');
    } else {
      cb();
    }
  });
}