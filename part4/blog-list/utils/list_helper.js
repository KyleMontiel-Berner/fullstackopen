const Blog = require("../domain-model/blog");

const blogsToJSON = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const dummy = (blogs) => {
  return 1;
};

module.exports = {
  blogsToJSON,
  dummy,
};
