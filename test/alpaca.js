var assert = require('should'),
    Alpaca = require('../lib/alpaca'),
    Context = Alpaca.Context,
    RouteBuilder = Alpaca.RouteBuilder,
    Choice = Alpaca.Choice,
    When = Alpaca.When,
    Exchange = Alpaca.Exchange,
    Message = Alpaca.Message,
    TextAppender = require('./processor/text_appender');

describe('Alpaca', function() {

/*
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

  describe('choice', function() {
    it('should send to the first processor whose expression is true', function(done) {      
      var cx = getContextWithChoiceRoute();
      cx.on('out:choice', function(exchange) {
        exchange.message.body.should.equal('Alexander!');
        done();
      });

      cx.send('in:choice', new Exchange(new Message(null, "Alex")));
    });

    it('should allow routing to a processor based on an expression', function(done) {      
      var cx = getContextWithChoiceRoute();
      cx.on('out:choice', function(exchange) {
        exchange.message.body.should.equal('Bob Dylan!');
        done();
      });

      cx.send('in:choice', new Exchange(new Message(null, "Bob")));
    });

    it('should send to the otherwise if present and no other expressions match', function(done) {      
      var cx = getContextWithChoiceRoute();
      cx.on('out:choice', function(exchange) {
        exchange.message.body.should.equal('Hello World!');
        done();
      });

      cx.send('in:choice', new Exchange(new Message(null, "Hello")));
    });

    it('should work for things other than text', function(done) {
      var cx = getContextWithChoiceRoute();
      cx.on('out:choice', function(exchange) {
        exchange.message.body.should.equal('Message has a few headers!');
        done();
      });

      var headers = {
        hello : "foobar",
        number: 4
      };

      cx.send('in:choice', new Exchange(new Message(headers, "Message ")));
    });

    function getContextWithChoiceRoute() {
      var cx = new Context();

      var rb = new RouteBuilder(cx);
      rb.from("in:choice")
        .choice(new Choice()
                  .when(new When('message.body == "Alex"', new TextAppender('ander')))
                  .when(new When('Object.keys(message.headers).length > 1', new TextAppender('has a few headers')))
                  .when(new When('message.body == "Bob"', new TextAppender(' Dylan')))
                  .otherwise(new TextAppender(' World')))
        .process(new TextAppender("!"))
        .to("out:choice");

      cx.addRoute(rb.build());

      return cx;
    }
  });
*/


});