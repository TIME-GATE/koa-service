'use strict';

var domain = require('domain');
var debug = require('debug')('server:ctl');
var Filter = require('./filter');

/**
 * Controller base class
 *
 * @constructor
 */
var Controller = module.exports = function Controller() {
  this.__proto__.actions = {};
  this.__proto__._errorHandler = undefined;
  this.__proto__.beforeFilters = [];
  this.__proto__.afterFilters = [];
  this.__proto__._routes = {};
};

/**
 * Defines before filter
 *
 * @param {String} name Name of before filter
 * @param {Object} [options]
 * @param {Array|String} [options.only] Action name to apply skip
 * @param {Array|String} [options.except] Action name to apply skip
 */
Controller.prototype.beforeFilter = function (name, filterFn, options) {
  return this._addFilter('beforeFilters', name, filterFn, options);
};

// Rails style alias
Controller.prototype.beforeAction = Controller.prototype.beforeFitler;

/**
 * Defines after filter
 *
 * @param {String} name Name of before filter
 * @param {Object} [options]
 * @param {Array|String} [options.only] Action name to apply skip
 * @param {Array|String} [options.except] Action name to apply skip
 */
Controller.prototype.afterFilter = function (name, filterFn, options) {
  return this._addFilter('afterFilters', name, filterFn, options);
};

// Rails style alias
Controller.prototype.afterAction = Controller.prototype.afterFilter;

/**
 * Adds a new Filter to an Array of filters.
 *
 * @param {String} filtersVarName the name of an instance variable
 *   which is an Array of Filters
 * @param {String} name Name of before filter
 * @param {Function} filterFn the filter Function
 * @param {Object} [options]
 * @param {Array|String} [options.only] Action name to apply skip
 * @param {Array|String} [options.except] Action name to apply skip
 * @private
 * @api private
 */
Controller.prototype._addFilter = function (filtersVarName, name, filterFn, options) {
  var filter = new Filter(name, filterFn, options);
  var filters = this[filtersVarName];

  // replace filter if already exists
  var exists = filters.some(function (f, i) {
    if (f.name === filter.name) {
      // replace it
      filters.splice(i, 1, filter);
      return true;
    }
    return false;
  });

  if (!exists) filters.push(filter);
};

/**
 * skips before filter
 *
 * @param {String} name Name of filter
 * @param {Object} [options]
 * @param {Array|String} [options.only] Action name to apply skip
 * @param {Array|String} [options.except] Action name to apply skip
 */
Controller.prototype.skipBeforeFilter = function (name, options) {
  return this._skipFilter('beforeFilters', name, options);
};

/**
 * skips after filter
 *
 * @param {String} name Name of filter
 * @param {Object} [options]
 * @param {Array|String} [options.only] Action name to apply skip
 * @param {Array|String} [options.except] Action name to apply skip
 */
Controller.prototype.skipAfterFilter = function (name, options) {
  return this._skipFilter('afterFilters', name, options);
};

/**
 * skips filter
 *
 * @param {String} filtersVarName the name of an instance variable
 *   which is an Array of Filters
 * @param {String} name Name of filter
 * @param {Object} [options]
 * @param {Array|String} [options.only] Action name to apply skip
 * @param {Array|String} [options.except] Action name to apply skip
 * @private
 * @api private
 */
Controller.prototype._skipFilter = function (filtersVarName, name, options) {
  this[filtersVarName] = this[filtersVarName].filter(function (f) {
    if (f.name === name) {
      if (options && options.only) {
        f.exclude(options.only);
      } else if (options && options.except) {
        f.include(options.except);
      } else {
        // remove filters
        return false;
      }
    }
    return true;
  });
};

/**
 * Defines action or get action handler.
 * When this function called with only name, it returns action handler.
 * Otherwise this function defines action.
 *
 * @param {String} name Action name
 * @param {Function} [handler] action handler
 * @param {Function} [route] action handler
 * @return {Function} Returns action handler when called with only name.
 * @api public
 */
