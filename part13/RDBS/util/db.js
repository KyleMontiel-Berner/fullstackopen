const { DATABASE_URL } = require("./config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection is live");
  } catch (error) {
    console.log("Unable to connect to database");
    process.exit(1);
  }
  return null;
};

module.exports = { sequelize, testDatabaseConnection };
