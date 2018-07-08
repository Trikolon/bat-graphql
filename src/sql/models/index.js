import ban from './ban';
import player from './player';

export default (sequelize, DataTypes) => {
  ban(sequelize, DataTypes);
  player(sequelize, DataTypes);
}