import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand */}
        <h1 className="text-xl font-bold text-blue-600">URL Shortener</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/" className="hover:text-blue-600 font-medium">Shorten URL</Link>
              <Link to="/stats" className="hover:text-blue-600 font-medium">View Stats</Link>
              <Link to="/history" className="hover:text-blue-600 font-medium">History</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 font-medium">Login</Link>
              ||
              <Link to="/signup" className="hover:text-blue-600 font-medium">Signup</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3">
          {isAuthenticated ? (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 font-medium">Shorten URL</Link>
              <Link to="/stats" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 font-medium">View Stats</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 w-fit"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 font-medium">Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 font-medium">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
