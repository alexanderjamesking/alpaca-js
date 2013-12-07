var should = require('should'),
    RouteBuilder = require('../lib/route_builder'),
    Context = require('../lib/context'),
    Route = require('../lib/route'),
    Pipeline = require('../lib/pipeline'),
    Choice = require('../lib/processor/choice'),
    When = require('../lib/processor/when'),
    To = require('../lib/processor/to'),
    TextAppender = require('./processor/text_appender');

describe('RouteBuilder', function() {

  describe('constructor', function() {
    it('should create an empty pipeline', function() {
      var builder = new RouteBuilder();
      builder.pipeline.should.be.a.Pipeline;
    });
  });

  it('from() should set from uri', function() {
    var builder = new RouteBuilder().from('myuri');
    builder.should.be.a.RouteBuilder;
    builder.fromUri.should.equal('myuri');
  });

  describe('to() should add a To[Processor] to the pipeline', function() {
    var builder = new RouteBuilder().from('myuri').to('anotherRoute');
    builder.pipeline.processors.length.should.equal(1);
  });

  describe('process', function() {
    it('should add a processor to the pipeline', function() {
      var builder = new RouteBuilder().process(new TextAppender('foo'));
      builder.pipeline.processors.length.should.equal(1);
    });
  });

  it('should allow chaining of methods', function() {
    var builder = new RouteBuilder().from('fromuri')
                                    .process(new TextAppender('foo'));
    builder.fromUri.should.equal('fromuri');
    builder.pipeline.processors.length.should.equal(1);
  });

  describe('multicast', function() {
    it('should create a multicast processor with multiple destinations', function() {

      var builder = new RouteBuilder(new Context());

      builder.from('direct:myroute')
             .multicast('direct:one', 'direct:two');

      builder.pipeline.processors.length.should.equal(1);
    });
  });

  describe('choice', function() {
    it('should add a choice processor to the pipeline', function() {
        var builder = new RouteBuilder();

        builder.choice(new Choice()
                        .when(new When('message.body == "Marcus"', new TextAppender(' Trescothick')))
                        .when(new When('message.body == "Monty"', new TextAppender(' Panesar')))
                        .otherwise(new TextAppender(' Nobody')));

        builder.pipeline.processors.length.should.equal(1);
    });
  });

  describe('build', function() {
    it('should create a route', function() {
      var builder = new RouteBuilder().from('fromuri')
                                      .process(new TextAppender('foo'));
      var route = builder.build();
      route.should.be.a.Route;
      route.from.should.equal('fromuri');
      route.pipeline.processors.length.should.equal(1);
    });

    it("should throw an error if 'from' is not set", function(done) {
      var builder = new RouteBuilder().process(new TextAppender('foo'));
      try {
        builder.build();
        done(new Error('Error was not thrown'));
      } catch(e) {
        e.message.should.equal("'from' endpoint cannot be null");
        done();
      }
    });

    it("should throw an error if 'from' is not a string", function(done) {
      var builder = new RouteBuilder().from(new TextAppender('foo'));
      try {
        builder.build();
        done(new Error('Error was not thrown'));
      } catch(e) {
        e.message.should.equal("'from' endpoint must be a string");
        done();
      }
    });

  });


});