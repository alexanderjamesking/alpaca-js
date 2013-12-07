function TextAppender(textToAppend) {
  this.textToAppend = textToAppend;
}

TextAppender.prototype.process = function(exchange, callback) {
  exchange.message.body += this.textToAppend;
  callback(null, exchange);
};

module.exports = TextAppender;