import React, {useState} from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import NoticeCard from '../card/NoticeCard';
// import SideNavigation from './SideNavigation';
import '../../css/DriveSpot/DriveSpot.css'

import CreateDriveSpot from '../modal/drivespot/CreateDriveSpot'


function DriveSpot() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
      <div style={{height:'100%;'}}>
        드라이브 페이지
        <div>
        <button onClick={handleOpenModal}>생성</button>
          <CreateDriveSpot isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      </div>
  );
}

export default DriveSpot;