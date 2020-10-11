import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import { Field, formValueSelector } from 'redux-form';
import InputRF from '../../../utilities/InputRF';
import { required } from '../../../utilities/reduxFormValidators';

function LineaForm({ iva, importe }) {
    const getIva = () => ((iva / 100) * importe);
    return (
        <Row>
            <Col md={ 8 }>
                <Field
                  name='concepto'
                  label='Concepto'
                  component={ InputRF }
                  validate={ required }
                  type='text'
                />
            </Col>
            <Col md={ 2 }>
                <Field
                  name='importeNeto'
                  label='Importe Neto'
                  component={ InputRF }
                  validate={ required }
                  type='text'
                />
            </Col>

            <Col md={ 1 }>
                <label className='control-label' htmlFor='importeIva'>Iva</label>
                <p className='form-control-static'>{getIva() || '-'}</p>
            </Col>

            <Col md={ 1 }>
                <label className='control-label' htmlFor='subTotal'>Sub-total</label>
                <p className='form-control-static'>{importe + getIva() || importe || '-'}</p>
            </Col>
        </Row>
    );
}

const { number } = PropTypes;

LineaForm.propTypes = {
    iva: number,
    importe: number,
};

const selector = formValueSelector('CreateComprobanteForm');

function mapStateToProps(state) {
    return {
        iva: Number(selector(state, 'iva')),
        importe: Number(selector(state, 'importeNeto')),
    };
}

export default connect(mapStateToProps)(LineaForm);
