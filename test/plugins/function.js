var V       = require('../../');
var should  = require('chai').should();
var func    = require('../../lib/v/plugins/function');

var v = new V();
v.use(func);

describe('func', function() {
  
  describe('#func', function() {
    it('should pass', function(done) {
      v.validate(function(){}, v.func(), function(err, result) {
        should.not.exist(err);
        result.should.be.a('function');
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate(null, v.func(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'func',
          name: 'func',
          path: '_',
          value: null,
          error: 'is not a function'
        });
        done();
      });
    });
  });
  
  describe('#length', function() {
    it('should pass', function(done) {
      v.validate(function(a,b,c){}, v.func().length(3), function(err, result) {
        should.not.exist(err);
        result.should.be.a('function');
        done();
      });
    });
    
    it('should fail', function(done) {
      function fn(a, b) {}
      v.validate(fn, v.func().length(3), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'func',
          name: 'length',
          path: '_',
          value: fn,
          error: 'is not same length'
        });
        done();
      });
    });
  });
});