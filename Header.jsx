import { Link } from "react-router-dom";
import { Code2, Search } from "lucide-react";

function Header() {
  return (
    <header className="site-header">
      {/* Logo - links back to home */}
      <Link to="/" className="brand">
        <span className="brand-icon">
          <Code2 size={22} />
        </span>
        <span>DEV@Deakin</span>
      </Link>

      {/* Search (functionality comes in a future task) */}
      <div className="header-search">
        <Search size={18} />
        <input type="text" placeholder="Search..." aria-label="Search" />
      </div>

      {/* Post / Login */}
      <nav className="header-actions">
        <Link to="/post" className="header-link">Post</Link>
        <Link to="/login" className="header-link">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
