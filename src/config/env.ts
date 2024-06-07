import "dotenv/config";

export const appEnv = {
  general: {
    APP_NAME: process.env.APP_NAME,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
  },
  database: {
    DB_HOST: process.env.DB_HOST ?? "",
    DB_PORT: process.env.DB_PORT ?? "",
    DB_USER: process.env.DB_USER ?? "",
    DB_PASSWORD: process.env.DB_PASSWORD ?? "",
    DB_NAME: process.env.DB_NAME ?? "",
    DB_DIALECT: process.env.DB_DIALECT ?? "sqlite",
  },
};
