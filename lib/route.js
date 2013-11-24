function isString(s) {
  return (typeof s === "string" || (typeof s === "object" && s.constructor === String));
}

function Route(from, pipeline, to) {

  if (!isString(from))
    throw new Error('from must be a string');

  this.from = from;
  this.pipeline = pipeline;
  this.to = (typeof to !== 'undefined' && isString(to))? to : null;
}

Route.prototype.process = function(exchange) {
  this.pipeline.process(exchange);
};

module.exports = Route;