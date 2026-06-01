const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config.js");
const { Blog, User } = require("../models/index.js");
const { Op } = require("sequelize");
const { sequelize } = require("../util/db.js");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (!(authorization && authorization.toLowerCase().startsWith("bearer "))) {
    return res.status(401).end();
  } else {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    next();
  }
};

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(404).end();
  }
  next();
};

blogRouter.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${req.query.search}%` } },
      { author: { [Op.iLike]: `%${req.query.search}%` } },
    ];
  }

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: ["username", "name"],
    },
    where,
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
  res.status(200).end();
});

blogRouter.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", tokenExtractor, async (req, res) => {
  req.blog = await Blog.findByPk(req.params.id);
  const user = await User.findByPk(req.decodedToken.id);
  if (req.blog && req.blog.userId === user.id) {
    await req.blog.destroy();
    res.status(204).end();
  } else {
    res.status(401).end();
  }
});

blogRouter.get("/:id", blogFinder, async (req, res) => {
  res.json(req.blog);
});

module.exports = blogRouter;
