const { test, describe } = require("node:test");
const assert = require("node:assert");

const favBlogHelper = require("../utils/favorite_helper");

describe("favorite blog", () => {
  test("with multiple blogs", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "second option here",
        author: "kyle berner",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 8,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "third option here",
        author: "kyle montiel",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 4,
        __v: 0,
      },
    ];

    const result = favBlogHelper.favoriteBlog(blogs);

    assert.deepStrictEqual(result, {
      _id: "5a422aa71b54a676234d17f8",
      title: "second option here",
      author: "kyle berner",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 8,
      __v: 0,
    });
  });
});
