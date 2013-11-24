function Processor() {
  
}

Processor.prototype.process = function(exchange, callback) {
  var timeToWait = Math.floor((Math.random()*1000)+1);
  setTimeout(function() { callback(null, exchange); }, timeToWait);  
};

module.exports = Processor;