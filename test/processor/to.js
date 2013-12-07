var assert = require('should'),
    sinon = require('sinon'),
    To = require('../../lib/processor/to'),
    Exchange = require('../../lib/exchange'),
    Message = require('../../lib/message'),
    Context = require('../../lib/context');

describe('ToProcessor', function() {

  describe('constructor', function() {
    it('should store a reference to the context', function() {
      var to = new To(new Context(), 'myEndpoint');
      to.context.should.be.a.Context;
    });

    it('should store the endpoint', function() {
      var to = new To(new Context(), 'myEndpoint');
      to.endpoint.should.equal('myEndpoint');
    });
  });

  describe('process', function() {
    it('should call request on the context and callback with the response', function(done) {
      
      var mockRoute = {
        from: 'myEndpoint',
        process: function(exchange, callback) {
          callback(exchange);
        }
      };

      var context = new Context();
      var spy = sinon.spy(context, "request");
      context.addRoute(mockRoute);

      var to = new To(context, 'myEndpoint');

      to.process(new Exchange(new Message(null, 'hello')), function(err, ex) {
        spy.calledOnce.should.be.true;
        spy.args[0][0].should.equal('myEndpoint');
        spy.args[0][1].message.body.should.equal('hello');
        spy.args[0][2].should.be.a.Function;
        done();
      });
    });
  });
});
