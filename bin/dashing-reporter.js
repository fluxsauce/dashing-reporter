#!/usr/bin/env node

if (process.version.split('.')[0].replace('v', '') < 6) {
  console.log('dashing-reporter requires node.js 6 or higher.');
  // Graceful exit to make CI logic easier.
  process.exit(0);
}

const _ = require('lodash');
const AWS = require('aws-sdk');
const awsConfig = require('../lib/awsConfig');
const colors = require('colors/safe');
const commandLineArgs = require('command-line-args');
const createTable = require('../lib/createTable');
const debug = require('debug')('index');
const help = require('../lib/help');
const loadJson = require('../lib/loadJson');
const nconf = require('nconf');
const optionDefinitions = require('../lib/optionDefinitions');
const optionValidationFailures = require('../lib/optionValidationFailures');
const optionValidationNumeric = require('../lib/optionValidationNumeric');

// Configuration.
nconf.file(`${process.cwd()}/.dashingreporter.json`);
nconf.defaults({
  accessKeyId: 'myKeyId',
  secretAccessKey: 'secretKey',
  region: 'localhost',
  tableName: 'dashing-reporter-builds',
});
awsConfig(AWS);

// Parse command-line arguments.
const options = commandLineArgs(optionDefinitions);
debug(options);

// Show help.
if (options._all.help) {
  help(optionDefinitions);
  process.exit(0);
}
// Create table in DynamoDB.
else if (options._all.createTable) {
  return createTable(nconf, AWS)
    .then((data) => {
      console.log(`${colors.green('OK!')} Created table in DynamoDB.`);
      debug(JSON.stringify(data, null, 2));
      process.exit(0);
    })
    .catch((error) => {
      console.log(`${colors.red('ERROR!')} ${JSON.stringify(error, null, 2)}`);
      process.exit(1);
    });
}

// Create item.
const item = {};

// Validation.
const validationFailures = [].concat(optionValidationFailures(options, optionDefinitions), optionValidationNumeric(options, optionDefinitions));

// ESLint JSON parsing.
if (options._all.eslintJson) {
  const eslintJson = loadJson(options._all.eslintJson, validationFailures);

  if (!_.isUndefined(eslintJson)) {
    item.eslintWarningCount = 0;
    item.eslintErrorCount = 0;
    eslintJson.forEach((file) => {
      item.eslintWarningCount += file.warningCount;
      item.eslintErrorCount += file.errorCount;
    });
  }
}

// Istanbul JSON parsing.
if (options._all.istanbulSummaryJson) {
  const istanbulSummaryJson = loadJson(options._all.istanbulSummaryJson, validationFailures);

  if (!_.isUndefined(istanbulSummaryJson)) {
    item.coverageLinesPercentage = istanbulSummaryJson.total.lines.pct;
    item.coverageStatementsPercentage = istanbulSummaryJson.total.statements.pct;
    item.coverageFunctionsPercentage = istanbulSummaryJson.total.functions.pct;
    item.coverageBranchesPercentage = istanbulSummaryJson.total.branches.pct;
  }
}

// Test result must be 0 or 1.
if (!_.isUndefined(options._all.testResult)) {
  if (options._all.testResult !== 0 && options._all.testResult !== 1) {
    validationFailures.push('--testResult must be 0 (success) or 1 (failure)');
  }
}

// Report validation errors, if any.
if (validationFailures.length > 0) {
  validationFailures.forEach((error) => {
    console.log(`${colors.red('ERROR!')} ${error}`);
  });
  console.log('\nUse --help for documentation.');
  process.exit(1);
}

// Populate item with all validated options, except the parsed ones.
_.assign(item, _.omit(options._all, _.map(_.filter(optionDefinitions, {
  group: 'parsed',
}), 'name')));

// Add Timestamp.
const date = new Date();
item.timestamp = date.toISOString();

debug(item);

// Save.
debug('Saving validated record...');
const docClient = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: nconf.get('tableName'),
  Item: item,
};

docClient.put(params, (err) => {
  if (err) {
    console.error(`${colors.red('ERROR!')} Unable to log build: ${JSON.stringify(err, null, 2)}`);
  }
  else {
    console.log(`${colors.green('OK!')} Logged Build.`);
  }
});

return 'yay';
