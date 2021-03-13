import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Col } from 'react-bootstrap';

function ViewAsociado({ estudioAsociado }) {
    const paciente = estudioAsociado.paciente;
    const medico = estudioAsociado.medico;

    return (
        <Panel header='Datos del Estudio' collapsible defaultExpanded >
            <Col md={ 6 }>
                <p>Fecha: { estudioAsociado.fecha }</p>
                <p>Paciente: { paciente.apellido }, { paciente.nombre }</p>
                <p>Práctica: { estudioAsociado.practica.descripcion }</p>
            </Col>
            <Col md={ 6 }>
                <p>Médico Actuante: { medico.apellido }, { medico.nombre }</p>
                <p>Obra Social: { estudioAsociado.obra_social.nombre }</p>
            </Col>
        </Panel>
    );
}

const { object } = PropTypes;

ViewAsociado.propTypes = {
    estudioAsociado: object.isRequired,
};

export default ViewAsociado;
