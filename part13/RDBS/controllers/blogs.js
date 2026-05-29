const blogRouter = require("express").Router();

const { Blog } = require("../models/index.js");

const noteFinder = async (req, res, next) => {
  req.note = await Blog.findByPk(req.params.id);
  if (!req.note) {
    res.status(404).end();
  }
  next();
};

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body });
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", noteFinder, async (req, res) => {
  try {
    req.note.likes = req.body.likes;
    req.note.save();
    res.json(req.note);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", noteFinder, async (req, res) => {
  if (req.note) {
    await req.note.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

blogRouter.get("/:id", noteFinder, async (req, res) => {
  res.json(req.note);
});

module.exports = blogRouter;
