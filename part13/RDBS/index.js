const express = require("express");
const app = express();
const { testDatabaseConnection } = require("./util/db");
const { PORT } = require("./util/config");
const errorHandler = require("./util/middleware");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorRouter = require("./controllers/authors");
const readingListRouter = require("./controllers/reading_lists");

app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorRouter);
app.use("/api/readinglists", readingListRouter);
app.use(errorHandler);

const start = async () => {
  await testDatabaseConnection();
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

start();
