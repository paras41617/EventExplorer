import React, { useEffect } from 'react';
import '../styles/Navigation.css'
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();

  const isSearchActive = location.pathname === '/search';
  const isfavouriteActive = location.pathname === '/favourite';

  const activeItemStyle = {
    border: '1px solid white',
    borderRadius: '8px', 
  };

  const nav = {
    paddingTop: '20px',
    paddingRight: '50px',
    display: 'flex',
    justifyContent: 'flex-end'
  };

  const navItem = {
    color: 'white',
    padding: '5px 10px 5px 10px',
    marginLeft:'20px',
    textDecoration: 'None',
  }

  const navLink = {
    color: 'white',
    textDecoration: 'None',
  }

  return (
    <nav className="navbar">
      <div style={nav}>
        <div style={{display:'flex'}}>
          <p style={{ ...navItem, ...(isSearchActive ? activeItemStyle : {}) }}>
            <Link to="/search" style={navLink}>Search</Link>
          </p>
          <p style={{ ...navItem, ...(isfavouriteActive ? activeItemStyle : {}) }}>
            <Link to="/favourite" style={navLink}>Favourite</Link>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
