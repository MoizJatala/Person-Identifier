import { links } from '../data';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const authToken = Cookies.get('authToken');

  useEffect(() => {
    // Fetch user details when component mounts
    axios
      .get('http://localhost:3001/profile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === 'Success') {
          setUser(res.data.user.name);
          setRole(res.data.user.role);
        } else {
          // Handle error
        }
      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });
  }, [authToken]);

  const handleTextLinkClick = () => {
    // Reset the pathname to the original one
    navigate('/');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    Cookies.remove('authToken');
    // Redirect or perform any additional cleanup/logout actions as needed
    // For example, you can use React Router to redirect to a login page
    window.location.href = '/login';
  }

  return (
    <nav className='bg-emerald-100' style={{ paddingRight: '132px' }}>
      <div className='align-element py-4 flex flex-col sm:flex-row sm:gap-x-16 sm:items-center sm:py-8 justify-around'>
        <h2 className='text-3xl font-bold'>
          Person<span className='text-emerald-600'>Identifier</span>
        </h2>
        <div className='flex gap-x-12'>
          {links.map((link) => {
            const { id, href, text } = link;
            return (
              <a
                key={id}
                href={href}
                className='capitalize font-medium text-xl tracking-wide hover:text-emerald-600 duration-300'
                onClick={handleTextLinkClick}
              >
                {text}
              </a>
            );
          })}
          {user && role === 'admin' && (
            <>
              <span className='capitalize font-medium text-xl tracking-wide hover:text-emerald-600 duration-300'>
                <Link to={{ pathname: '/admin'}}>Dashboard</Link>
              </span>
              <span className='capitalize font-medium text-xl tracking-wide hover:text-emerald-600 duration-300'>
                <Link to={{ pathname: '/uploaded-videos'}}>Videos</Link>
              </span>
            </>
          )}
          {user && role === 'user' && (
            <>
              <span className='capitalize font-medium text-xl tracking-wide hover:text-emerald-600 duration-300'>
                <Link to={{ pathname: '/fileupload'}}>Upload</Link>
              </span>
              <span className='capitalize font-medium text-xl tracking-wide hover:text-emerald-600 duration-300'>
                <Link to={{ pathname: '/recorder'}}>Record</Link>
              </span>
            </>
          )}
        </div>
        {user ? (
          // Render user-specific content or additional actions
          <div>
            <p>
              Welcome,
              <button onClick={handleMenuOpen} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>{user}!</button>
            </p>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component={Link} to="/profile">Profile</MenuItem>
              <MenuItem onClick={handleLogout} component={Link}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          // Render the login button when there's no user
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg py-1.5 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-emerald-800">
            <Link to='/login'>Login</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
