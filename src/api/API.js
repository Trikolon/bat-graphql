import { ApolloServer } from 'apollo-server';

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
    this.app = new ApolloServer({ schema: this.schema });
  }

  listen() {
    return new Promise((resolve) => {
      this.app.listen(this.port, this.hostname, () => resolve);
    });
  }
}
