//const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "post",
    {
      content: { type: DataTypes.STRING(140), allowNull: false },
      title: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
