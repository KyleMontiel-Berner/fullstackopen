const express = require("express");
const app = express();
const { testDatabaseConnection } = require("./util/db");
const { PORT } = require("./util/config");
const { errorHandler } = require("./util/middleware");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorRouter = require("./controllers/authors");
const readingListRouter = require("./controllers/reading_lists");
const logoutRouter = require("./controllers/logout");
const { Blog, User, ReadingList, Session } = require("./models");

app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorRouter);
app.use("/api/readinglists", readingListRouter);
app.use("/api/logout", logoutRouter);

app.get("/", (req, res) => {
  res.status(200).end();
});

app.post("/api/reset", async (req, res) => {
  await Session.destroy({ where: {} });
  await ReadingList.destroy({ where: {} });
  await Blog.destroy({ where: {} });
  await User.destroy({ where: {} });
  res.status(204).end();
});

app.use(errorHandler);

const start = async () => {
  await testDatabaseConnection();
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

start();
