import React, {useState, useEffect} from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import '../../css/Home/Home.css'
import '../../css/NoticeTable/NoticeTable.css'

import noticeSData from '../../data/sampleNotice.json';

// import SideNavigation from './SideNavigation';

function NoticeCard() {
    let [noticeData, setNoticeData] = useState([]);
    useEffect(() => {
      // 데이터를 불러와서 noticeData 상태를 업데이트하는 코드
      setNoticeData(noticeSData);
    }, []);

  return (
    <div className='home-notice-container' style={{boxShadow : '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)', height : '250px', overflowY : 'scroll'}}>
        <h4>공지사항</h4>
        <table style={{width:'100%'}}>
            <thead>
            <tr>
                {/* <th>번호</th> */}
                <th style={{position: 'sticky', top : '0px', background : 'white'}}>제목</th>
                <th style={{position: 'sticky', top : '0px', background : 'white'}}>내용</th>
                <th style={{position: 'sticky', top : '0px', background : 'white'}}>작성일</th>
            </tr>
            </thead>
            <tbody>
            {noticeData.map((item, index) => (
                <tr key={index} style={{height:'40px'}}>
                    <td>{item.subject}</td>
                    <td>{item.content}</td>
                    <td>{item.date}</td>
                    {/* <td>{item.author}</td>
                    <td>{item.date}</td> */}
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
}

export default NoticeCard;