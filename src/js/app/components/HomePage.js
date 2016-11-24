import React from 'react';
import {Link} from 'react-router';

const HomePage = () => {
  return (
    <div>
      <h1>Cedir React-Redux POC</h1>

      <h2>Links</h2>
      <ol>
        <li>Revisar y actualizar pendientes en <Link to="add-todo">TODO APP</Link></li>
        <li>Otra app comming soon..</li>
      </ol>
    </div>
  );
};

export default HomePage;

