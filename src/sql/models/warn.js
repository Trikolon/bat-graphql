export default (sequelize, DataTypes) => {
  const tableOptions = {
    tableName: 'bat_comments',
    // TODO: change this back to BAT_comments once issue with BAT is fixed
    timestamps: false,
  };

  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id',
    },
    uuid: {
      type: DataTypes.STRING,
      field: 'entity',
    },
    warnStaff: {
      type: DataTypes.STRING,
      field: 'staff',
    },
    warnReason: {
      type: DataTypes.STRING,
      field: 'note',
    },
    warnDate: {
      type: DataTypes.DATE,
      field: 'date',
      validate: {
        isDate: true,
      },
    },
  };

  const warn = sequelize.define('warn', attributes, tableOptions);

  warn.associate = (models) => {
    models.warn.belongsTo(models.player, { foreignKey: 'entity', sourceKey: 'UUID' });
  };

  return warn;
};
