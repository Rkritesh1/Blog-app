import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/blogs")
      .then((response) => setBlogs(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>All Blogs</h2>
      {blogs.map((blog) => (
        <div className="card my-3" key={blog._id}>
          <div className="card-body">
            <h5 className="card-title">{blog.title}</h5>
            <p className="card-text">{blog.content.substring(0, 100)}...</p>
            <Link to={`/blogs/${blog._id}`} className="btn btn-primary">
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
