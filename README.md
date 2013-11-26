alpaca
======

EIP for Node.js, influenced by Apache Camel.

This is very much a work in progress, and functionality is somewhat limited at present. It should look similar to the Camel Java DSL when basic functionality 
is in place.

```
var Alpaca = require('alpaca');

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

var myRoute = new Alpaca.RouteBuilder().from("direct:in")
                                           .process(new TextAppender('Hello '))
                                           .process(new TextAppender('World!'))
                                           .to('direct:out')
                                           .build();

myRoute.on('direct:out', function(exchange) {
  console.log(exchange.message.body);
});

// example of processing a route - this will be done with events via a context soon
myRoute.process(new Alpaca.Exchange());
```
