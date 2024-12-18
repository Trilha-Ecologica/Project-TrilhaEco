import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Species",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomecientifico: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nomepopular: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      caracteristicas: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imgURL: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Species",
      timestamps: true,
    }
  );
};
