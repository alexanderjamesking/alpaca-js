var assert = require('should'),
    TextAppender = require('../support/text_appender'),
    Alpaca = require('../../lib/alpaca'),
    Context = Alpaca.Context,
    RouteBuilder = Alpaca.RouteBuilder,
    Choice = Alpaca.Choice,
    When = Alpaca.When,
    Exchange = Alpaca.Exchange,
    Message = Alpaca.Message;

var steps = function () {
  var world = this.World;

  this.Before(function(callback) {
    world.context = new Context();
    world.exchange = null;
    world.spies = {};
    callback();
  });

};

module.exports = steps;