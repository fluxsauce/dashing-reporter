const _ = require('lodash');

/**
 * Validate required options.
 *
 * @param {Object} options
 *   User input.
 * @param {Object} optionDefinitions
 *   Configuration for command-line-args and command-line-usage.
 *
 * @returns {Array}
 *   Validation failures, if any.
 */
module.exports = (options, optionDefinitions) => {
  const validationFailures = [];
  _.map(_.filter(optionDefinitions, {
    group: 'required',
  }), 'name').forEach((name) => {
    // Ensure the option is set.
    if (_.isUndefined(options.required[name])) {
      validationFailures.push(`Missing required option --${name}`);
    }
    // Ensure the option has a value.
    else if (_.isNull(options.required[name]) || options.required[name] === '') {
      validationFailures.push(`Missing required value for --${name}`);
    }
  });

  return validationFailures;
};

