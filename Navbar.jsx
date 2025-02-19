import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Blog Manager
        </Link>
        <Link className="btn btn-light" to="/create">
          New Blog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
