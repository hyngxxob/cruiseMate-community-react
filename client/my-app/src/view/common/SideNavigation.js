import React, { useState } from 'react';

function SideNavigation(props) {
  const { toggleNav } = props;

  return (
    <nav className={`sidenav ${props.isNavOpen ? '' : 'sidenav--open'}`}>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/notice">공지사항</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/driveSpot">드라이브 스팟</a></li>
      </ul>
      <button className="close-button" onClick={toggleNav}>
        <i className="fas fa-times"></i>
      </button>
    </nav>
  );
}

export default SideNavigation;