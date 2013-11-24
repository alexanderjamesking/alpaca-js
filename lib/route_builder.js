var Pipeline = require('./pipeline'),
    Route = require('./route');

function RouteBuilder() {
  this.pipeline = new Pipeline();
}

RouteBuilder.prototype.from = function(endpoint) {
  this.from = endpoint;
  return this;
}

RouteBuilder.prototype.to = function(endpoint) {
  this.to = endpoint;
  return this;
}

RouteBuilder.prototype.process = function(processor) {
  this.pipeline.addProcessor(processor);
  return this;
}

RouteBuilder.prototype.build = function() {
  return new Route(this.from, this.pipeline, this.to);
}

module.exports = RouteBuilder;