import React from 'react';
import './Navigation.css';
import Box from '@mui/material/Box';
import Logo from '../Images/Logo.jpg';
const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <div className='navi'>
          <div className='logo'>
          <img src={Logo}></img>

          </div>
          <div className='navi-button'>
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signout')} className='f3 link dim pa3 pointer'><Box className='box'sx={{
        backgroundColor: 'none',
        '&:hover': {
          backgroundColor: 'none',
          opacity: [0.9, 0.8, 0.7],
        },
      }}>Sign Out</Box></p>
        </nav>
        </div>
        </div>


      );
      
    }
     else {
      return (
        <div className='navi'>
          <div className='logo'>
          <img src={Logo}></img>

          </div>
        <div className='navi-button'>
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signin')} className='f3 link pa3 pointer'><Box className='box'  sx={{
        backgroundColor: 'none',
        '&:hover': {
          backgroundColor: 'none',
          opacity: [0.9, 0.8, 0.7],
        },
      }}>Sign In</Box></p>
          <p onClick={() => onRouteChange('register')} className='f3 link  pa3 pointer'><Box className='box'sx={{
        backgroundColor: 'none',
        
        '&:hover': {
          backgroundColor: 'none',
          opacity: [0.9, 0.8, 0.7],
        },
      }}>Register</Box></p>
        </nav>
        </div>

        </div>
      );

    }
}

export default Navigation;