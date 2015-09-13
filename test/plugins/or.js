var V       = require('../../');
var should  = require('chai').should();
var or      = require('../../lib/v/plugins/or');

var string  = require('../../lib/v/plugins/string');
var number  = require('../../lib/v/plugins/number');

var v = new V();

v.use(or);
v.use(string);
v.use(number);

describe('or', function() {
  describe('#or', function() {
    it('should pass', function(done) {
      v.validate(5, v.or(v.string(), v.number()), function(err, result) {
        should.not.exist(err);
        v.validate('5', v.or(v.string(), v.number()), function(err, result) {
          should.not.exist(err);
          done();
        });
      });
    });
    
    it('should fail', function(done) {
      v.validate(null, v.or(v.string(), v.number()), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'or',
          name: 'or',
          path: '_',
          value: null,
          error: [{
            type: 'string',
            name: 'string',
            path: '_',
            value: null,
            error: 'is not a string'
          }, {
            type: 'number',
            name: 'number',
            path: '_',
            value: null,
            error: 'is not a number'
          }]
        });
        done();
      });
    });
  });
});