const optionDefinitions = require('../lib/optionDefinitions');
const optionValidationFailures = require('../lib/optionValidationFailures');
const optionValidationNumeric = require('../lib/optionValidationNumeric');

module.exports = {
  pass: {
    optionValidationFailures(test) {
      test.expect(1);
      test.deepEqual(optionValidationNumeric({
        _all: {},
      }, optionDefinitions), [], 'Empty options should trigger no numeric validation errors');
      test.done();
    },
    optionValidationNumeric(test) {
      test.expect(1);
      test.deepEqual(optionValidationNumeric({
        _all: {
          buildNumber: '1.1',
        },
      }, optionDefinitions), [], 'Numeric values should pass numeric validation');
      test.done();
    },
  },
  fail: {
    optionValidationFailuresRequired(test) {
      test.expect(1);
      test.notDeepEqual(optionValidationFailures({
        required: {},
      }, optionDefinitions), [], 'Missing required options should not pass');
      test.done();
    },
    optionValidationFailuresRequiredNoValue(test) {
      test.expect(1);
      test.notDeepEqual(optionValidationFailures({
        required: {
          commit: '',
        },
      }, [{
        name: 'commit',
        group: 'required',
      }]), [], 'Missing required values should not pass');
      test.done();
    },
    optionValidationFailuresRequiredNullValue(test) {
      test.expect(1);
      test.notDeepEqual(optionValidationFailures({
        required: {
          commit: null,
        },
      }, [{
        name: 'commit',
        group: 'required',
      }]), [], 'Missing required values should not pass');
      test.done();
    },
    optionValidationNumeric(test) {
      test.expect(1);
      test.deepEqual(optionValidationNumeric({
        _all: {
          buildNumber: 'fail',
        },
      }, optionDefinitions), [
        'Non-numeric value for --buildNumber',
      ], 'Non-numeric values should not pass numeric validation');
      test.done();
    },
  },
};
