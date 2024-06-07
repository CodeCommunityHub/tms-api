import { Sequelize } from "sequelize-typescript";
import { appEnv } from "../config/env";
import { User } from "../models/User";
import { Dialect } from "sequelize";

const sequelize = new Sequelize({
  database: appEnv.database.DB_NAME,
  host: appEnv.database.DB_HOST,
  username: appEnv.database.DB_USER,
  password: appEnv.database.DB_PASSWORD,
  dialect: appEnv.database.DB_DIALECT as Dialect,
  storage: "./tms.db",

  models: [User],
});

export default sequelize;
