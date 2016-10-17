const optionDefinitions = require('../lib/optionDefinitions');
const optionValidationNumeric = require('../lib/optionValidationNumeric');

module.exports = {
  optionValidationFailures(test) {
    test.expect(1);
    test.deepEqual(optionValidationNumeric({
      _all: {},
    }, optionDefinitions), [], 'Empty options should trigger no numeric validation errors');
    test.done();
  },
};
