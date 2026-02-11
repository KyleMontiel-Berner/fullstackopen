import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("blog calls addBlog event handler with right details", async () => {
  const mockFunction = vi.fn();

  render(<BlogForm createBlog={mockFunction} />);

  const user = userEvent.setup();

  const titleInput = screen.getByLabelText(/title:/);
  const authorInput = screen.getByLabelText(/author:/);
  const urlInput = screen.getByLabelText(/url:/);

  await user.type(titleInput, "React Testing");
  await user.type(authorInput, "Kyle Berner");
  await user.type(urlInput, "https://www.react.com");

  const submitBtn = screen.getByText("create");
  await user.click(submitBtn);

  expect(mockFunction).toHaveBeenCalledTimes(1);
  expect(mockFunction).toHaveBeenCalledWith({
    title: "React Testing",
    author: "Kyle Berner",
    url: "https://www.react.com",
  });
});
