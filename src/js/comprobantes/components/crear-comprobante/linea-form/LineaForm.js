import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { Field, formValueSelector } from 'redux-form';
import InputRF from '../../../../utilities/InputRF';
import { required } from '../../../../utilities/reduxFormValidators';

function LineaForm({ iva, importe, hideLabel, key, prefijo, removeField, lockComprobante }) {
    const importeIva = Math.round(iva * importe) / 100;
    const importeTotal = importeIva ? Math.round((importeIva + importe) * 100) / 100 : importe;
    return (
        <Row key={ key }>
            <Col md={ 7 }>
                <Field
                  name={ `${prefijo}.concepto` }
                  label='Concepto'
                  hideLabel={ hideLabel }
                  component={ InputRF }
                  validate={ required }
                  type='text'
                  staticField={ lockComprobante }
                />
            </Col>
            <Col md={ 2 }>
                <Field
                  name={ `${prefijo}.importeNeto` }
                  label='Importe Neto'
                  hideLabel={ hideLabel }
                  component={ InputRF }
                  validate={ required }
                  type='text'
                  staticField={ lockComprobante }
                />
            </Col>

            <Col md={ 1 }>
                {!hideLabel &&
                    <label
                      className='control-label'
                      htmlFor='importeIva'
                    >
                    Iva
                    </label>
                }
                <p className='form-control-static'>
                    {importeIva || '-'}
                </p>
            </Col>

            <Col md={ 1 }>
                {!hideLabel &&
                    <label className='control-label' htmlFor='subTotal'>
                        Sub-total
                    </label>
                }
                <p className='form-control-static'>
                    {importeTotal || '-'}
                </p>
            </Col>
            <Col md={ 1 }>
                <Button
                  bsStyle='link'
                  onClick={ removeField }
                  style={ !hideLabel ? { marginTop: '1.6em' } : {} }
                  disabled={ lockComprobante }
                >
                    <Glyphicon glyph='remove' />
                </Button>
            </Col>
        </Row>
    );
}

const { number, func, bool, string } = PropTypes;

LineaForm.propTypes = {
    iva: number,
    importe: number,
    hideLabel: bool,
    key: number,
    prefijo: string,
    removeField: func,
    lockComprobante: bool,
};

const selector = formValueSelector('CreateComprobanteForm');

function mapStateToProps(state, { prefijo }) {
    return {
        importe: Number(selector(state, `${prefijo}.importeNeto`)),
    };
}

export default connect(mapStateToProps)(LineaForm);
