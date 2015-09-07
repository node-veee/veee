exports = module.exports = function(v, options) {
  v.register('boolean', function(value, context, cb) {
    if (typeof value === 'boolean') {
      cb();
    } else {
      cb('is not boolean');
    }
  });
  
  v.register('boolean', 'true', function(value, context, cb) {
    if (value === true) {
      cb();
    } else {
      cb('is not true');
    }
  });
  
  v.register('boolean', 'false', function(value, context, cb) {
    if (value === false) {
      cb();
    } else {
      cb('is not false');
    }
  });
}