const router = require("express").Router();
const { User, Blog, ReadingList } = require("../models/index");

router.post("/", async (req, res) => {
  try {
    const user = await User.findByPk(req.body.userId);
    const blog = await Blog.findByPk(req.body.blogId);

    if (!(user && blog)) {
      res.status(400).json({ error: "user or blog not found" });
    }
    const readList = await ReadingList.create({
      userId: req.body.userId,
      blogId: req.body.blogId,
    });
    res.json(readList);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
