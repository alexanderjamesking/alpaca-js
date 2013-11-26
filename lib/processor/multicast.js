var util = require('util'),
    clone = require('clone'),
    utils = require('../utils'),
    Context = require('../context'),
    EventEmitter = require('events').EventEmitter;

function Multicast(context) {

  if (utils.isUndefined(context))
    throw new Error('no Context provided');

  if (!utils.isOfType(context, 'Context'))
    throw new Error("'" + context + "' is not a instance of Context");

  this.context = context;
  this.destinations = [];
}

util.inherits(Multicast, EventEmitter);

Multicast.prototype.process = function(exchange, callback) {
  var self = this;

  this.destinations.forEach(function(element, index, array) {
    var clonedExchange = clone(exchange);

    // string destination - send to context
    if (utils.isString(element))
      self.context.send(element, clonedExchange);
    else // function destination , call and do nothing with the response
      element(clonedExchange, function(){});
  });

  callback(null, exchange);
};

Multicast.prototype.addDestination = function(destination) {
  if (utils.isString(destination)) {
    this.destinations.push(destination);
  } else if (utils.isObject(destination)) {

    if (typeof destination.process !== 'function')
      throw new Error('Destination object must have a process function');

    this.destinations.push(destination.process.bind(destination));
  } else {
    throw new Error('Destination must be a String or a Processor');
  }
}

module.exports = Multicast;