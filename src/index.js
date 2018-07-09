import Database from './sql/Database';
import API from './api/API';

const fs = require('fs');

const logger = console;

// Read config file. TODO: default config fallbacks
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

const db = new Database(
  config.mysql.host,
  config.mysql.database,
  config.mysql.user,
  config.mysql.password,
);
const api = new API(config.api.hostname, config.api.port, db);

// Test mysql connection
db.testConnection()
  .then(api.listen())
  .then(() => {
    logger.info(`Started GraphQL API at http://${config.api.hostname}:${config.api.port}/graphql`);
  })
  .catch((error) => {
    logger.error('Could not start server', error);
    process.exit(1);
  });


// https://medium.com/@lachlanmiller_52885/graphql-basics-and-practical-examples-with-vue-6b649b9685e0
// https://github.com/juffalow/express-graphql-sequelize-example
// https://github.com/apollographql/apollo-server
