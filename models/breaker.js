const Sequelize = require("sequelize");

class Breaker extends Sequelize.Model {
  static initiate(sequelize) {
    Breaker.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        Exit: {
          type: Sequelize.BOOLEAN,
        },
        Situation: {
          type: Sequelize.BOOLEAN,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Breaker",
        tableName: "Breaker",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
}

module.exports = Breaker;
