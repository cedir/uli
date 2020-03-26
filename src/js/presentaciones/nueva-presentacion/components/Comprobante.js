import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Comprobante(props) {
    const {
        numeroShortValue,
        onChangeNumeroShort,
        numeroLongValue,
        onChangeNumeroLong,
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
        <div className='comprobante'>
            <Row className='row row-1'>
                <Col className='col col-1'>
                    <span>Numero</span>
                </Col>
                <Col className='col col-2'>
                    <input
                      maxLength='4'
                      className='short'
                      type='text'
                      placeholder='0000'
                      value={ numeroShortValue }
                      onChange={ onChangeNumeroShort }
                    />
                    <input
                      maxLength='8'
                      className='long'
                      type='text'
                      placeholder='00000000'
                      value={ numeroLongValue }
                      onChange={ onChangeNumeroLong }
                    />
                </Col>
            </Row>
            <Row className='row row-2'>
                <Col className='col col-1'>
                    <span>Comprobante</span>
                </Col>
                <Col className='col col-2'>
                    <select value={ tipoValue } onChange={ onChangeTipo }>
                        <option value=''>Seleccionar...</option>
                        <option value='Factura Electronica'>
                            Factura Electronica
                        </option>
                        <option value='Liquidacion'>
                            Liquidacion
                        </option>
                        <option value='Recibo'>Recibo</option>
                    </select>
                </Col>
                <Col className='col col-3'>
                    <span>Sub-Tipo</span>
                    <select
                      className='subtipo'
                      value={ subTipoValue }
                      onChange={ onChangeSubTipo }
                    >
                        <option value=''>...</option>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                    </select>
                </Col>
            </Row>
            <Row className='row row-3'>
                <Col className='col col-1'>
                    <span>Responsable</span>
                </Col>
                <Col className='col col-2'>
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
            <Row className='row row-4'>
                <Col className='col col-1'>
                    <span>% de Gravado</span>
                </Col>
                <Col className='col col-2'>
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
    numeroShortValue: string.isRequired,
    onChangeNumeroShort: func.isRequired,
    numeroLongValue: string.isRequired,
    onChangeNumeroLong: func.isRequired,
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
