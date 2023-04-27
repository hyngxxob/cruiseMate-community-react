import React from 'react';
import homeController from '../../controller/Home'

function SideNavigation() {
    const handleClick = () => {
        homeController.handleSubmit();
    };
  return (
    <div style={{marginLeft: "280px"}}>
    <h1>Welcome to my homepage!</h1>
      <p>Here is some information about me.</p>
      <button onClick={handleClick}></button>
      <table class="table">
        <thead>
            <tr>
                <th scope="col">hi</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            </tr>
            <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            </tr>
            <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
            </tr>
        </tbody>
      </table>
  </div>
  );
}

export default SideNavigation;