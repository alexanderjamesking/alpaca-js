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

  this.When(
    /^I send an exchange to the "([^"]*)" route with the body "([^"]*)"$/, 
    function(endpoint, body, callback) {

    world.context.request(endpoint, new Exchange(new Message(null, body)), function(exchange) {
      world.exchange = exchange;
      callback();
    });
  });

  this.Given(
    /^a route "([^"]*)" which routes content based on the expressions:$/, 
    function(endpoint, table, callback) {

    var rows = table.rows();
    var choice = new Choice();

    for (var i = 0; i < rows.length; i++) {
      var expression = rows[i][0];  
      var textToAppend = rows[i][1];
      choice.when(new When('message.body === "A"', new TextAppender(textToAppend)));
    }
    
    world.context.addRoute(
      new RouteBuilder(world.context)
        .from(endpoint)
        .choice(choice)
        .build()
    );

    callback();
  });

  this.Then(/^output A receives the message$/, function(callback) {
    world.exchange.message.body.should.equal('A-choiceA');
    callback();
  });

};

module.exports = steps;