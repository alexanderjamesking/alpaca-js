var assert = require('should'),
    Alpaca = require('../lib/alpaca'),
    Context = Alpaca.Context,
    RouteBuilder = Alpaca.RouteBuilder,
    Exchange = Alpaca.Exchange,
    Message = Alpaca.Message,
    TextAppender = require('./processor/text_appender');

describe('Alpaca', function() {

  it('should allow creation of simple route', function(done) {

    var myRoute = new RouteBuilder().from("direct:hello")
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

  it('should allow sending from one route to another', function(done) {

    var context = new Context();

    context.addRoute(new RouteBuilder().from("direct:hello")
                                       .process(new TextAppender('Hello '))
                                       .to('direct:world')
                                       .build());

    context.addRoute(new RouteBuilder().from("direct:world")
                                       .process(new TextAppender('World!'))
                                       .to('direct:out')
                                       .build());

    context.on('direct:out', function(exchange) {
      exchange.message.body.should.equal('Hello World!');
      done();
    });

    context.send('direct:hello', new Exchange());

  });

  it('should allow sending to multiple routes', function(done) {

        var cx = new Context();

        cx.addRoute(new RouteBuilder(cx).from("direct:one")
                                       .process(new TextAppender(' 1!'))
                                       .build());

        cx.addRoute(new RouteBuilder(cx).from("direct:two")
                                       .process(new TextAppender(' 2!'))
                                       .build());

        cx.addRoute(new RouteBuilder(cx).from("direct:three")
                                       .process(new TextAppender(' 3!'))
                                       .to('direct:outbound')
                                       .build());

        cx.addRoute(new RouteBuilder(cx).from("direct:multicast")
                                        .process(new TextAppender('Hello'))
                                        .multicast('direct:one', 'direct:two', 'direct:three')
                                        .build());

        cx.on('direct:outbound', function(exchange) {
          exchange.message.body.should.equal('Hello 3!');
          done();
        });

        cx.send('direct:multicast', new Exchange());
  });

});