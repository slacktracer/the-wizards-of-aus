function CoreError (message, code) {

  this.code = code || 0;
  this.name = 'CoreError';
  this.message = message || 'Core Error Message';
  this.stack = new Error().stack;

}

CoreError.prototype = Object.create(Error.prototype);
CoreError.prototype.constructor = CoreError;

module.exports = CoreError;
