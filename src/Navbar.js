import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [query, setQuery] = useState(''); // State to hold search query
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`); // Redirect to the search page with the query
    }
  };

  return (
    <nav className="navbar">
      {/* Left side: Logo */}
      <div className="logo">
        <Link to="/">MyMovieApp</Link>
      </div>

      {/* Right side: Nav links and search bar on the same line */}
      <div className="nav-search-container">
        <ul className="nav-links">
          <li>
            <Link to="/">Popular Movies</Link>
          </li>
          <li>
            <Link to="/top-rated">Top Rated Movies</Link>
          </li>
          <li>
            <Link to="/upcoming">Upcoming Movies</Link> {/* Added Upcoming Movies */}
          </li>
        </ul>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
