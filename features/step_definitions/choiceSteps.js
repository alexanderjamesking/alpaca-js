var assert = require('should'),
    sinon = require('sinon'),
    TextAppender = require('../support/text_appender'),
    Alpaca = require('../../lib/alpaca'),
    Context = Alpaca.Context,
    Choice = Alpaca.Choice,
    When = Alpaca.When,
    RouteBuilder = Alpaca.RouteBuilder,
    Exchange = Alpaca.Exchange,
    Message = Alpaca.Message;

var steps = function () {

  var world = this.World;

  this.Given(
    /^a route "([^"]*)" which routes content based on the expressions:$/, 
    function(endpoint, table, callback) {

    var rows = table.rows();
    var choice = new Choice();

    for (var i = 0; i < rows.length; i++) {
      var action = rows[i][0];
      var expression = rows[i][1];  
      var textToAppend = rows[i][2];

      if (action === "when")
        choice.when(new When(expression, new TextAppender(textToAppend)));
      else if (action === "otherwise")
        choice.otherwise(new TextAppender(textToAppend))
    }
    
    world.context.addRoute(
      new RouteBuilder(world.context)
        .from(endpoint)
        .choice(choice)
        .build()
    );

    callback();
  });

  this.When(
    /^I send an exchange to the "([^"]*)" route with the body "([^"]*)"$/, 
    function(endpoint, body, callback) {

    world.context.request(endpoint, new Exchange(new Message(null, body)), function(exchange) {
      world.exchange = exchange;
      callback();
    });
  });

  this.Then(/^the exchange body contains "([^"]*)"$/, function(expectedBody, callback) {
    world.exchange.message.body.should.equal(expectedBody);
    callback();
  });

};

module.exports = steps;