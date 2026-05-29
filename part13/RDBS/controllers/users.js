const router = require("express").Router();
const { User } = require("../models/index.js");

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create({ ...req.body });
  user.save();
  res.json(user);
});

router.put("/:username", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ where: { username: req.params.username } });
  user.name = req.body.name;
  if (user) {
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
