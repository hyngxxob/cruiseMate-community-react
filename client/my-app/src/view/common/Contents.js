import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notice from '../notice/Notice';
import Home from '../home/Home';
import DriveSpot from '../drivespot/DriveSpot';

function SideNavigation(props) {
  return (
    <div className={`${props.isNavOpen ? 'sidenav--close--contents' : 'sidenav--open--contents'}`}>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/driveSpot" element={<DriveSpot />} />
            {/* <Route path="/about" component={About} /> */}
          </Routes>
      </Router>
  </div>
  );
}

export default SideNavigation;