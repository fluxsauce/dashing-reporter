const commandLineUsage = require('command-line-usage');

/**
 * Render help.
 *
 * @param {Object} optionDefinitions
 *   Configuration for command-line-args and command-line-usage.
 *
 * @returns {void}
 */
module.exports = (optionDefinitions) => {
  const sections = [
    {
      header: 'Dashing Reporter',
      content: 'Logs Continuous Integration metrics to Amazon DynamoDB.',
    },
    {
      header: 'Required',
      optionList: optionDefinitions,
      group: ['required'],
    },
    {
      header: 'Parsed',
      optionList: optionDefinitions,
      group: ['parsed'],
    },
    {
      header: 'Optional',
      optionList: optionDefinitions,
      group: ['optional'],
    },
    {
      header: 'Miscellaneous',
      optionList: optionDefinitions,
      group: '_none',
    },
  ];
  console.log(commandLineUsage(sections));
};
