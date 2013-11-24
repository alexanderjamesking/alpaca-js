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

      it('should accept an object string', function() {
        var route = new Route(new String('foo'));
        route.from.should.equal('foo');
      });
    });

    describe('pipeline', function() {
      it('should be the second argument', function() {
        var route = new Route('foo', new Pipeline());
        route.pipeline.should.be.a.Pipeline;
      });
    });

    describe('to', function() {
      it('should be the third argument', function() {
        var route = new Route('fromuri',  new Pipeline(), 'touri');
        route.to.should.equal('touri');
      });

      it('should default to null', function() {
        var route = new Route('fromuri');
        (route.to == null).should.be.true;
      });
    });
  });

  it('should allow subscriptions for the to event', function(){
    var route = new Route('fromuri', new Pipeline(), 'touri');
    route.on('touri', function(exchange) {});
  });

  describe('process', function() {
    it('should dispatch event to touri when complete', function(done) {

      var pipeline = new Pipeline();
      pipeline.addProcessor(new TextAppender('foo'));
      pipeline.addProcessor(new TextAppender('bar'));

      var route = new Route('fromuri', pipeline, 'touri');

      route.on('touri', function(ex) {
        ex.message.body.should.equal('foobar');
        done();
      });

      route.process(new Exchange());
    });
  });

});