exports = module.exports = function(v, options) {
  
  var isDate = function(date) {
      return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ));
  }
  
  v.register('date', function(value, context, cb) {
    if (isDate(value)) {
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