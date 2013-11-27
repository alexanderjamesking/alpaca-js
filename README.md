alpaca
======

EIP for Node.js, influenced by Apache Camel.

This is very much a work in progress, and functionality is somewhat limited at present. It should look similar to the Camel Java DSL when basic functionality is in place.

Currently only a basic route (pipeline of processors) and multicast supported. I'll be adding content and header based routing next which will be the minimum requirements for this to start to be useful in projects.

If you're interested in the project and would like to contribute please get in touch

Cheers

@superaking


```
var Alpaca = require('alpaca'),
    Context = Alpaca.Context,
    RouteBuilder = Alpaca.RouteBuilder,
    Exchange = Alpaca.Exchange,
    Message = Alpaca.Message,

// basic processor that processes an exchange, appending a string to the body
function TextAppender(textToAppend) {
  this.textToAppend = textToAppend;
}

// processors should provide a process method that takes an exchange
// and a callback
TextAppender.prototype.process = function(exchange, callback) {

  // process the exchange
  exchange.message.body += this.textToAppend;

  // callback (err, exchange)
  callback(null, exchange);
};


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
  // exchange.message.body == 'Hello 3!'
  done();
});

cx.send('direct:multicast', new Exchange());
        
```
