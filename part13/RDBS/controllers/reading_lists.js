const router = require("express").Router();
const { User, Blog, ReadingList } = require("../models/index");
const { tokenExtractor } = require("../util/middleware");

router.post("/", async (req, res) => {
  try {
    const { userId, blogId } = req.body;

    if (!userId || !blogId) {
      return res.status(400).json({ error: "userId and blogId are required" });
    }

    const user = await User.findByPk(userId);
    const blog = await Blog.findByPk(blogId);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    const existing = await ReadingList.findOne({ where: { userId, blogId } });
    if (existing) {
      return res.status(400).json({ error: "already in reading list" });
    }

    const readList = await ReadingList.create({ userId, blogId });
    res.json({
      id: readList.id,
      user_id: readList.userId,
      blog_id: readList.blogId,
      read: readList.read,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
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

    if (!readList) {
      return res.status(404).json({ error: "reading list entry not found" });
    }

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
