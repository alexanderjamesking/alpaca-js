var Message = require('./message');

function Exchange(inMessage) {
  this.inMessage = (typeof inMessage !== 'undefined' && inMessage != null)? inMessage : new Message();
}

module.exports = Exchange;