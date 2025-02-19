import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/blogs/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setAuthor(response.data.author);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/blogs/${id}`, { title, content, author })
      .then(() => navigate(`/blogs/${id}`))
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
};

export default EditBlog;
