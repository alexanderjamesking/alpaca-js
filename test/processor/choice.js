var assert = require('should'),
    sinon = require('sinon'),
    Choice = require('../../lib/processor/choice'),
    When = require('../../lib/processor/when'),
    Exchange = require('../../lib/exchange'),
    Message = require('../../lib/message'),
    TextAppender = require('../processor/text_appender');

describe('Choice', function() {

  it('should be possible to add a "When" processor', function() {
    var choice = new Choice();
    choice.when(new When('message.body. == "Marcus"', new TextAppender(' Trescothick')));
    choice.processors.length.should.equal(1);
  });

  it('should be possible to chain "When" processors', function() {
    var choice = getChoiceWithMultipleWhens();
    choice.processors.length.should.equal(2);
  });

  it('should be possible to add a processor as an otherwise', function(done) {
    var choice = getChoiceWithMultipleWhens();
    choice.otherwise(new TextAppender("Someone Else"));
    choice.process(new Exchange(new Message(null, 'Not Marcus or Monty - ')), function(err, exchange) {
        exchange.message.body.should.equal('Not Marcus or Monty - Someone Else');
        done();
    });
  });

  describe('process', function() {
    it('should execute the first processor if the expression evaluates', function(done) {
      var choice = getChoiceWithMultipleWhens();
      choice.process(new Exchange(new Message(null, 'Marcus')), function(err, exchange) {
        exchange.message.body.should.equal('Marcus Trescothick');
        done();
      });
    });

    it('should execute the second processor if the expression evaluates', function(done) {
      var choice = getChoiceWithMultipleWhens();
      choice.process(new Exchange(new Message(null, 'Monty')), function(err, exchange) {
        exchange.message.body.should.equal('Monty Panesar');
        done();
      });
    });

    //TODO if a string 'to' is present it should dispatch an event
    //TODO if a process 'to' is present it should call process on the to
  });

  function getChoiceWithMultipleWhens() {
    return new Choice()
                  .when(new When('message.body == "Marcus"', new TextAppender(' Trescothick')))
                  .when(new When('message.body == "Monty"', new TextAppender(' Panesar')));
  }
  
});

