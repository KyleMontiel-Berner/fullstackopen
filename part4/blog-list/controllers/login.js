const loginRouter = require("express").Router();
const User = require("../domain-model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const checkPassword =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && checkPassword)) {
    return response.status(401).send({ error: "invalid username or password" });
  }

  const payload = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
