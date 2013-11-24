var assert = require('should'),
    sinon = require('sinon'),
    Message = require('../lib/message');

describe('Message', function() {

  it('headers should default to object', function() {
    var message = new Message();
    message.should.have.property('headers');
    message.headers.should.be.an.Object;
  });

  it('body should default to empty string', function() {
    var message = new Message();
    message.should.have.property('body');
    message.body.should.equal('');
  });

  it('should set headers if passed via constructor', function(){
    var headers = {
      'headerKey' : 'headerValue'
    };

    var message = new Message(headers);
    message.headers.headerKey.should.equal('headerValue');
  });

  it('should set body if passed via constructor', function(){
    var message = new Message(null, 'body');
    message.headers.should.be.an.Object;
    message.body.should.equal('body');
  });

});