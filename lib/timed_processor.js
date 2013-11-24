function TimedProcessor(processor) {
  this.processor = processor;
}

TimedProcessor.prototype.process = function(exchange, callback) {
  var start = new Date().getTime();

  this.processor.process(exchange, function (err, result) {
    var end = new Date().getTime();
    var timeTaken = end-start;

    console.log('processor took: %d milliseconds', timeTaken);

    callback(null, exchange);
  });
};

module.exports = TimedProcessor;