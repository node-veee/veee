var exports = module.exports = function(v, options) {
  v.register('number', function(value, context, cb) {
    if (typeof value === 'number' && value === value) {
      cb();
    } else {
      cb('is not a number');
    }
  });
    
  v.register('number', 'min', function(value, context, cb) {
    if (value >= context.args[0]) {
      cb();
    } else {
      cb('is not large enough');
    }
  });
  
  v.register('number', 'max', function(value, context, cb) {
    if (value <= context.args[0]) {
      cb();
    } else {
      cb('is not small enough');
    }
  });
  
  v.register('number', 'gt', function(value, context, cb) {
    if (value > context.args[0]) {
      cb();
    } else {
      cb('is not greater than');
    }
  });
  
  v.register('number', 'gte', function(value, context, cb) {
    if (value >= context.args[0]) {
      cb();
    } else {
      cb('is not greater than or equal');
    }
  });
  
  v.register('number', 'lt', function(value, context, cb) {
    if (value < context.args[0]) {
      cb();
    } else {
      cb('is not less than');
    }
  });
  
  v.register('number', 'lte', function(value, context, cb) {
    if (value <= context.args[0]) {
      cb();
    } else {
      cb('is not less than or equal');
    }
  });
  
  v.register('number', 'positive', function(value, context, cb) {
    if (value > 0) {
      cb();
    } else {
      cb('is not positive');
    }
  });
  
  v.register('number', 'negative', function(value, context, cb) {
    if (value < 0) {
      cb();
    } else {
      cb('is not negative');
    }
  });
  
  v.register('number', 'notNegative', function(value, context, cb) {
    if (value >= 0) {
      cb();
    } else {
      cb('is not not negative');
    }
  });
  
  v.register('number', 'notPositive', function(value, context, cb) {
    if (value <= 0) {
      cb();
    } else {
      cb('is not not positive');
    }
  });
  
  v.register('number', 'integer', function(value, context, cb) {
    if (parseInt(value.toString(), 10) === value) {
      cb();
    } else {
      cb('is not an integer');
    }
  });
  
  v.register('number', 'float', function(value, context, cb) {
    if (parseInt(value.toString(), 10) !== value) {
      cb();
    } else {
      cb('is not a float');
    }
  });
}