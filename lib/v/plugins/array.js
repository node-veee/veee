var Queue = require('seed-queue');

exports = module.exports = function(v) {
  
  v.register('array', function(value, context, cb) {
    if (Array.isArray(value)) return cb();
    cb('is not array');
  });
  
  v.register('array', 'items', function(value, context, cb) {
    var queue = new Queue();
    
    // todo: support mixed args
    
    value.forEach(function(item, index) {
      queue.add(function(next) {
        v.validate(item, context.args[0], function(err, result) {
          if (err) return next(err);
          value[index] = result;
          next();
        });
      });
    });
    
    queue.done(function(err) {
      if (err) return cb(err);
      cb();
    });
  });
  
  v.register('array', 'min', function(value, context, cb) {
    if (value.length < context.args[0]) return cb('is not long enough');
    cb();
  });
  
  v.register('array', 'max', function(value, context, cb) {
    if (value.length > context.args[0]) return cb('is not short enough');
    cb();
  });
  
  v.register('array', 'length', function(value, context, cb) {
    if (value.length === context.args[0]) return cb('is not the same length');
    cb();
  });
}