var V       = require('../../');
var should  = require('chai').should();
var boolean = require('../../lib/v/plugins/boolean');

var v = new V();
v.use(boolean);

describe('boolean', function() {
  
  describe('#boolean', function() {
    it('should pass', function(done) {
      v.validate(true, v.boolean(), function(err, result) {
        should.not.exist(err);
        result.should.equal(true);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate(1, v.boolean(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'boolean',
          name: 'boolean',
          path: '_',
          value: 1,
          error: 'is not boolean'
        });
        done();
      });
    });
  });
  
  describe('#true', function() {
    it('should pass', function(done) {
      v.validate(true, v.boolean().true(), function(err, result) {
        should.not.exist(err);
        result.should.equal(true);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate(false, v.boolean().true(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          name: 'true',
          type: 'boolean',
          value: false,
          path: '_',
          error: 'is not true'
        });
        done();
      });
    });
  });
  
  describe('#false', function() {
    it('should pass', function(done) {
      v.validate(false, v.boolean().false(), function(err, result) {
        should.not.exist(err);
        result.should.equal(false);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate(true, v.boolean().false(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          name: 'false',
          type: 'boolean',
          value: true,
          path: '_',
          error: 'is not false'
        });
        done();
      });
    });
  });
});