Controller.prototype.action = function (name /*, [handler, [route]]*/) {
  if (typeof name !== 'string')
    throw new Error('action name should be a string');

  if (arguments.length === 1) {
    return this.handlerWrapper(name);
  }

  this.defineAction.apply(this, arguments);

  return this;
};

/**
 * Defines action
 *
 * @private
 * @api private
 */
Controller.prototype.defineAction = function (name, handler, route) {
  this.actions[name] = handler;
  handler._name = name;

  if (typeof route === 'string') {
    var verb, path, splitted;
    splitted = route.split(' ');
    verb = splitted[0].toUpperCase();
    path = splitted[1];
    if (!this._routes[verb]) this._routes[verb] = {};
    this._routes[verb][path] = name;
  }
};

/**
 * Get handler wrapper function
 *
 * @private
 * @api private
 */
Controller.prototype.handlerWrapper = function (action) {
  var self = this;

  if (!this.actions[action]) {
    return undefined;
  }

  var handlers = this.handlersFor(action);

  // avoid using bind and async.js for better performance
  return function handlerWrapper(req, res, next) {
    var i = 0;
    debug('handlerWrapper', 'action', action);

    if (req) {
      req._actionName = action;
    }

    var handlerDomain = domain.create();

    function onError(err) {
      debug('handlerWrapper', 'onError', err);
      if (self._errorHandler) {
        self._errorHandler(err, req, res, next);
      } else {
        next(err);
      }
    }

    handlerDomain.on('error', onError);

    var nextHandler = handlerDomain.intercept(function () {
      var handler = handlers[i++];
      if (handler) {
        debug('handlerWrapper', 'handler', handler._name);
        handler.call(self, req, res, nextHandler);
      } else {
        next();
      }
    });

    // COMPAT node v0.8 doesn't catch synchronous error when there is a
    // 'uncaughtException' event listener
    try {
      handlerDomain.run(nextHandler);
    } catch (e) {
      e.controllerThrown = true;
      onError(e);
    }
  };
};

/**
 * called by handlerWrapper when there has some error.
 *
 * @private
 * @api private
 */
Controller.prototype.onError = function (handler) {
  this._errorHandler = handler;
};

/**
 * Handler array for action
 *
 * @private
 * @api private
 */
Controller.prototype.handlersFor = function (action) {
  var chain = [].concat(
    this.beforeFiltersFor(action),
    this.actions[action],
    this.afterFiltersFor(action)
  );

  return chain;
};

/**
 * Before filter handlers for action
 *
 * @param {String} action Action name
 * @returns {Array} Filter handlers
 * @private
 * @api private
 */
Controller.prototype.beforeFiltersFor = function (action) {
  return this._filtersFor('beforeFilters', action);
};

/**
 * After filter handlers for action
 *
 * @param {String} action Action name
 * @returns {Array} Filter handlers
 * @private
 * @api private
 */
Controller.prototype.afterFiltersFor = function (action) {
  return this._filtersFor('afterFilters', action);
};

/**
 * Filter handlers for action
 *
 * @param {String} filtersVarName the name of an instance variable
 *   which is an Array of Filters
 * @param {String} action Action name
 * @returns {Array} Filter handlers
 * @private
 * @api private
 */
Controller.prototype._filtersFor = function (filtersVarName, action) {
  return this[filtersVarName].filter(function (f) {
    return f.applicableTo(action);
  }).map(function (f) {
    return f.handler;
  });
};

/**
 * The routing table to export.
 *
 * If in-line routing was not used, this won't be useful.
 *
 * @returns {Object} Routing table for export.
 * @api public
 */
Controller.prototype.routes = function () {
  for (var verb in this._routes)
    for (var path in this._routes[verb])
      if (typeof this._routes[verb][path] === 'string')
        this._routes[verb][path] = this.action(this._routes[verb][path]);
  return this._routes;
};