import React from 'react';
import {Link} from 'react-router';
import {ControlPagoAnestesista} from './components/ControlPagoAnestesista';
import {LineasARA} from './components/LineasARA';
import {LineasNoARA} from './components/LineasNoARA';

const PagoAnestesistaPage = () => {
  return (
    <div>
      <h1>Pago a Anestesista</h1>
      <p>Detalle del Pago</p>
      <ControlPagoAnestesista/>
      <div className="ibox-content">
        <LineasARA/>
        <LineasNoARA/>
      </div>
    </div>
  );
};

export default PagoAnestesistaPage;

