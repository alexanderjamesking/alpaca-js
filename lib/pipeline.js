var async = require('async');

/**
 * Creates a pipeline, where an exchange is processed by 
 * passing it through the functions referenced in processors[]
 */
function Pipeline() {
	this.processors = [];
}

Pipeline.prototype.addProcessor = function(processor) {
  this.processors.push(processor.process.bind(processor));
}

Pipeline.prototype.process = function(exchange, callback) {
  async.waterfall([
    // init the pipeline with an exchange
    function(callback) {
      callback(null, exchange);
    }
    ].concat(this.processors),
    function(err, exchange) {
      if (err !== null)
        exchange.error = err;
      callback(exchange);
    }
  );
}

module.exports = Pipeline;