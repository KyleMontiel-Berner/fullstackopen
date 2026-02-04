const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("../utils/list_helper");
const Blog = require("../domain-model/blog");
const User = require("../domain-model/user");
const bcrypt = require("bcrypt");

const api = supertest(app);

const initialList = [
  {
    title: "first option here",
    author: "kyle berner",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 8,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
  },
  {
    title: "third option here",
    author: "kyle montiel",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 4,
  },
];

/*
beforeEach(() => {
  return Note.deletMany({})
    .then(() => {
      let blogPost = new Blog(helper.initialNotes[0]);
      return blogPost.save();
    })
    .then(() => {
      blogPost = new Blog(helper.initalNotes[1]);
      return blogPost.save();
    })
    .catch((error) => next(error));
});
*/

// adding token to global scope so tests can access new value

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("testpwd", 10);

  const user = new User({
    username: "usernameTest",
    name: "name Test",
    passwordHash,
  });

  const savedUser = await user.save();

  const loggingIn = await api.post("/api/login").send({
    username: "usernameTest",
    password: "testpwd",
  });

  token = loggingIn.body.token;

  const blogs = initialList.map(
    (blog) =>
      new Blog({
        ...blog,
        user: savedUser._id,
      }),
  );

  await Blog.insertMany(blogs);
});

test("all blog posts are returned", async () => {
  const response = await api.get("/api/blogs/");

  assert.strictEqual(response.body.length, 3);
});

test("unique identifier is id", async () => {
  const blogTransformed = await helper.blogsToJSON();
  const blogIdentified = blogTransformed[1];

  const blogResult = await api
    .get(`/api/blogs/${blogIdentified.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.deepStrictEqual(blogResult.body, blogIdentified);
});

test("post one blog to the list", async () => {
  const testBlog = {
    title: "Testing Post and hopefully this is green",
    author: "Berner's Blogs",
    url: "https://google.com",
    likes: 7,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(testBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const newBlogList = await helper.blogsToJSON();

  assert.strictEqual(newBlogList.length, initialList.length + 1);

  const content = newBlogList.find(
    (blog) => blog.title === "Testing Post and hopefully this is green",
  );

  assert(content);
});

test("post defaults to 0 likes", async () => {
  const testBlog = {
    title: "Testing Post with 0 likes",
    author: "Berner's Blogs",
    url: "https://www.google.com",
  };

  const result = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(testBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(result.body.likes, 0);
});

test("doesnt post without valid token", async () => {
  const testBlog = {
    title: "Testing Post with 0 likes",
    author: "Berner's Blogs",
    url: "https://www.google.com",
  };

  const result = await api.post("/api/blogs").send(testBlog).expect(401);

  const finalBlogList = await helper.blogsToJSON();
  assert.strictEqual(finalBlogList.length, initialList.length);
});

test("doesnt post without title property", async () => {
  const testBlog = {
    author: "Berner's Blogs",
    url: "https://www.google.com",
  };

  const result = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(testBlog);

  assert.strictEqual(result.status, 400);

  const blogList = await helper.blogsToJSON();
  assert.strictEqual(blogList.length, initialList.length);
});

test("delete a single blog", async () => {
  const initialBlogList = await helper.blogsToJSON();
  const deletedBlog = initialBlogList[0];

  await api
    .delete(`/api/blogs/${deletedBlog.id}`)
    .set(`Authorization`, `Bearer ${token}`)
    .expect(204);

  const finalBlogList = await helper.blogsToJSON();
  const ids = finalBlogList.map((blog) => blog.id);
  assert(!ids.includes(deletedBlog.id));

  assert.strictEqual(finalBlogList.length, initialBlogList.length - 1);
});

test("update a single blog", async () => {
  const initialBlogList = await helper.blogsToJSON();
  const blogToUpdate = initialBlogList[0];

  const newBlog = {
    title: "changes here",
    author: "author change here",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 8,
  };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const finalBlogList = await helper.blogsToJSON();

  assert.strictEqual(finalBlogList.length, initialBlogList.length);
  const titleCheck = finalBlogList.map((blog) => blog.title);
  assert(titleCheck.includes("changes here"));
});

after(async () => {
  await mongoose.connection.close();
});
