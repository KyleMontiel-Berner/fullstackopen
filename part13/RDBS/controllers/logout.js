const router = require("express").Router();
const Session = require("../models/session.js");
const { tokenExtractor } = require("../util/middleware.js");

router.delete("/", tokenExtractor, async (req, res) => {
  try {
    await Session.destroy({ where: { token: req.token } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: "unsuccessful logout" });
  }
});

module.exports = router;
