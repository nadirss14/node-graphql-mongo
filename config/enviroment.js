require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  PORT: process.env.PORT || 3008,
  API_VERSION: "v1",
  API_BASE: "api",
  URL: process.env.NODE_ENV
    ? "https://pacific-badlands-72860.herokuapp.com/"
    : "http://localhost:3001/",
  DB_HOST_MONGO: process.env.DB_HOST_MONGO,
  DB_USER_MONGO: process.env.DB_USER_MONGO,
  DB_PASSWORD_MONGO: process.env.DB_PASSWORD_MONGO,
  DB_NAME_MONGO: process.env.DB_NAME_MONGO
};

module.exports = { config };
