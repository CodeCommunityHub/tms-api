import "dotenv/config";

export const appEnv = {
  general: {
    APP_NAME: process.env.APP_NAME,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
  },
  database: {
    DB_HOST: process.env.DB_HOST ?? "localhost",
    DB_PORT: process.env.DB_PORT ?? "3306",
    DB_USER: process.env.DB_USER ?? "root",
    DB_PASSWORD: process.env.DB_PASSWORD ?? "password",
    DB_NAME: process.env.DB_NAME ?? "crud_node_api_ts",
    DB_DIALECT: process.env.DB_DIALECT ?? "mysql",
  },
};
