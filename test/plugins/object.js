var V       = require('../../');
var should  = require('chai').should();
var object  = require('../../lib/v/plugins/object');
var number  = require('../../lib/v/plugins/number');
var array   = require('../../lib/v/plugins/array');
var boolean = require('../../lib/v/plugins/boolean');

var v = new V();
v.use(object);
v.use(number);
v.use(array);
v.use(boolean);

describe('object', function() {
  
  describe('#object', function() {
    it('should pass', function(done) {
      v.validate({}, v.object(), function(err, result) {
        should.not.exist(err);
        result.should.be.an('object');
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate(null, v.object(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'object',
          name: 'object',
          path: '_',
          value: null,
          error: 'is not an object'
        });
        done();
      });
    });
  });
  
  
  describe('#min', function() {
    it('should pass', function(done) {
      v.validate({}, v.object().min(0), function(err, result) {
        should.not.exist(err);
        result.should.deep.equal({});
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate({}, v.object().min(1), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'object',
          name: 'min',
          path: '_',
          value: {},
          error: 'is too short'
        });
        done();
      });
    });
  });
  
  describe('#max', function() {
    it('should pass', function(done) {
      v.validate({}, v.object().max(2), function(err, result) {
        should.not.exist(err);
        result.should.deep.equal({});
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate({ a: 1, b: 2 }, v.object().max(1), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'object',
          name: 'max',
          path: '_',
          value: { a: 1, b: 2 },
          error: 'is too long'
        });
        done();
      });
    });
  });
  
  describe('#length', function() {
    it('should pass', function(done) {
      v.validate({}, v.object().length(0), function(err, result) {
        should.not.exist(err);
        result.should.deep.equal({});
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate({}, v.object().length(1), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'object',
          name: 'length',
          path: '_',
          value: {},
          error: 'is not same length'
        });
        done();
      });
    });
  });
  
  describe('#keys', function() {
    it('should pass', function(done) {
      v.validate({ a: 5, b: false }, v.object().keys({
        a: v.number().gt(3),
        b: v.boolean()
      }), function(err, result) {
        should.not.exist(err);
        result.should.deep.equal({ a: 5, b: false });
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate({ a: 1, b: null }, v.object().keys({
        a: v.number().gt(3),
        b: v.boolean()
      }), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'object',
          name: 'keys',
          path: '_',
          value: { a: 1, b: null },
          error: {
            type: 'number',
            name: 'gt',
            path: '.a',
            value: 1,
            error: 'is not greater than'
          }
        });
        done();
      });
    });
  });
});