import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Comprobante(props) {
    const {
        tipoValue,
        onChangeTipo,
        subTipoValue,
        onChangeSubTipo,
        responsableValue,
        onChangeResponsable,
        gravadoValue,
        onChangeGravado,
    } = props;

    return (
        <div>
            <Row>
                <Col>
                    <span>Comprobante</span>
                </Col>
                <Col>
                    <select value={ tipoValue } onChange={ onChangeTipo }>
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
                      value={ subTipoValue }
                      onChange={ onChangeSubTipo }
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
                      value={ responsableValue }
                      onChange={ onChangeResponsable }
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
                      value={ gravadoValue }
                      onChange={ onChangeGravado }
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
    subTipoValue: string.isRequired,
    onChangeSubTipo: func.isRequired,
    tipoValue: string.isRequired,
    onChangeTipo: func.isRequired,
    responsableValue: string.isRequired,
    onChangeResponsable: func.isRequired,
    gravadoValue: string.isRequired,
    onChangeGravado: func.isRequired,
};

export default Comprobante;
