import React from 'react';
import { Link } from 'react-router-dom';

import './MainNav.css';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';

const MainNav = () => {
  return (
    <MainHeader>
      <button className='main-navigation__menu-btn'>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <h1 className='main-navigation__title'>
        <Link to='/'>Your places</Link>
      </h1>
      <nav>
        <NavLinks></NavLinks>
      </nav>
    </MainHeader>
  );
};

export default MainNav;
