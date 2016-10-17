const _ = require('lodash');

/**
 * Validate numeric options.
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
    type: Number,
  }), 'name').forEach((name) => {
    // Only validate set values.
    if (!_.isUndefined(options._all[name])) {
      if (isNaN(options._all[name])) {
        validationFailures.push(`Non-numeric value for --${name}`);
      }
    }
  });

  return validationFailures;
};

