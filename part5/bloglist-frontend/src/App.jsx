import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [opsMessage, setOpsMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      console.log("Blogs received in frontend:", blogs);
      console.log("First blog user:", blogs[0]?.user);
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedBlogUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedBlogUserJSON) {
      const user = JSON.parse(loggedBlogUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("attempted login", { username, password });
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      console.log("login successful:", user);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("login error:", error);
      setErrorMsg("wrong credentials");
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  };

  const createBlog = async (blog) => {
    blogFormRef.current.toggleVisibility();
    try {
      const response = await blogService.create(blog);
      console.log("successful blog creation", response);
      setBlogs(blogs.concat(response));
      setOpsMessage(`a new blog ${blog.title} by ${blog.author} was added`);
      setTimeout(() => {
        setOpsMessage(null);
      }, 5000);
    } catch (error) {
      console.log("Blog create error:", error);
      setErrorMsg("invalid blog input");
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  };

  const updateBlog = async (id, updatedBlog) => {
    const returnedBlog = await blogService.update(id, updatedBlog);
    setBlogs(
      blogs.map((blog) => {
        return blog.id !== id ? blog : returnedBlog;
      }),
    );
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label>
          password
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button type="submit">login</button>
      </form>
    </div>
  );

  return (
    <div>
      <h2>blogs</h2>
      <h2>{opsMessage}</h2>
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button
            type="submit"
            onClick={() => {
              setUser(null);
              window.localStorage.removeItem("loggedBlogUser");
            }}
          >
            logout
          </button>

          <Togglable buttonLabel="create" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      ))}
    </div>
  );
};
export default App;
