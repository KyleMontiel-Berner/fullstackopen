const blogRouter = require("express").Router();
const Blog = require("../domain-model/blog");
const User = require("../domain-model/user");
const jwt = require("jsonwebtoken");
const { tokenExtractor, userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    return response.status(400).end;
  }
});

blogRouter.post(
  "/",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const body = request.body;

    if (!body.title || !body.url) {
      return response.status(400).json({ error: "title and url required" });
    }

    if (!request.user) {
      return response.status(401).json({ error: "UserId invalid" });
    }

    const user = request.user;

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  },
);

blogRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    if (!request.user) {
      return response.status(401).json({ error: "UserId invalid" });
    }

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "blog doesnt exist" });
    }

    if (blog.user.toString() === request.user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      return response
        .status(403)
        .json({ error: "not authorized to delete blog" });
    }
  },
);

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
  });
  response.json(result);
});

module.exports = blogRouter;
