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
  // Custom.
  if (fs.existsSync(`${process.cwd()}/.dashingreporter.json`)) {
    debug('Using custom config.');
    AWS.config.loadFromPath('.dashingreporter.json');
  }
  // Default.
  else {
    debug('Using default config.');
    AWS.config.loadFromPath(`${__dirname}/../.dashingreporter.default.json`);
  }
  // Set endpoint for localhost.
  if (AWS.config.region === 'localhost') {
    AWS.config.update({
      endpoint: 'http://localhost:8000',
    });
  }
};
