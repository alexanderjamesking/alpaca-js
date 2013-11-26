var util = require('util'),
    utils = require('./utils'),
    EventEmitter = require('events').EventEmitter;

function Route(from, pipeline, to) {
  if (!utils.isString(from))
    throw new Error('from must be a string');

  this.from = from;
  this.pipeline = pipeline;

  

  this.to = (to == null) ? null : (typeof to !== 'undefined' && utils.isString(to))? to : null;
}

util.inherits(Route, EventEmitter);

Route.prototype.process = function(exchange) {
  var self = this;
  self.pipeline.process(exchange, function(exchange){
    if (self.to !== null)
      self.emit(self.to, exchange);
  });
};

module.exports = Route;