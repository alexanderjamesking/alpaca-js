Alpaca
======

EIP for Node.js, influenced by Apache Camel.

WARNING - NOT PRODUCTION READY

This is very much a work in progress, and functionality is somewhat limited at present. It should look similar to the Camel Java DSL when basic functionality is in place.

Currently only a basic route (pipeline of processors) and multicast supported. I'll be adding content and header based routing next which will be the minimum requirements for this to start to be useful in projects.

If you're interested in the project and would like to contribute please get in touch

UPDATE - I've since decided that a full EIP like Camel for Node.js is too heavyweight and we are better off focusing on microservices so I've stopped work on this project. I'd recommend using the async library (https://github.com/caolan/async) for pipelines and writing small functions, I'm not convinced node projects should be any bigger than that.

Cheers

@superaking



## Key Concepts

### Exchange
Object passed between routes and processors, contains a Message.

### Message
Object that contains content and headers.

### Endpoint
URI that identifies an input or an output

### Processor
A function(exchange, callback) or an object with a process(exchange, callback) function, if object is passed then it binds to the object

### Route
Input endpoint, a pipeline and an optional output endpoint

### Pipeline
A list of processors that the exchange is passed through sequentially


## Core Processors

### When
- contains a truthy expression (usually checking something on the exchange)
- wraps a processor / endpoint

### Choice
- a list of When processors
- loops through and sends to the first When processor whose expression is true

### To
- sends to an endpoint
- calls back to the exchange

### Multicast
- sends to multiple endpoints or processors

### Filter
- filters based on an expression

### Splitter

### Aggregator

### Wiretap


## Basic Useage with Route Builder

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
