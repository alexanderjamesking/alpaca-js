var assert = require('should'),
    sinon = require('sinon'),
    Multicast = require('../../lib/processor/multicast'),
    Exchange = require('../../lib/exchange'),
    Context = require('../../lib/context'),
    TextAppender = require('./text_appender');

describe('Multicast', function() {

  describe('constructor', function() {
    it('should require a Context', function(done) {
      try {
        var multicast = new Multicast();
        done(new Error('expected an error exception'));
      } catch (e) {
        e.message.should.equal("no Context provided");
        done();
      }
    });

    it('should store a reference to the context', function() {
      var multicast = new Multicast(new Context());
      multicast.context.should.be.a.Context;
    });
  });

  it('should have a list of destinations', function() {
    var multicast = new Multicast(new Context());
    multicast.destinations.length.should.equal(0);
  });

  it('should be possible to add destinations', function() {
    var multicast = new Multicast(new Context());
    multicast.addDestination('uri-one');
    multicast.addDestination('uri-two');
    multicast.destinations.length.should.equal(2);
  });

  it('should be possible to add a processor as a destination', function() {
    var multicast = new Multicast(new Context());
    multicast.addDestination(new TextAppender('foobar'));
    multicast.destinations[0].should.be.a.Function;
  });  

  it('should be an event emitter', function(){
    var multicast = new Multicast(new Context());
    multicast.on('some-uri', function(exchange) {});
  });

  describe('process', function() {
    it('should send events to destinations via context', function(done) {
      var context = new Context();
      var spy = sinon.spy(context, "send");
      var multicast = new Multicast(context);
      multicast.addDestination('uri-one');
      multicast.addDestination('uri-two');

      multicast.process(new Exchange(), function(err, exchange) {
        spy.calledTwice.should.be.true;
        spy.firstCall.args[0].should.equal('uri-one');
        spy.secondCall.args[0].should.equal('uri-two');
        done();
      });
    });

    it('should call process if the destination is a processor', function(done) {
      var context = new Context();
      var spy = sinon.spy(context, "send");
      var multicast = new Multicast(context);
      multicast.addDestination('uri-one');

      var processor = new TextAppender('foobar');
      var processSpy = sinon.spy(processor, 'process');

      multicast.addDestination(processor);

      multicast.process(new Exchange(), function(err, exchange) {
        spy.firstCall.args[0].should.equal('uri-one');
        processSpy.calledOnce.should.be.true;
        done();
      });
    });
  });
  
});