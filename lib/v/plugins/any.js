exports = module.exports = function(v) {
  v.register('any', 'equal', function(value, context, cb) {
    if (value === context.args[0]) {
      cb();
    } else {
      cb('is not equal ' + context.args[0]);
    }
  });
  
  v.register('any', 'required', 10, function(value, context, cb) {
    if (typeof value !== 'undefined') {
      cb();
    } else {
      cb('is required');
    }
  });
  
  v.register('any', 'optional', 10, function(value, context, cb) {
    if (typeof value === 'undefined') {
      cb(true);
    } else {
      cb();
    }
  });
  
  v.register('any', 'isUndefined', 10, function(value, context, cb) {
    if (typeof value === 'undefined') {
      cb();
    } else {
      cb('is not undefined');
    }
  });
  
  v.register('any', 'isNull', 10, function(value, context, cb) {
    if (value === null) {
      cb();
    } else {
      cb('is not null');
    }
  });
  
  v.register('any', 'options', 5, function(value, context, cb) {
    for (var key in context.args[0]) {
      context[key] = context.args[0][key];
    }
    cb();
  });
  
  v.register('any', 'default', 9, function(value, context, cb) {
    if (typeof value === 'undefined' || value === null) {    
      var val = context.args[0];
      if (typeof val === 'function') {
        val(context, function(err, result) {
          if (err) return cb(err);
          cb(null, result);
        });
      } else {
        cb(null, val);
      }
    } else {
      cb();
    }
  }); 
}