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

      var process = function(exchange, callback) {
        callback(null, exchange);
      };

      var spy = sinon.spy(process);

      var stubProcessor = {
        process : spy
      };

      pipeline.addProcessor(stubProcessor);

      pipeline.process(new Exchange(), function(err, data) {
          spy.calledOnce.should.be.true;
          spy.calledOn(stubProcessor).should.be.true;
          done();
      });
    });

    it('should iterate through all processors in the pipeline', function (done) {
      pipeline.addProcessor(new TextAppender('one '));
      pipeline.addProcessor(new TextAppender('two '));
      pipeline.addProcessor(new TextAppender('three'));
      pipeline.process(new Exchange(), function(err, data) {
        data.message.body.should.equal('one two three');
        done();
      });
    })
  });

});