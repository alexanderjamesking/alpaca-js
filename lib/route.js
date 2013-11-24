var util = require('util');
var EventEmitter = require('events').EventEmitter;

function isString(s) {
  return (typeof s === "string" || (typeof s === "object" && s.constructor === String));
}

function Route(from, pipeline, to) {
  if (!isString(from))
    throw new Error('from must be a string');

  this.from = from;
  this.pipeline = pipeline;
  this.to = (typeof to !== 'undefined' && isString(to))? to : null;
}

util.inherits(Route, EventEmitter);

Route.prototype.process = function(exchange) {
  var self = this;

  this.pipeline.process(exchange, function(exchange){
    self.emit(self.to, exchange);
  });
};

module.exports = Route;