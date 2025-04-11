import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './nav.css'; 
// Define the type for visited pages
type VisitedPages = string[];

const Nav: React.FC = () => {
  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [visitedPages, setVisitedPages] = useState<VisitedPages>(['Home']); // Initialize with 'Home' as the starting page

  // Update visited pages whenever location changes
  useEffect(() => {
    const currentPage = location.pathname.split('/').pop(); // Get current page name

    // If the current page is home, reset visited pages to ['Home']
    if (currentPage === '' || currentPage === 'home') {
      setVisitedPages(['Home']);
    } else if (currentPage && !visitedPages.includes(currentPage)) {
      // Add the new page to visited pages only if it's not already there
      setVisitedPages((prevPages) => [...prevPages, currentPage]);
    }
  }, [location]); // Only depend on location changes

  // Handle click on Home to reset the visited pages and navigate to the root path
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Prevent default link behavior
    setVisitedPages(['Home']); // Reset the visited pages when Home is clicked
    navigate('/'); // Programmatically navigate to the root path
  };

  return (
    <nav className="visited-nav">
      <ul className="menu">
        {visitedPages.map((page, index) => (
          <li className="menu-item" key={index}>
            {/* Check if the page is Home to handle click differently */}
            {page === 'Home' ? (
              <a href="/" onClick={handleHomeClick}>Home</a>
            ) : (
              <Link to={`/${page.toLowerCase()}`}>
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
