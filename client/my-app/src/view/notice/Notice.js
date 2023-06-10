import React, {useState} from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import NoticeCard from '../card/NoticeCard';
// import SideNavigation from './SideNavigation';

function Notice() {
  return (
    <div>
        Notice Page
        <NoticeCard/>
    </div>
    
  );
}

export default Notice;