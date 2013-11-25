var assert = require('should'),
    Alpaca = require('../lib/alpaca'),
    RouteBuilder = Alpaca.RouteBuilder,
    Exchange = Alpaca.Exchange,
    Message = Alpaca.Message,
    TextAppender = require('./processor/text_appender');

describe('Alpaca', function() {

  it('should allow creation of simple route', function(done) {

    var myRoute = new RouteBuilder().from("direct:in")
                                           .process(new TextAppender('Hello '))
                                           .process(new TextAppender('World!'))
                                           .to('direct:out')
                                           .build();

    myRoute.on('direct:out', function(exchange) {
      exchange.message.body.should.equal('Hello World!');
      done();
    });

    myRoute.process(new Exchange());
  });

});