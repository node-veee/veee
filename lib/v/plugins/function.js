exports = module.exports = function(v, options) {
  v.register('func', function(value, context, cb) {
    if (typeof value === 'function') {
      cb();
    } else {
      cb('is not a function');
    }
  });
  
  v.register('func', 'length', function(value, context, cb) {
    if (value.length === context.args[0]) {
      cb();
    } else {
      cb('is not long enough');
    }
  });
}