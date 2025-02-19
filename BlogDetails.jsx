import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/styles.css";  

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/blogs/${id}`)
      .then((response) => setBlog(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/blogs/${id}`)
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p><strong>Author:</strong> {blog.author}</p>

      {/* Edit and Delete Buttons */}
      <div className="d-flex gap-2">
        <Link to={`/edit/${id}`} className="btn btn-warning">Edit</Link>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default BlogDetails;
