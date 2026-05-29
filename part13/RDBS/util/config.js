require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3001,
  DATABASE_URL: process.env.DATBASE_URL,
};
