import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Col } from 'react-bootstrap';

function ViewAsociado({ estudioAsociado, style }) {
    const { fecha, paciente, practica, medico, obra_social } = estudioAsociado;

    return (
        <Panel
          header='Datos del Estudio'
          collapsible
          defaultExpanded
          style={ style }
        >
            <Col md={ 6 }>
                <p>Fecha: { fecha }</p>
                <p>Paciente: { paciente.apellido }, { paciente.nombre }</p>
                <p>Práctica: { practica.descripcion }</p>
            </Col>
            <Col md={ 6 }>
                <p>Médico Actuante: { medico.apellido }, { medico.nombre }</p>
                <p>Obra Social: { obra_social.nombre }</p>
            </Col>
        </Panel>
    );
}

const { object } = PropTypes;

ViewAsociado.propTypes = {
    estudioAsociado: object.isRequired,
    style: object.isRequired,
};

export default ViewAsociado;
