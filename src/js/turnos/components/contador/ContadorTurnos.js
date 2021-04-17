import React from 'react';
import ContadorTable from './ContadorTable';

function ContadorTurnos() {
    const tiempos = [1, 2, 6, 12];
    return (
        <React.Fragment>
            <h1>Contador de Turnos</h1>
            <ContadorTable tiempos={ tiempos } cantTurnos={ [6, 4, 2, 3] } />
        </React.Fragment>
    );
}

export default ContadorTurnos;
