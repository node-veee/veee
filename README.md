# veee

Object schema validation inspired by `joi` (almost the same, but async and extensible)

### Installation

    $ npm install veee --save

### Usage
    
```js

var V = require('veee');

var v = new V([options]);

v.use(function(v) {
  v.register('number', function(value, context, cb) {
    if (typeof value === 'number' && value === value) return cb();
    cb('is not a number');
  });
  
  v.register('number', 'integer', function(value, context, cb) {
    if (parseInt(value.toString(), 10) === value) return cb();
    cb('is not an integer');
  });
  
  v.register('number', 'positive', function(value, context, cb) {
    if (value > 0) return cb();
    cb('is not a positive number');
  });
})

v.validate(5, v.number().positive().integer(), function(err, result) {
  // null, 5
});

v.validate(-1, v.number().positive(), function(err, result) {
  // { type: 'number', name: 'positive', path: '_', value: -1, error: 'is not a positive number' }, undefined
});
```

### Build-in types

`veee` is trying to be very similar to `joi`. it contains a few build-in validators:

- number
- string
- boolean
- array
- object
- date
- function
- any (inherited by all types)

### TODO

- 100% coverage on core + plugins
- fix object & array validators to update error paths
- update documentation