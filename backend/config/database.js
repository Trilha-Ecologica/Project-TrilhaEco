import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import defineUserModel from "../models/user.js";
import defineSpeciesModel from "../models/species.js";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

const User = defineUserModel(sequelize);
const Species = defineSpeciesModel(sequelize);

export { sequelize, User, Species};