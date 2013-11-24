var should = require('should'),
    RouteBuilder = require('../lib/route_builder'),
    Route = require('../lib/route'),
    Pipeline = require('../lib/pipeline'),
    TextAppender = require('./processor/text_appender');

describe('RouteBuilder', function() {

  describe('constructor', function() {
    it('should create an empty pipeline', function() {
      var builder = new RouteBuilder();
      builder.pipeline.should.be.a.Pipeline;
    });
  });

  it('from', function() {
    var builder = new RouteBuilder().from('myuri');
    builder.should.be.a.RouteBuilder;
    builder.from.should.equal('myuri');
  });

  it('to', function() {
    var builder = new RouteBuilder().to('myuri');
    builder.should.be.a.RouteBuilder;
    builder.to.should.equal('myuri');
  });

  describe('process', function() {
    it('should add a processor to the pipeline', function() {
      var builder = new RouteBuilder().process(new TextAppender('foo'));
      builder.pipeline.processors.length.should.equal(1);
    });
  });

  it('should allow chaining of methods', function() {
    var builder = new RouteBuilder().from('fromuri')
                                    .process(new TextAppender('foo'))
                                    .to('touri');
    builder.from.should.equal('fromuri');
    builder.pipeline.processors.length.should.equal(1);
    builder.to.should.equal('touri');
  });

  describe('build', function() {
    it('should create a route', function() {
      var builder = new RouteBuilder().from('fromuri')
                                      .process(new TextAppender('foo'))
                                      .to('touri');
      var route = builder.build();
      route.should.be.a.Route;
      route.from.should.equal('fromuri');
      route.pipeline.processors.length.should.equal(1);
      route.to.should.equal('touri');
    });
  });

});