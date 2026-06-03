const router = require("express").Router();
const { User, Blog, ReadingList } = require("../models/index");
const { tokenExtractor } = require("../util/middleware");

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

router.get("/", async (req, res) => {
  const readList = await ReadingList.findAll();
  res.json(readList);
});

router.put("/:id", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const readList = await ReadingList.findByPk(req.params.id);

    if (readList.userId !== user.id) {
      return res.status(401).json({ error: "not authorized" });
    }

    readList.read = req.body.read;
    await readList.save();
    res.json(readList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
