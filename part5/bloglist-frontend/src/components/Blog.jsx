import { useState } from "react";

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [viewDetails, setViewDetails] = useState(false);

  const increaseLikeCount = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    updateBlog(blog.id, updatedBlog);
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      deleteBlog(blog.id);
  };

  const hideDetails = { display: viewDetails ? "none" : "" };
  const showDetails = { display: viewDetails ? "" : "none" };

  const toggleDetails = () => {
    setViewDetails(!viewDetails);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div style={hideDetails}>
        {blog.title} by {blog.author}
        <button onClick={toggleDetails}>view</button>
      </div>
      <div style={showDetails}>
        <div>
          {blog.title} by {blog.author}
          <button onClick={toggleDetails}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={increaseLikeCount}>like</button>
        </div>
        <div>user: {blog.user ? blog.user.name : "user unknown"}</div>
        {user && user.username === blog.user.username && (
          <button onClick={removeBlog}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
