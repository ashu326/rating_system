/* eslint-disable no-undef */
module.exports = {
  serverConfig: {
    PORT: process.env.SERVER_PORT,
  },
  dbConfig: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
};
