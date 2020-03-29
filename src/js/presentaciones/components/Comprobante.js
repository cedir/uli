import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

export function useComprobanteState() {
    const [tipo, setTipo] = useState('');
    const [subTipo, setSubTipo] = useState('');
    const [responsable, setResponsable] = useState('');
    const [gravado, setGravado] = useState('0.00');

    return {
        tipo,
        setTipo,
        subTipo,
        setSubTipo,
        responsable,
        setResponsable,
        gravado,
        setGravado,
    };
}
function Comprobante(props) {
    const {
        tipo,
        setTipo,
        subTipo,
        setSubTipo,
        responsable,
        setResponsable,
        gravado,
        setGravado,
    } = props;

    return (
        <div>
            <Row>
                <Col>
                    <span>Comprobante</span>
                </Col>
                <Col>
                    <select value={ tipo } onChange={ e => setTipo(e.target.value) }>
                        <option value=''>Seleccionar...</option>
                        <option value='1'>Factura</option>
                        <option value='2'>Liquidacion</option>
                        <option value='3'>Nota de crédito</option>
                        <option value='4'>Nota de débito</option>
                        <option value='5'>Factura de crédito electrónica MiPyMEs</option>
                        <option value='6'>Nota de crédito electrónica MiPyMEs</option>
                        <option value='7'>Nota de débito electrónica MiPyMEs</option>
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <span>Sub-Tipo</span>
                    <select
                      className='subtipo'
                      value={ subTipo }
                      onChange={ e => setSubTipo(e.target.value) }
                    >
                        <option value=''>Seleccionar...</option>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <span>Responsable</span>
                </Col>
                <Col>
                    <select
                      placeholder='Seleccionar...'
                      value={ responsable }
                      onChange={ e => setResponsable(e.target.value) }
                    >
                        <option value=''>Seleccionar...</option>
                        <option value='Cedir'>CeDIR</option>
                        <option value='Brunetti'>Brunetti</option>
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <span>% de Gravado</span>
                </Col>
                <Col>
                    <select
                      placeholder='Seleccionar...'
                      value={ gravado }
                      onChange={ e => setGravado(e.target.value) }
                    >
                        <option value='0.00'>%0.00</option>
                        <option value='10.50'>%10.50</option>
                        <option value='21.00'>%21.00</option>
                    </select>
                </Col>
            </Row>
        </div>
    );
}

const { string, func } = PropTypes;

Comprobante.propTypes = {
    tipo: string.isRequired,
    setTipo: func.isRequired,
    subTipo: string.isRequired,
    setSubTipo: func.isRequired,
    responsable: string.isRequired,
    setResponsable: func.isRequired,
    gravado: string.isRequired,
    setGravado: func.isRequired,
};

export default Comprobante;
