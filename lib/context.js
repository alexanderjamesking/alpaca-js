var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Context() {
  this.routes = {};
}

util.inherits(Context, EventEmitter);

Context.prototype.addRoute = function(route) {
  var self = this;
  this.routes[route.from] = route;

/*
  route.on(route.to, function(exchange) {
    self.send(route.to, exchange);
    self.emit(route.to, exchange);
  });
*/
};

Context.prototype.send = function(routeUri, exchange) {
  if (this.routes[routeUri])
    this.routes[routeUri].process(exchange);
};

Context.prototype.request = function(endpoint, exchange, callback) {
  if (this.routes[endpoint])
    this.routes[endpoint].process(exchange, callback);
};

module.exports = Context;