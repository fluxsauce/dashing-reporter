const debug = require('debug')('createTable');

module.exports = (nconf, AWS) => new Promise((resolve, reject) => {
  // Connect to DynamoDB.
  const dynamodb = new AWS.DynamoDB();

  const params = {
    TableName: nconf.get('tableName'),
    KeySchema: [
      // Partition Key.
      { AttributeName: 'repoSlug', KeyType: 'HASH' },
      // Sort Key.
      { AttributeName: 'timestamp', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'repoSlug', AttributeType: 'S' },
      { AttributeName: 'timestamp', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  debug('Creating table...');
  dynamodb.createTable(params, (error, data) => {
    if (error) {
      reject(error);
    }
    resolve(data);
  });
});
