/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { formValueSelector } from 'redux-form';
import LineaForm from './LineaForm';

function LineasForm({ fields, lineas, lockComprobante, porcentaje }) {
    useEffect(() => {
        fields.push({});
    }, []);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const neto = lineas
            .map(linea => Number(linea.importeNeto || 0))
            .reduce((importeTotal, importe) => importeTotal + importe, 0);

        setTotal(Math.round(neto * 100 + neto * (porcentaje || 0)) / 100);
    });

    return (
        <React.Fragment>
            {fields.map((linea, index) => (
                <LineaForm
                  hideLabel={ index !== 0 }
                  key={ index }
                  prefijo={ linea }
                  iva={ porcentaje }
                  removeField={ () => fields.remove(index) }
                  lockComprobante={ lockComprobante }
                />
            ))}
            <Row>
                <Col md={ 5 }>
                    {!lockComprobante &&
                        <Button
                          bsStyle='link'
                          onClick={ () => fields.push({}) }
                        >
                            <Glyphicon glyph='plus' />
                        </Button>
                    }
                </Col>
                <Col mdOffset={ 5 } md={ 2 }>
                    Total: ${ total || 0 }
                </Col>
            </Row>
        </React.Fragment>
    );
}

const { number, object, array, bool } = PropTypes;

LineasForm.propTypes = {
    fields: object,
    lineas: array,
    lockComprobante: bool.isRequired,
    porcentaje: number.isRequired,
};

LineasForm.defaultProps = {
    lineas: [],
};

const selector = formValueSelector('CreateComprobanteForm');

function mapStateToProps(state) {
    return {
        iva: Number(selector(state, 'iva')),
        lineas: selector(state, 'lineas'),
        porcentaje: Number(selector(state, 'porcentaje')),
    };
}

export default connect(mapStateToProps)(LineasForm);
