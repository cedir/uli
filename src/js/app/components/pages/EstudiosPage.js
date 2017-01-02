import React from 'react';
import {Link} from 'react-router';
import {EstudiosDelDia} from '../estudio/EstudiosDelDia';

const EstudiosPage = () => {
  return (
    <div>
      <h1>Estudios</h1>
      <p>Estudios del día</p>
      <EstudiosDelDia/>
    </div>
  );
};

export default EstudiosPage;

