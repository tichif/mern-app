import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import './MainNav.css';
import MainHeader from './MainHeader';
import SideDrawer from './SideDrawer';
import NavLinks from './NavLinks';
import Backdrop from '../UIElements/Backdrop';

const MainNav = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
  return (
    <Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}></Backdrop>}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className='main-navigation__drawer-nav'>
          <NavLinks></NavLinks>
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className='main-navigation__menu-btn'
          onClick={openDrawerHandler}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <h1 className='main-navigation__title'>
          <Link to='/'>Your places</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLinks></NavLinks>
        </nav>
      </MainHeader>
    </Fragment>
  );
};

export default MainNav;
