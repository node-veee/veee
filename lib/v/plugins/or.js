var Queue = require('seed-queue');

exports = module.exports = function(v) {
  v.register('or', function(value, context, cb) {
    
    var queue = new Queue([]);
    var passed = false;
    
    context.args.forEach(function(schema) {
      queue.add(function(errors, next) {
        if (passed) return next();
        v.validate(value, schema, function(err, result) {
          if (err) {
            errors.push(err);
          } else {
            passed = true;
          }
          next();
        });
      });
    });
    
    queue.end(function(err, errors) {
      if (passed) return cb(null, value);
      cb(errors);
    });
  });
}