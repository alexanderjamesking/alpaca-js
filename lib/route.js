var util = require('util'),
    utils = require('./utils'),
    EventEmitter = require('events').EventEmitter;

function Route(from, pipeline, to) {
  if (!utils.isString(from))
    throw new Error('from must be a string');

  this.from = from;
  this.pipeline = pipeline;
}

Route.prototype.process = function(exchange, callback) {  
  this.pipeline.process(exchange, function(ex) {
    callback(ex);
  });
};

module.exports = Route;