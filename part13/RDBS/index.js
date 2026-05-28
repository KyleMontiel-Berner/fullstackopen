require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const main = async () => {
  try {
    await sequelize.authenticate();
    const notes = await sequelize.query("SELECT * from notes", {
      type: QueryTypes.SELECT,
    });
    console.log(notes);
    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
};

main();
