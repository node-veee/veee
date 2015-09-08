exports = module.exports = function(v, options) {
  
  v.register('date', function(value, context, cb) {
    if (Object.prototype.toString.call(value) === '[object Date]') {
      cb();
    } else {
      cb('is not a date');
    }
  });
  
  v.register('date', 'min', function(value, context, cb) {
    if (value.getTime() >= context.args[0].getTime()) {
      cb();
    } else {
      cb('is not late enough');
    }
  });
  
  v.register('date', 'max', function(value, context, cb) {
    if (value.getTime() <= context.args[0].getTime()) {
      cb();
    } else {
      cb('is not early enough');
    }
  });  
}