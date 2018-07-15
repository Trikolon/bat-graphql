import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import schema from './schema';


export default class API {
  /**
   * API
   * @param {String} hostname - Address webserver should bind to
   * @param {Number} port - Port webserver should bind to
   * @param {Object} cors - CORS config object
   * @param {Database} db - Database management object
   */
  constructor(hostname = 'localhost', port = 8000, cors = { allowedOrigins: ['*'] }, db) {
    this.hostname = hostname;
    this.port = port;
    this.cors = cors;
    this.db = db;

    this.schema = schema(this.db);

    // Intialize webserver
    this.app = express();

    // CORS
    this.app.use((...args) => this.corsHandler(...args));
    // Register api route
    this.app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: this.schema }));
    this.app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  }

  listen() {
    return new Promise((resolve) => {
      this.app.listen(this.port, this.hostname, () => resolve);
    });
  }

  /**
   * Appends CORS headers to http replies
   * Allowed origins can be set in the config file
   * @param req - Client request
   * @param res - Client response object
   * @param next - Method to call next middleware /handler
   * @returns {null}
   */
  corsHandler(req, res, next) {
    const { allowedOrigins } = this.cors;
    const clientOrigin = req.get('origin');

    let originResult;
    if (allowedOrigins.indexOf('*') !== -1) { // Config has *, allow all origins
      originResult = '*';
    } else {
      const index = allowedOrigins.indexOf(clientOrigin);
      if (index === -1) {
        originResult = 'null';
      } else {
        originResult = allowedOrigins[index];
      }
    }

    res.header('Access-Control-Allow-Origin', originResult);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // If it's a pre-flight request reply to client and interrupt middleware chain
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    return next();
  }
}
