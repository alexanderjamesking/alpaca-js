var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Context() {
  this.routes = {};
}

util.inherits(Context, EventEmitter);

Context.prototype.addRoute = function(route) {
  var self = this;
  this.routes[route.from] = route;

  route.on(route.to, function(exchange) {
    self.send(route.to, exchange);
    self.emit(route.to, exchange);
  });
}

Context.prototype.send = function(routeUri, exchange) {
  if (this.routes[routeUri])
    this.routes[routeUri].process(exchange);
}

module.exports = Context;