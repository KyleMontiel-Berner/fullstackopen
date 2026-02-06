import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [opsMessage, setOpsMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

  const createBlog = async (event) => {
    event.preventDefault();
    console.log("attempting blog creation", { title, author, url });
    try {
      const newBlog = {
        title,
        author,
        url,
      };

      const response = await blogService.create(newBlog);
      console.log("successful blog creation", response);
      setBlogs(blogs.concat(response));
      setOpsMessage(`a new blog ${title} by ${author} was added`);
      setTimeout(() => {
        setOpsMessage(null);
      }, 5000);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      console.log("Blog create error:", error);
      setErrorMsg("invalid blog input");
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
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

  const loggedInBlogs = () => (
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
      <h2>create new blog</h2>
      <h2>{opsMessage}</h2>
      <form onSubmit={createBlog}>
        <label>
          title
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <label>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <label>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        <button type="submit">create</button>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && loggedInBlogs()}
    </div>
  );
};
export default App;
