var V       = require('../../');
var should  = require('chai').should();
var number  = require('../../lib/v/plugins/number');

var v = new V();
v.use(number);

describe('number', function() {
  
  describe('#number', function() {
    it('should pass', function(done) {
      v.validate(1, v.number(), function(err, result) {
        should.not.exist(err);
        result.should.equal(1);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate(NaN, v.number(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'number',
          name: 'number',
          path: '_',
          value: NaN,
          error: 'is not a number'
        });
        done();
      });
    });
  });
  
  describe('#min', function() {
    it('should pass', function(done) {
      v.validate(1, v.number().min(0), function(err, result) {
        should.not.exist(err);
        result.should.equal(1);
        done();
      });
    });
    
    it('should fail', function(done)  {
      v.validate(1, v.number().min(2), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'number',
          name: 'min',
          path: '_',
          value: 1,
          error: 'is not large enough'
        });
        done();
      });
    });
  });
  
  describe('#max', function() {
    it('should pass', function(done) {
      v.validate(1, v.number().max(2), function(err, result) {
        should.not.exist(err);
        result.should.equal(1);
        done();
      });
    });
    
    it('should fail', function(done)  {
      v.validate(1, v.number().max(0), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'number',
          name: 'max',
          path: '_',
          value: 1,
          error: 'is not small enough'
        });
        done();
      });
    });
  });
  
  describe('#gt', function() {
    it('should pass', function(done) {
      v.validate(1, v.number().gt(0), function(err, result) {
        should.not.exist(err);
        result.should.equal(1);
        done();
      });
    });
    
    it('should fail', function(done)  {
      v.validate(1, v.number().gt(1), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'number',
          name: 'gt',
          path: '_',
          value: 1,
          error: 'is not greater than'
        });
        done();
      });
    });
  });
  
  describe('#gte', function() {
    it('should pass', function(done) {
      v.validate(1, v.number().gte(1), function(err, result) {
        should.not.exist(err);
        result.should.equal(1);
        done();
      });
    });
    
    it('should fail', function(done)  {
      v.validate(1, v.number().gte(2), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'number',
          name: 'gte',
          path: '_',
          value: 1,
          error: 'is not greater than or equal'
        });
        done();
      });
    });
  });
  
  describe('#lt', function() {
    it('should pass', function(done) {
      v.validate(1, v.number().lt(2), function(err, result) {
        should.not.exist(err);
        result.should.equal(1);
        done();
      });
    });
    
    it('should fail', function(done)  {
      v.validate(1, v.number().lt(1), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'number',
          name: 'lt',
          path: '_',
          value: 1,
          error: 'is not less than'
        });
        done();
      });
    });
  });
  
  describe('#lte', function() {
    it('should pass', function(done) {
      v.validate(1, v.number().lte(1), function(err, result) {
        should.not.exist(err);
        result.should.equal(1);
        done();
      });
    });
    
    it('should fail', function(done)  {
      v.validate(1, v.number().lte(0), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'number',
          name: 'lte',
          path: '_',
          value: 1,
          error: 'is not less than or equal'
        });
        done();
      });
    });
  });
  
  
  describe('#positive', function() {
    it('should pass', function(done) {
      v.validate(1, v.number().positive(), function(err, result) {
        should.not.exist(err);
        result.should.equal(1);
        done();
      });
    });
    
    it('should fail', function(done)  {
      v.validate(0, v.number().positive(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'number',
          name: 'positive',
          path: '_',
          value: 0,
          error: 'is not positive'
        });
        done();
      });
    });
  });
  
  
  describe('#negative', function() {
    it('should pass', function(done) {
      v.validate(-1, v.number().negative(), function(err, result) {
        should.not.exist(err);
        result.should.equal(-1);
        done();
      });
    });
    
    it('should fail', function(done)  {
      v.validate(5, v.number().negative(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'number',
          name: 'negative',
          path: '_',
          value: 5,
          error: 'is not negative'
        });
        done();
      });
    });
  });
  
  describe('#notPositive', function() {
    it('should pass', function(done) {
      v.validate(0, v.number().notPositive(), function(err, result) {
        should.not.exist(err);
        result.should.equal(0);
        done();
      });
    });
    
    it('should fail', function(done)  {
      v.validate(1, v.number().notPositive(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'number',
          name: 'notPositive',
          path: '_',
          value: 1,
          error: 'is not not positive'
        });
        done();
      });
    });
  });
  
  describe('#notNegative', function() {
    it('should pass', function(done) {
      v.validate(0, v.number().notNegative(), function(err, result) {
        should.not.exist(err);
        result.should.equal(0);
        done();
      });
    });
    
    it('should fail', function(done)  {
      v.validate(-1, v.number().notNegative(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'number',
          name: 'notNegative',
          path: '_',
          value: -1,
          error: 'is not not negative'
        });
        done();
      });
    });
  });
  
  describe('#integer', function() {
    it('should pass', function(done) {
      v.validate(0, v.number().integer(), function(err, result) {
        should.not.exist(err);
        result.should.equal(0);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate(1.05, v.number().integer(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'number',
          name: 'integer',
          path: '_',
          value: 1.05,
          error: 'is not an integer'
        });
        done();
      });
    });
  });
  
  describe('#float', function() {
    it('should pass', function(done) {
      v.validate(0.5, v.number().float(), function(err, result) {
        should.not.exist(err);
        result.should.equal(0.5);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate(1, v.number().float(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'number',
          name: 'float',
          path: '_',
          value: 1,
          error: 'is not a float'
        });
        done();
      });
    });
  });
});