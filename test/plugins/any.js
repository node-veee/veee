var V       = require('../../');
var should  = require('chai').should();
var any     = require('../../lib/v/plugins/any');

var v       = new V();
v.use(any);

describe('any', function() {
  
  describe('#any', function() {
    it('should pass', function(done) {
      v.validate(null, v.any(), function(err, result) {
        should.not.exist(err);
        done();
      });
    });
  });
  
  describe('#equal', function() {
    it('should pass', function(done) {
      v.validate(5, v.any().equal(5), function(err, result) {
        should.not.exist(err);
        result.should.equal(5);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate(false, v.any().equal(true), function(err, result) {
        should.not.exist(result);
        err.should.be.an('object');
        err.type.should.equal('any');
        err.name.should.equal('equal');
        err.path.should.equal('_');
        err.value.should.equal(false);
        err.error.should.equal('is not equal true');
        done();
      });
    });
  });
  
  describe('#required', function() {
    it('should pass', function(done) {
      v.validate(1, v.any().required(), function(err, result) {
        should.not.exist(err);
        result.should.equal(1);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate(undefined, v.any().required(), function(err, result) {
        should.not.exist(result);
        err.should.be.an('object');
        err.type.should.equal('any');
        err.name.should.equal('required');
        err.path.should.equal('_');
        should.not.exist(err.value);
        err.error.should.equal('is required');
        done();
      });
    });
  });
  
  describe('#optional', function() {
    it('should pass', function(done) {
      v.validate(undefined, v.any().optional().equal(10), function(err, result) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate(2, v.any().optional().equal(10), function(err, result) {
        should.not.exist(result);
        err.should.be.an('object');
        err.type.should.equal('any');
        err.name.should.equal('equal');
        err.path.should.equal('_');
        err.value.should.equal(2);
        err.error.should.equal('is not equal 10');
        done();
      });
    });
  });
  
  describe('#isUndefined', function() {
    it('should pass', function(done) {
      v.validate(undefined, v.any().isUndefined(), function(err, result) {
        should.not.exist(err);
        should.not.exist(result); // undefined
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate(true, v.any().isUndefined(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          name: 'isUndefined',
          type: 'any',
          path: '_',
          value: true,
          error: 'is not undefined'
        });
        done();
      });
    });
  });
  
  describe('#isNull', function() {
    it('should pass', function(done) {
      v.validate(null, v.any().isNull(), function(err, result) {
        should.not.exist(err);
        // result is null
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate('hello', v.any().isNull(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'any',
          name: 'isNull',
          value: 'hello',
          path: '_',
          error: 'is not null'
        });
        done();
      });
    });
  });
  
  describe('#options', function() {
    it('should pass options to validator', function(done) {
      v.register('any', 'test', function(value, context, cb) {
        context.x.should.equal(5);
        done();
      });
      v.validate(10, v.any().test().options({ x: 5 }), function() {});
    });
  });
  
  describe('#default', function() {
    it('should set default value if not set', function(done) {
      v.validate(undefined, v.any().default(10).required(), function(err, result) {
        should.not.exist(err);
        result.should.equal(10);
        done();
      });
    });
    
    it('should set default value from passed function', function(done) {
      v.validate(null, v.any().default(function(context, cb) {
        process.nextTick(function() {
          cb(null, 100);
        });
      }), function(err, result) {
        should.not.exist(err);
        result.should.equal(100);
        done();
      });
    });
    
    it('should not set default value if already set', function(done) {
      v.validate(5, v.any().default(0).required(), function(err, result) {
        should.not.exist(err);
        result.should.equal(5);
        done();
      });
    });  
  });
  
  describe('extension', function() {
    it('should use `any` methods with other types', function() {
      v.register('test', 'test', function(){});
      v.test().equal.should.be.a('function');
      v.test().required.should.be.a('function');
      v.test().optional.should.be.a('function');
      v.test().isUndefined.should.be.a('function');
      v.test().isNull.should.be.a('function');
      v.test().options.should.be.a('function');
      v.test().default.should.be.a('function');
    });
  });
});