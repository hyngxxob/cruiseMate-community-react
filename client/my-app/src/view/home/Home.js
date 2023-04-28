import React, {useState} from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import NoticeCard from '../card/NoticeCard';
// import SideNavigation from './SideNavigation';
import '../../css/Home/Home.css'

function Home() {
  function handleClick() {
    alert("hi");
  }
  
  return (
    <div style={{minWidth : '1000px'}}>
      {/* <img src="https://www.indonesia.travel/content/dam/indtravelrevamp/en/trip-ideas/the-ultimate-guide-of-getting-around-in-indonesia/header2.jpg"></img> */}
      <img src="https://seoulsky.lotteworld.com/seoulsky/images/kor/contents/img_UI-PC-SK-002_07.jpg" style={{width:'50%', paddingTop:'0px'}}></img>
      <div style={{display: 'flex', flexDirection:'row'}}>
        <div style={{flex : '1', padding : '32px'}}>
          <NoticeCard/>
          <NoticeCard/>
          <NoticeCard/>
          <NoticeCard/>
        </div>
        <div style={{flex : '0.3', padding : '32px'}}>

        </div>
      </div>
    </div>
  );
}

export default Home;