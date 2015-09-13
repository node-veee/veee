var should  = require('chai').should();
var V       = require('../');

describe('v', function() {
  
  describe('#new', function() {

    it('should create a new instance', function() {
      V().should.be.an.instanceof(V);
      (new V()).should.be.an.instanceof(V);
      V.scaffold().should.be.an.instanceof(V);
    });

    it('should accept options', function() {
      V({ option: 'value' })._options.should.deep.equal({ option: 'value' });
      V.scaffold({ option: 'value' })._options.should.deep.equal({ option: 'value' });
    });
  });

  describe('#use', function() {

    it('should accept a plugin', function(done) {
      var v = new V();
      v.use(function(inst) {
        inst.should.equal(v);
        done();
      });
    });

    it('should accept plugin options', function(done) {
      var v = new V();
      v.use(function(inst, options) {
        options.should.deep.equal({ option: 'value' });
        done();
      }, { option: 'value' });
    });
  });
  
  describe('#register', function() {
    it('should register a new type', function() {
      var v = new V();
      Object.keys(v._types).should.have.length(1); // 'any'
      function fn(value, context, cb) { cb(); }
      v.register('string', fn);
      should.exist(v._types.string);
      v._types.string.should.be.an('object');
      v._types.string.name.should.equal('string');
      v._types.string.type.should.equal('string');
      v._types.string.weight.should.equal(30);
      v._types.string.fn.should.equal(fn);
      v._types.string.methods.should.be.an('object');
      v.string.should.be.a('function');
    });

    it('should throw an error if type already exists', function() {
      var v = new V();
      v.register('string', function(value, context, cb) { cb(); });
      (function() {
        v.register('string', function() {});
      }).should.throw(Error, /type is already defined: string/);
    });

    it('should throw an error if prop is already defined', function() {
      (function() {
        V().register('register', function(value, context, cb) { cb(); });
      }).should.throw(Error);
    });

    it('should register a new method', function() {
      var v = new V();
      v.register('string', 'length', function(value, context, cb) {
        if (value.length !== context.args[0]) return cb('is wrong length');
        cb();
      });
      should.exist(v._types.string);
      v._types.string.methods.length.should.be.an('object');
      v._types.string.methods.length.name.should.equal('length');
      v._types.string.methods.length.type.should.equal('string');
      v._types.string.methods.length.weight.should.equal(50);
      v._types.string.methods.length.fn.should.be.a('function');
    });

    it('should throw an error if method already exists', function() {
      var v = new V();
      v.register('string', 'length', function(val, ctx, cb) { cb() });
      (function() {
        v.register('string', 'length', function(val, ctx, cb) { cb() });
      }).should.throw(Error);
    });
    
    it('should auto-register type (as a pass through) when defining a new method', function(done) {
      var v = new V();
      v.register('custom', 'method', function(value, ctx, cb) { cb(); });
      v.validate(null, v.custom().method(), function(err, result) {
        done();
      });
    });
  });

  describe('#validate', function() {

    it('should validate a value against schema', function(done) {
      var v = V.scaffold();
      v.validate(5, v.any().equal(5), function(err, result) {
        should.not.exist(err);
        result.should.equal(5);
        done();
      });
    });

    it('should accept validation options', function(done) {
      var v = V.scaffold({ option: 'value' });

      v.register('test', function(value, context, cb) {
        value.should.equal(10);
        context.value.should.equal(10);
        context.options.should.deep.equal({
          option: 'value',
          anotherOption: 'value'
        });
        context.args.should.deep.equal(['hello']);
        cb();
      });

      v.validate(10, v.test('hello'), { anotherOption: 'value' }, function(err, result) {
        should.not.exist(err);
        result.should.equal(10);
        done();
      });
    });

    it('should respond with an error if validation fails', function(done) {
      var v = V.scaffold();
      v.validate(false, v.boolean().true(), function(err, result) {
        should.not.exist(result);
        err.type.should.equal('boolean');
        err.name.should.equal('true');
        err.path.should.equal('_');
        err.value.should.equal(false);
        err.error.should.equal('is not true');
        done();
      });
    });
  });

  describe('plugins', function() {
    require('./plugins/any');
    require('./plugins/array');
    require('./plugins/boolean');
    require('./plugins/date');
    require('./plugins/function');
    require('./plugins/number');
    require('./plugins/object');
    require('./plugins/string');
    require('./plugins/or');
  });
});