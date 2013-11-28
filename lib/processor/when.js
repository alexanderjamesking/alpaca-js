function When(expression, processor) {
  this.expression = expression;
  this.processor = processor;
}

When.prototype.process = function(exchange, callback) {
  this.processor.process(exchange, function(err, ex) {
    callback(null, ex);
  });
};

module.exports = When;