import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

function Comprobante() {
    const [inputShort, setInputShort] = useState('');
    const [inputLong, setInputLong] = useState('');

    const inputShortHandler = (e) => {
        const value = Number(e.target.value);
        if (!(isNaN(value))) {
            setInputShort(value);
        }
    };

    const inputLongHandler = (e) => {
        const value = Number(e.target.value);
        if (!(isNaN(value))) {
            setInputLong(value);
        }
    };

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
                      value={ inputShort }
                      onChange={ inputShortHandler }
                    />
                    <input
                      maxLength='8'
                      className='long'
                      type='text'
                      placeholder='00000000'
                      value={ inputLong }
                      onChange={ inputLongHandler }
                    />
                </Col>
            </Row>
            <Row className='row row-2'>
                <Col className='col col-1'>
                    <span>Comprobante</span>
                </Col>
                <Col className='col col-2'>
                    <select>
                        <option value='Factura Electronica'>
                            Factura Electronica
                        </option>
                        <option value='Recibo'>Recibo</option>
                    </select>
                </Col>
                <Col className='col col-3'>
                    <span>Sub-Tipo</span>
                    <select className='subtipo'>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                        <option value='C'>C</option>
                    </select>
                </Col>
            </Row>
            <Row className='row row-3'>
                <Col className='col col-1'>
                    <span>Responsable</span>
                </Col>
                <Col className='col col-2'>
                    <select placeholder='Seleccionar...'>
                        <option value='CeDIR'>CeDIR</option>
                        <option value='Brunetti'>Brunetti</option>
                    </select>
                </Col>
            </Row>
            <Row className='row row-4'>
                <Col className='col col-1'>
                    <span>% de Gravado</span>
                </Col>
                <Col className='col col-2'>
                    <select placeholder='Seleccionar...'>
                        <option value='0.00'>%0.00</option>
                        <option value='10.50'>%10.50</option>
                        <option value='21.00'>%21.00</option>
                    </select>
                </Col>
            </Row>
        </div>
    );
}

export default Comprobante;
