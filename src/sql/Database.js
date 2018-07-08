import Sequelize from 'sequelize';

export default class Database {
  constructor(host, database, user, password) {
    this.sequelize = new Sequelize(database, user, password, {
      host,
      dialect: 'mysql',
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
    this.models = {
      player: this.sequelize.import(`${__dirname}/models/player`),
      ban: this.sequelize.import(`${__dirname}/models/ban`),
    };

    Object.values(this.models).forEach((model) => model.associate(this.models));
  }

  testConnection() {
    return this.sequelize.authenticate();
  }
}
