var V       = require('../../');
var should  = require('chai').should();
var string  = require('../../lib/v/plugins/string');

var v = new V();
v.use(string);

describe('string', function() {
  
  describe('#string', function() {
    it('should pass', function(done) {
      v.validate('', v.string(), function(err, result) {
        should.not.exist(err);
        result.should.be.a('string');
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate(1, v.string(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'string',
          name: 'string',
          path: '_',
          value: 1,
          error: 'is not a string'
        });
        done();
      });
    });
  });
  
  describe('#empty', function() {
    it('should pass', function(done) {
      v.validate('', v.string().empty(), function(err, result) {
        should.not.exist(err);
        result.should.equal('');
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate('hello', v.string().empty(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'string',
          name: 'empty',
          value: 'hello',
          path: '_',
          error: 'is not empty'
        });
        done();
      });
    });
  });
  
  describe('#notEmpty', function() {
    it('should pass', function(done) {
      v.validate('hello', v.string().notEmpty(), function(err, result) {
        should.not.exist(err);
        result.should.equal('hello');
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate('', v.string().notEmpty(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'string',
          name: 'notEmpty',
          value: '',
          path: '_',
          error: 'is not not empty'
        });
        done();
      });
    });
  });
  
  describe('#alphanum', function() {
    it('should pass', function(done) {
      v.validate('hello12346', v.string().alphanum(), function(err, result) {
        should.not.exist(err);
        result.should.equal('hello12346');
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate('!', v.string().alphanum(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'string',
          name: 'alphanum',
          value: '!',
          path: '_',
          error: 'is not alphanum'
        });
        done();
      });
    });
  });
  
  
  describe('#min', function() {
    it('should pass', function(done) {
      v.validate('abc', v.string().min(3), function(err, result) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate('abc', v.string().min(4), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          name: 'min',
          type: 'string',
          path: '_',
          value: 'abc',
          error: 'is not long enough'
        });
        done();
      });
    });
  });
  
  describe('#max', function() {
    it('should pass', function(done) {
      v.validate('abc', v.string().max(3), function(err, result) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate('abc', v.string().max(2), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          name: 'max',
          type: 'string',
          path: '_',
          value: 'abc',
          error: 'is not short enough'
        });
        done();
      });
    });
  });
  
  describe('#length', function() {
    it('should pass', function(done) {
      v.validate('abc', v.string().length(3), function(err, result) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate('abc', v.string().length(2), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          name: 'length',
          type: 'string',
          path: '_',
          value: 'abc',
          error: 'is not same length'
        });
        done();
      });
    });
  });
  
  describe('#regex', function() {
    it('should pass', function(done) {
      v.validate('abc', v.string().regex(/abc/), function(err, result) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate('abc', v.string().regex(/aaa/), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          name: 'regex',
          type: 'string',
          path: '_',
          value: 'abc',
          error: 'is not matching regex'
        });
        done();
      });
    });
  });
  
  describe('#lowercase', function() {
    it('should pass', function(done) {
      v.validate('abc', v.string().lowercase(), function(err, result) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate('ABC', v.string().lowercase(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          name: 'lowercase',
          type: 'string',
          path: '_',
          value: 'ABC',
          error: 'is not lowercase'
        });
        done();
      });
    });
  });
  
  describe('#isodate', function() {
    it('should pass', function(done) {
      v.validate('2015-09-08T09:00:53.833Z', v.string().isodate(), function(err, result) {
        should.not.exist(err);
        done();
      });
    });
    
    it('should fail non date strings', function(done) {
      v.validate('abc', v.string().isodate(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          name: 'isodate',
          type: 'string',
          path: '_',
          value: 'abc',
          error: 'is not an iso date'
        });
        done();
      });
    });
    
    it('should fail non iso date string', function(done) {
      v.validate('7-2-1986', v.string().isodate(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          name: 'isodate',
          type: 'string',
          path: '_',
          value: '7-2-1986',
          error: 'is not an iso date'
        });
        done();
      });
    });
  });
  
  
  
});