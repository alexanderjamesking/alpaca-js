function Choice() {
  this.processors = [];
}

Choice.prototype.when = function(whenProcessor) {
  this.processors.push(whenProcessor);
  return this;
};


Choice.prototype.process = function(exchange, callback) {
  var i = 0;
  var message = exchange.message;

  while (i < this.processors.length) {
    if (eval(this.processors[i].expression)) {
      this.processors[i].process(exchange, function(err, ex) {
        callback(null, ex);
      });
      break;
    }
    i++;
  };
};

module.exports = Choice;