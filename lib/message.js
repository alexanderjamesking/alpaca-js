function Message(headers, body) {
  this.headers = (typeof headers !== 'undefined' && headers != null)? headers : {};
  this.body = (typeof body !== 'undefined')? body : '';
}

module.exports = Message;