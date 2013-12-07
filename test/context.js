var should = require('should'),
    Context = require('../lib/context'),
    Alpaca = require('../lib/alpaca'),
    RouteBuilder = Alpaca.RouteBuilder,
    Exchange = Alpaca.Exchange,
    TextAppender = require('./processor/text_appender');

describe('Context', function() {

  it('should allow subscriptions to endpoints', function(){
    var context = new Context();
    context.on('out:uri', function(exchange) {});
  });

  describe('add route', function() {
    it('should allow routes to be added', function() {
      var context = new Context();
      context.addRoute(getRoute());
    });
  });

  describe('request', function() {

    it('should send the exchange to a route and callback with the response', function(done) {
      var context = new Context();
      context.addRoute(getRoute());

      context.request('sayHello', new Exchange(), function(exchange) {
        exchange.message.body.should.equal('Hello World!');
        done();
      });
    });

    it('should support nested routes', function(done) {
      var context = new Context();
      context.addRoute(
        new RouteBuilder(context)
          .from("sayHello")
          .process(new TextAppender('Hello '))
          .process(new TextAppender('World!'))
          .build()
        );

      context.addRoute(
        new RouteBuilder(context)
          .from("helloGoodbye")
          .to("sayHello")
          .process(new TextAppender(' Goodbye World!'))
          .build()
      );

      context.request('helloGoodbye', new Exchange(), function(exchange) {
        exchange.message.body.should.equal('Hello World! Goodbye World!');
        done();
      });

    });

  });

/*
  describe('send', function() {
    it('should send exchange to a route', function(done) {
      var context = new Context();
      context.addRoute(getRoute());
      context.on('out:hello', function(exchange) {
        exchange.message.body.should.equal('Hello World!');
        done();
      });
      context.send('in:hello', new Alpaca.Exchange());
    });
  });

*/

  function getRoute() {
    return new Alpaca.RouteBuilder()
      .from("sayHello")
      .process(new TextAppender('Hello '))
      .process(new TextAppender('World!'))
      .build();
  }
});