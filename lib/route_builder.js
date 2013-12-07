var Pipeline = require('./pipeline'),
    Route = require('./route'),
    utils = require('./utils'),
    Multicast = require('./processor/multicast'),
    To = require('./processor/to');

function RouteBuilder(context) {
  this.context = context;
  this.pipeline = new Pipeline();
  this.fromUri = null;
}

RouteBuilder.prototype.from = function(endpoint) {
  this.fromUri = endpoint;
  return this;
};

RouteBuilder.prototype.to = function(endpoint) {
  this.pipeline.addProcessor(new To(this.context, endpoint));
  return this;
};

RouteBuilder.prototype.process = function(processor) {
  this.pipeline.addProcessor(processor);
  return this;
};

RouteBuilder.prototype.choice = function(choice) {
  this.pipeline.addProcessor(choice);
  return this;
};

RouteBuilder.prototype.multicast = function() {

  var multicast = new Multicast(this.context);

  for (var i = 0; i < arguments.length; i++)
    multicast.addDestination(arguments[i]);

  this.pipeline.addProcessor(multicast);

  return this;
};

RouteBuilder.prototype.build = function() {
  if (this.fromUri == null)
    throw new Error("'from' endpoint cannot be null");

  if (!utils.isString(this.fromUri))
    throw new Error("'from' endpoint must be a string");

  return new Route(this.fromUri, this.pipeline);
};

module.exports = RouteBuilder;