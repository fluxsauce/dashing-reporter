const fs = require('fs');
const debug = require('debug')('awsConfig');

/**
 * Configure Amazon Web Services.
 *
 * @param {Object} AWS
 *   AWS SDK.
 * @returns {void}
 */
module.exports = (AWS) => {
  let config;
  // Custom.
  if (fs.existsSync(`${process.cwd()}/.dashingreporter.json`)) {
    debug('Using custom config.');
    config = JSON.parse(fs.readFileSync(`${process.cwd()}/.dashingreporter.json`, 'utf8'));
  }
  // Default.
  else {
    debug('Using default config.');
    config = JSON.parse(fs.readFileSync(`${__dirname}/../.dashingreporter.default.json`, 'utf8'));
  }
  AWS.config.update(config);

  // Set endpoint for localhost.
  if (AWS.config.region === 'localhost') {
    debug('Setting localhost endpoint.');
    AWS.config.update({
      endpoint: 'http://localhost:8000',
    });
  }
};
