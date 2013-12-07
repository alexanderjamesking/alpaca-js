var should = require('should'),
    sinon = require('sinon'),
    Route = require('../lib/route'),
    Exchange = require('../lib/exchange'),
    Message = require('../lib/message'),
    Pipeline = require('../lib/pipeline'),
    TextAppender = require('./processor/text_appender');

describe('Route', function() {

  describe('constructor', function() {
    describe('from', function() {
      it('should be the first argument', function() {
        var endpoint = 'myroute';
        var route = new Route(endpoint);
        route.from.should.equal('myroute');
      });

      it('should only accept a string', function() {
        try {
          var route = new Route(100);
        } catch (e) {
          e.message.should.equal('from must be a string');
        }
      });
    });

    describe('pipeline', function() {
      it('should be the second argument', function() {
        var route = new Route('foo', new Pipeline());
        route.pipeline.should.be.a.Pipeline;
      });
    });
  });

  describe('process', function() {
    it("should callback when complete", function(done) {
      var pipeline = new Pipeline();
      pipeline.addProcessor(new TextAppender('foo'));
      pipeline.addProcessor(new TextAppender('bar'));

      var route = new Route('fromuri', pipeline);
      route.process(new Exchange(), function(exchange) {
        exchange.message.body.should.equal('foobar');
        done();
      });
    });
  });
});