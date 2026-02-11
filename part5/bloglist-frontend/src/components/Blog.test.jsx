import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders blog title and blog author", () => {
  const blog = {
    title: "Here is a Blog Title",
    author: "Myself",
    url: "https://www.espn.com",
    likes: 5,
    user: {
      username: "berner_kyle",
      name: "Kyle Berner",
    },
  };

  render(<Blog blog={blog} />);

  const blogPost = screen.getAllByText("Here is a Blog Title by Myself");
  expect(blogPost[0]).toBeVisible(); // hideDetails div
  expect(blogPost[1]).not.toBeVisible(); // showDetails div

  const urlElement = screen.getByText("https://www.espn.com");
  expect(urlElement).not.toBeVisible();

  const likeCount = screen.getByText(/likes 5/);
  expect(likeCount).not.toBeVisible();
});

test("renders url and likes", async () => {
  const blog = {
    title: "Here is a Blog Title",
    author: "Myself",
    url: "https://www.espn.com",
    likes: 5,
    user: {
      username: "berner_kyle",
      name: "Kyle Berner",
    },
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const urlElement = screen.getByText("https://www.espn.com");
  expect(urlElement).toBeVisible();

  const likeCount = screen.getByText(/likes 5/);
  expect(likeCount).toBeVisible();
});

test("like count increases by two with two clicks", async () => {
  const mockUpdateFunction = vi.fn();

  const blog = {
    title: "Here is a Blog Title",
    author: "Myself",
    url: "https://www.espn.com",
    likes: 5,
    user: {
      username: "berner_kyle",
      name: "Kyle Berner",
    },
  };

  render(<Blog blog={blog} updateBlog={mockUpdateFunction} />);

  const user = userEvent.setup();

  const view = screen.getByText("view");
  await user.click(view);

  const likeCounter = screen.getByText("like");
  await user.click(likeCounter);
  await user.click(likeCounter);

  expect(mockUpdateFunction).toHaveBeenCalledTimes(2);
});
