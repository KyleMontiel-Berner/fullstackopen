const router = require("express").Router();
const { SECRET } = require("../util/config");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Session = require("../models/session");

router.post("/", async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });

  const password = req.body.password === "secret";

  if (!(user && password)) {
    return res.status(401).json({ error: "invalid username or password" });
  }

  if (user.disabled) {
    return res.status(401).json({ error: "user disabled" });
  }

  const payload = {
    username: user.username,
    name: user.name,
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET);

  await Session.create({ token, userId: user.id });
  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
