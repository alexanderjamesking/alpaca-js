var should = require('should'),
    Context = require('../lib/context'),
    Alpaca = require('../lib/alpaca'),
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

  function getRoute() {
    return new Alpaca.RouteBuilder()
      .from("in:hello")
      .process(new TextAppender('Hello '))
      .process(new TextAppender('World!'))
      .to('out:hello')
      .build();
  }
});