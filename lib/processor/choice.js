function Choice() {
  this.processors = [];
  this.otherwiseProcessor = null;
}

Choice.prototype.when = function(whenProcessor) {
  this.processors.push(whenProcessor);
  return this;
};

Choice.prototype.otherwise = function(processor) {
  this.otherwiseProcessor = processor;
  return this;
};

Choice.prototype.process = function(exchange, callback) {
  var i = 0;
  var message = exchange.message;
  var foundAMatch = false;

  while (i < this.processors.length) {
    if (eval(this.processors[i].expression)) {
      foundAMatch = true;
      break;
    }
    i++;
  }

  if (foundAMatch) {
    this.processors[i].process(exchange, function(err, ex) {
      callback(null, ex);
    });
  } else if (this.otherwiseProcessor != null) {
    this.otherwiseProcessor.process(exchange, function(err, ex) {
      callback(null, ex);  
    });
  }

};

module.exports = Choice;