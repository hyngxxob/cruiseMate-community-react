import React, {useState , useEffect} from 'react';
import $ from 'jquery';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import NoticeCard from '../card/NoticeCard';
// import SideNavigation from './SideNavigation';
import '../../css/Home/Home.css'
import HomeController from '../../controller/home/Home';

function Home() {
  
  
  return (
      <div className="content-fullContainer">
        <div style={{flex : '1', padding : '32px'}}>
          <button onClick={HomeController.handleClick}>test</button>
          <NoticeCard/>
        </div>
        <div style={{flex : '0.3', padding : '32px'}}>

        </div>
      </div>
  );
}

export default Home;