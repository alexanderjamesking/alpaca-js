var Message = require('./message');

function Exchange(message) {
  this.message = (typeof message !== 'undefined' && message != null)? message : new Message();
}

module.exports = Exchange;