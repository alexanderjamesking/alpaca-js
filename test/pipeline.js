var assert = require('should'),
    sinon = require('sinon'),
    Pipeline = require('../lib/pipeline'),
    Exchange = require('../lib/exchange'),
    Message = require('../lib/message'),
    TextAppender = require('./processor/text_appender');

describe('Pipeline', function() {

  var pipeline;

  beforeEach(function(){
    pipeline = new Pipeline();
	});

  it('should have an array of processors', function() {
    pipeline.should.have.property('processors');
    pipeline.processors.length.should.equal(0);
  });

  describe('add processor', function() {
    it('should be possible to add a processor', function() {
      pipeline.addProcessor(new TextAppender('test'));
      pipeline.processors.length.should.equal(1);
      pipeline.processors[0].should.be.a.Function;
    });
  });

  describe('process', function() {
    it('should call process on the processor', function(done) {
      var processor = new TextAppender('one ');
      var processSpy = sinon.spy(processor, "process");

      pipeline.addProcessor(processor);

      pipeline.process(new Exchange(), function(err, data) {
          processSpy.calledOnce.should.be.true;
          processSpy.calledOn(processor).should.be.true;
          done();
      });
    });

    it('should iterate through all processors in the pipeline', function (done) {
      pipeline.addProcessor(new TextAppender('one '));
      pipeline.addProcessor(new TextAppender('two '));
      pipeline.addProcessor(new TextAppender('three'));
      pipeline.process(new Exchange(), function(exchange) {
        exchange.message.body.should.equal('one two three');
        done();
      });
    });

    it('should halt on error and set the error on the exchange', function (done) {
      var process = function(exchange, callback) {
        callback(new Error('failed to process'), exchange);
      };

      var processorThatErrors = {
        process : process
      };

      var appender1 = new TextAppender('one ');
      var appender2 = new TextAppender('two');

      var spy1 = sinon.spy(appender1, "process");
      var spy2 = sinon.spy(appender2, "process");

      pipeline.addProcessor(appender1);
      pipeline.addProcessor(processorThatErrors);
      pipeline.addProcessor(appender2);

      pipeline.process(new Exchange(), function(exchange) {
        spy1.calledOnce.should.be.true;
        spy2.calledOnce.should.be.false;
        exchange.error.should.be.an.Error;
        exchange.error.message.should.equal('failed to process');
        done();
      });
    });
  });

});