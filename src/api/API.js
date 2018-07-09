import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import schema from './schema';

const logger = console;


export default class API {
  constructor(hostname, port, db) {
    this.hostname = hostname;
    this.port = port;
    this.db = db;

    this.schema = schema(db);

    // Intialize webserver
    this.app = express();
    // TODO: CORS

    // Register api route
    this.app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: this.schema }));
    this.app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  }

  listen() {
    return new Promise((resolve) => {
      this.app.listen(this.port, this.hostname, () => resolve);
    });
  }
}
