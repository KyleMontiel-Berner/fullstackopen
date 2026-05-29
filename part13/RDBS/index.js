const express = require("express");
const app = express();
const { testDatabaseConnection } = require("./util/db");
const { PORT } = require("./util/config");
const blogRouter = require("./controllers/blogs");

app.use(express.json());
app.use("/api/blogs", blogRouter);

const start = async () => {
  await testDatabaseConnection();
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

start();
