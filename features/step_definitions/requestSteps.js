var assert = require('should'),
    TextAppender = require('../support/text_appender'),
    Alpaca = require('../../lib/alpaca'),
    Context = Alpaca.Context,
    RouteBuilder = Alpaca.RouteBuilder,
    Exchange = Alpaca.Exchange,
    Message = Alpaca.Message;

var steps = function () {

  var world = this.World;

  this.Given(
    /^a "([^"]*)" route that appends "([^"]*)" to a message$/, 
    function(endpoint, text, callback) {

    world.context.addRoute(
      new RouteBuilder(world.context)
        .from(endpoint)
        .process(new TextAppender(text))
        .build()
    );
    callback();
  });

  this.Given(
    /^a "([^"]*)" route which appends "([^"]*)" then calls the "([^"]*)" route$/, 
    function(endpoint, text, nestedRoute, callback) {

    world.context.addRoute(
      new RouteBuilder(world.context)
        .from(endpoint)
        .process(new TextAppender(text))
        .to(nestedRoute)
        .build()
    );
    callback();
  });

  this.When(/^I send an exchange to "([^"]*)" with the message "([^"]*)"$/, 
    function(endpoint, body, callback) {

    world.context.request(endpoint, new Exchange(new Message(null, body)), function(exchange) {
      world.exchange = exchange;
      callback();
    });
  });

  this.Then(/^I get a message back containing "([^"]*)"$/, function(expectedBody, callback) {
    world.exchange.message.body.should.equal(expectedBody);
    callback();
  });

  this.When(/^I send an exchange to the "([^"]*)" route$/, function(endpoint, callback) {
    world.context.request(endpoint, new Exchange(), function(exchange) {
      world.exchange = exchange;
      callback();
    });
  });

};

module.exports = steps;