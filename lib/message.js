var util = require('util');

function Message(headers, body) {
  this.headers = (typeof headers !== 'undefined' && headers != null)? headers : {};
  this.body = (typeof body !== 'undefined')? body : null;
}

module.exports = Message;