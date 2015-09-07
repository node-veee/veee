var V       = require('../../');
var should  = require('chai').should();
var array   = require('../../lib/v/plugins/array');
var any     = require('../../lib/v/plugins/any');

var v = new V();
v.use(any);
v.use(array);

describe('array', function() {
  
  describe('#array', function() {
    it('should pass', function(done) {
      v.validate([], v.array(), function(err, result) {
        should.not.exist(err);
        result.should.deep.equal([]);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate({}, v.array(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          name: 'array',
          type: 'array',
          path: '_',
          value: {},
          error: 'is not array'
        });
        done();
      });
    });
  });
  
  describe('#min', function() {
    it('should pass', function(done) {
      v.validate([1,2,3], v.array().min(3), function(err, result) {
        should.not.exist(err);
        result.should.deep.equal([1,2,3]);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate([1,2,3], v.array().min(4), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          name: 'min',
          type: 'array',
          path: '_',
          value: [1,2,3],
          error: 'is not long enough'
        });
        done();
      });
    });
  });
  
  describe('#max', function() {
    it('should pass', function(done) {
      v.validate([1,2,3], v.array().max(3), function(err, result) {
        should.not.exist(err);
        result.should.deep.equal([1,2,3]);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate([1,2,3], v.array().max(2), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          name: 'max',
          type: 'array',
          path: '_',
          value: [1,2,3],
          error: 'is not short enough'
        });
        done();
      });
    });
  });
  
  describe('#length', function() {
    it('should pass', function(done) {
      v.validate([1,2,3], v.array().length(3), function(err, result) {
        should.not.exist(err);
        result.should.deep.equal([1,2,3]);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate([1,2,3], v.array().length(2), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          name: 'length',
          type: 'array',
          path: '_',
          value: [1,2,3],
          error: 'is not the same length'
        });
        done();
      });
    });
  });
  
  describe('#items', function() {
    it('should pass', function(done) {
      v.validate([1, 2, 3], v.array().items(v.any()), function(err, result) {
        should.not.exist(err);
        result.should.deep.equal([1,2,3]);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate([1, 2, 3], v.array().items(v.any().isNull()), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'array',
          name: 'items',
          path: '_',
          value: [1,2,3],
          error: {
            type: 'any',
            name: 'isNull',
            path: '[0]',
            value: 1,
            error: 'is not null'
          }
        });
        done();
      });
    });
    
    it.skip('should use mixed schema ($or)');
  });  
});