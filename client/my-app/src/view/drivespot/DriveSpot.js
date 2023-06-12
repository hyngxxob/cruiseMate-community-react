import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import NoticeCard from '../card/NoticeCard';
// import SideNavigation from './SideNavigation';
import '../../css/DriveSpot/DriveSpot.css';

import CreateDriveSpot from '../modal/drivespot/CreateDriveSpot';

function DriveSpot() {
  const [driveSpots, setDriveSpots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3100/user/spot');
        const data = await response.json();
        const driveSpotsArray = Array.isArray(data) ? data : [data];
        setDriveSpots(driveSpotsArray[0].data);
      } catch (error) {
        console.error('Error fetching drive spots:', error);
      }
    };
  
    fetchData(); // 첫 번째 마운트 시에만 데이터 가져오기
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ height: '100%' }}>
      드라이브 페이지
      <div>
        <button onClick={handleOpenModal}>생성</button>
        <CreateDriveSpot isOpen={isModalOpen} onClose={handleCloseModal} />
        <ul>
          {driveSpots.map((spot) => (
            <li key={spot.id}>
              {spot.spot_name} - {spot.spot_addr}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DriveSpot;