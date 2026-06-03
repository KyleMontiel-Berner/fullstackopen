const router = require("express").Router();
const { User, Blog, ReadingList } = require("../models/index.js");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ["id", "title", "author", "url", "likes"],
    },
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({
      error: "username must be a valid email address",
    });
  }
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

router.get("/:id", async (req, res) => {
  const where = {};

  if (req.query.read) {
    where.read = req.query.read === "true";
  }

  const user = await User.findByPk(req.params.id, {
    attributes: ["username", "name"],
    include: [
      {
        model: Blog,
        as: "reading",
        attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
        through: {
          attributes: ["read", "id"],
          where,
        },
      },
    ],
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
