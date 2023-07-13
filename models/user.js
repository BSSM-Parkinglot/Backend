const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        UserName: {
          type: Sequelize.STRING(20),
          unique: true,
          allowNull: false,
        },
        Password: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        CarNum: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        Enter: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {}
}

module.exports = User;
