var assert = require('should'),
    sinon = require('sinon'),
    TextAppender = require('../support/text_appender'),
    Alpaca = require('../../lib/alpaca'),
    Context = Alpaca.Context,
    RouteBuilder = Alpaca.RouteBuilder,
    Exchange = Alpaca.Exchange,
    Message = Alpaca.Message;

var steps = function () {

  var world = this.World;

  this.Given(
    /^a "([^"]*)" route which sends messages to two consumer processors$/, 
    function(endpoint, callback) {

    var consumerProcessorA = new TextAppender('A');
    var consumerProcessorB = new TextAppender('B');

    world.spies['spyConsumerA'] = sinon.spy(consumerProcessorA, "process");
    world.spies['spyConsumerB'] = sinon.spy(consumerProcessorB, "process");

    world.context.addRoute(
      new RouteBuilder(world.context)
        .from(endpoint)
        .multicast(consumerProcessorA, consumerProcessorB)
        .build()
    );

    callback();
  });

  this.Then(/^both consumer processors receive the message$/, function(callback) {
    world.spies['spyConsumerA'].calledOnce.should.be.true;
    world.spies['spyConsumerB'].calledOnce.should.be.true;
    callback();
  });

  this.Then(/^the exchange should contain the original, unmodified message$/, function(callback) {
    world.exchange.message.body.should.equal('');
    callback();
  });
};

module.exports = steps;