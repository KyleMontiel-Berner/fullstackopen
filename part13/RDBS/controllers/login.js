const router = require("express").Router();
const { SECRET } = require("../util/config");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });

  const password = req.body.password === "secret";

  if (user && password) {
    const payload = {
      username: user.username,
      name: user.name,
      id: user.id,
    };
    const token = jwt.sign(payload, SECRET);
    res.status(200).send({ token, username: user.username, name: user.name });
  } else {
    res.status(401).json({ error: "invalid username or password" });
  }
});

module.exports = router;
