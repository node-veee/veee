var exports = module.exports = function(v, options) {
  v.register('string', function(value, context, cb) {
    if (typeof value === 'string') {
      cb();
    } else {
      cb('is not a string');
    }
  });
  
  v.register('string', 'empty', function(value, context, cb) {
    if (value.trim().length === 0) {
      cb();
    } else {
      cb('is not empty');
    }
  });
  
  v.register('string', 'notEmpty', function(value, context, cb) {
    if (value.trim().length > 0) {
      cb();
    } else {
      cb('is not not empty');
    }
  });
  
  v.register('string', 'alphanum', function(value, context, cb) {
    if (/^[a-z0-9]+$/i.test(value)) {
      cb();
    } else {
      cb('is not alphanum');
    }
  });
  
  v.register('string', 'min', function(value, context, cb) {
    if (value.length >= context.args[0]) {
      cb();
    } else {
      cb('is not long enough');
    }
  });
  
  v.register('string', 'max', function(value, context, cb) {
    if (value.length <= context.args[0]) {
      cb();
    } else {
      cb('is not short enough');
    }
  });
  
  v.register('string', 'length', function(value, context, cb) {
    if (value.length === context.args[0]) {
      cb();
    } else {
      cb('is not same length');
    }
  });
  
  v.register('string', 'regex', function(value, context, cb) {
    if (context.args[0].test(value)) {
      cb();
    } else {
      cb('is not matching regex');
    }
  });
  
  v.register('string', 'lowercase', function(value, context, cb) {
    if (value.toLowerCase() === value) {
      cb();
    } else {
      cb('is not lowercase');
    }
  });
  
  v.register('string', 'isodate', function(value, context, cb) {
    if ((new Date(value)).toISOString() === value) {
      cb();
    } else {
      cb('is not an iso date');
    }
  });
}