import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/blogs", { title, content, author })
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <h2>Create a New Blog</h2>
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
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
