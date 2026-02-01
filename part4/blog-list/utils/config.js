require("dotenv").config();

let PORT = process.env.PORT;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_URI
    : process.env.MONGODB_URI;

module.exports = { PORT, MONGODB_URI };
