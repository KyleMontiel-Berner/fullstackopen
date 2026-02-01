const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("../utils/list_helper");
const Blog = require("../domain-model/blog");

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

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogPost = new Blog(initialList[0]);
  await blogPost.save();

  blogPost = new Blog(initialList[0]);
  await blogPost.save();
});

test("all blog posts are returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 2);
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
