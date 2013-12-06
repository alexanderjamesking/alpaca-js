module.exports.isString = function (s) {
  return (typeof s === "string" || (typeof s === "object" && s.constructor === String));
};

module.exports.isUndefined = function (arg) {
  return (typeof arg === 'undefined');
};

module.exports.isObject = function(arg) {
  return (typeof arg === 'object');
};

module.exports.isOfType = function (obj, type) {
  return (obj.constructor.name === type);
};