var V       = require('../../');
var should  = require('chai').should();
var date    = require('../../lib/v/plugins/date');

var v = new V();
v.use(date);

describe('date', function() {
  
  describe('#date', function() {
    it('should pass', function(done) {
      v.validate(new Date(), v.date(), function(err, result) {
        should.not.exist(err);
        result.should.be.a('date');
        done();
      });
    });
    
    it('should fail', function(done) {
      v.validate(null, v.date(), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'date',
          name: 'date',
          path: '_',
          value: null,
          error: 'is not a date'
        });
        done();
      });
    });
  });
  
  describe('#min', function() {
    it('should pass', function(done) {
      v.validate(new Date(), v.date().min(new Date('7-2-1986')), function(err, result) {
        should.not.exist(err);
        result.should.be.a('date');
        done();
      });
    });
    
    it('should fail', function(done) {
      var d = new Date();
      v.validate(d, v.date().min(new Date('10-10-2020')), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'date',
          name: 'min',
          path: '_',
          value: d,
          error: 'is not late enough'
        });
        done();
      });
    });
  });
  
  describe('#max', function() {
    it('should pass', function(done) {
      v.validate(new Date(), v.date().max(new Date('10-10-2020')), function(err, result) {
        should.not.exist(err);
        result.should.be.a('date');
        done();
      });
    });
    
    it('should fail', function(done) {
      var d = new Date();
      v.validate(d, v.date().max(new Date('7-2-1986')), function(err, result) {
        should.not.exist(result);
        err.should.deep.equal({
          type: 'date',
          name: 'max',
          path: '_',
          value: d,
          error: 'is not early enough'
        });
        done();
      });
    });
  });
  
});