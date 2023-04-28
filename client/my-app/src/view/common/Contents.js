import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notice from '../notice/Notice';
import Home from '../home/Home';

function SideNavigation(props) {
  return (
    <div className={`${props.isNavOpen ? '' : 'sidenav--open--homecontents'}`}>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notice" element={<Notice />} />
            {/* <Route path="/about" component={About} /> */}
          </Routes>
      </Router>
  </div>
  );
}

export default SideNavigation;