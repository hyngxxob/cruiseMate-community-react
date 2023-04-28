import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

function SideNavigation() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div>
      <button style={{ position : 'absolute', top : '4px', left : '4px'}} onClick={toggleNav}>collapse</button>
      <nav className={`sidenav ${isNavOpen ? 'sidenav--open' : ''}`}>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
      </nav>
    </div>
  );
}

export default SideNavigation;