var assert = require('should'),
    Alpaca = require('../lib/alpaca'),
    TextAppender = require('./processor/text_appender');

describe('Alpaca', function() {

  it('should allow creation of simple route', function(done) {

    var myRoute = new Alpaca.RouteBuilder().from("direct:in")
                                           .process(new TextAppender('Hello '))
                                           .process(new TextAppender('World!'))
                                           .to('direct:out')
                                           .build();

    myRoute.on('direct:out', function(exchange) {
      exchange.message.body.should.equal('Hello World!');
      done();
    });

    myRoute.process(new Alpaca.Exchange());
  });

});