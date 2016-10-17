const _ = require('lodash');
const fs = require('fs');

module.exports = (path, validationFailures) => {
  let jsonRaw;
  let json;
  try {
    jsonRaw = fs.readFileSync(path);
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      validationFailures.push(`Cannot find "${path}"`);
    }
    else {
      throw err;
    }
  }

  if (!_.isUndefined(jsonRaw)) {
    try {
      json = JSON.parse(jsonRaw);
    }
    catch (err) {
      validationFailures.push(`Cannot read "${path}" as JSON: ${err}`);
    }
  }

  return json;
};
