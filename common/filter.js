'use strict';

/**
 * Filter object
 *
 * @constructor
 * @param {String} name
 * @param {Function} handler
 * @param {Array} [only]
 * @param {Array} [except]
 * @private
 * @api private
 */
var Filter = module.exports = function Filter(name, handler, options) {
  this.name = name;
  this.handler = handler;
  handler._name = name;

  // ignore 'except' when used with 'only'
  if (options && options.only)
    this.only = [].concat(options.only);
  else if (options && options.except)
    this.except = [].concat(options.except);
};

/**
 * Returns the filter applicable to action
 * @private
 * @api private
 */
Filter.prototype.applicableTo = function (action) {
  if (this.only && this.only.length)
    return ~this.only.indexOf(action); // found
  if (this.except && this.except.length)
    return !~this.except.indexOf(action); // not found
  return true;
};

/**
 * Add action(s) to only
 *
 * @param {Array|String} action Action(s) to include
 * @return this
 * @api private
 */
Filter.prototype.include = function (action) {
  var actions = [].concat(action);

  // adds to only
  this.only = [].concat(this.only, actions);

  // removes from except
  if (this.except && this.except.length) {
    this.except = this.except.filter(function (name) {
      return !~actions.indexOf(name);
    });
  }
  return this;
};

/**
 * Add action(s) to except
 *
 * @param {Array|String} action Action(s) to exclude
 * @return this
 * @api private
 */
Filter.prototype.exclude = function (action) {
  var actions = [].concat(action);

  // adds to except
  this.except = [].concat(this.except, actions);

  // removes from only
  if (this.only) {
    this.only = this.only.filter(function (name) {
      return !~actions.indexOf(name);
    });
  }
  return this;
};