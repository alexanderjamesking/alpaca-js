function To(context, endpoint) {
  this.context = context;
  this.endpoint = endpoint;
}

To.prototype.process = function(exchange, callback) {
  this.context.request(this.endpoint, exchange, function(ex) {
    callback(null, ex);
  });
};

module.exports = To;