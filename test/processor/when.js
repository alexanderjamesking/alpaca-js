var assert = require('should'),
    sinon = require('sinon'),
    When = require('../../lib/processor/when'),
    Exchange = require('../../lib/exchange'),
    TextAppender = require('../processor/text_appender');

describe('When', function() {

  it('should require an expression', function() {
    var when = new When('message.body. == "hello"', new TextAppender('World'));
    when.expression.should.equal('message.body. == "hello"');    
    when.processor.should.be.a.TextAppender;
  });

  it('should forward process calls to the processor', function() {
    var processor = new TextAppender('World');
    var spy = sinon.spy(processor, 'process');
    var when = new When('message.body. == "hello"', processor);

    when.process(new Exchange(), function(err, exchange) {
      spy.called.should.be.true;
      exchange.message.body.should.equal('World');
    });
  });

});

