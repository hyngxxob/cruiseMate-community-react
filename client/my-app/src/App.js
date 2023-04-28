import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './css/SideNavigation/SideNavigation.css';
import { default as SideNavigation } from './view/common/SideNavigation';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Contents from './view/common/Contents';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false); // 네비게이션 영역의 열림/닫힘 상태를 관리하는 state 변수

  // 네비게이션 영역 열기/닫기
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          {/* 컬랩스 버튼 */}
          <Button variant="outline-secondary" onClick={toggleNav}>
            <span className="navbar-toggler-icon"></span>
          </Button>

          {/* 네비게이션 로고 */}
          <Navbar.Brand href="#home">Offcanvas Navbar</Navbar.Brand>

          {/* 네비게이션 메뉴 */}
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <Nav.Link href="#dropdown">Dropdown</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* 네비게이션 영역 */}
      <SideNavigation isNavOpen={isNavOpen} toggleNav={toggleNav} />

      {/* 컨텐츠 영역 */}
      <Contents isNavOpen={isNavOpen} toggleNav={toggleNav}/>
    </div>
  );
}

export default App;

      // <header className="App-header">
      //   <img src={logo} className="App-logo" alt="logo" />
      //   <p>
      //     Edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <a
      //     className="App-link"
      //     href="https://reactjs.org"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     Learn React
      //   </a>
      // </header>