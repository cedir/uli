/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { formValueSelector } from 'redux-form';
import LineaForm from './LineaForm';

function LineasForm({ fields, iva, lineas, opcionesIva }) {
    useEffect(() => {
        fields.push({});
    }, []);
    const getIva = () => Number(iva && opcionesIva.find(e => e.gravado === iva).porcentaje);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const neto = lineas
            .map(linea => Number(linea.importeNeto || 0))
            .reduce((importeTotal, importe) => importeTotal + importe, 0);

        setTotal(Math.round(neto * 100 + neto * (getIva() || 0)) / 100);
    });

    return (
        <React.Fragment>
            {fields.map((linea, index) => (
                <LineaForm
                  hideLabel={ index !== 0 }
                  key={ index }
                  prefijo={ linea }
                  iva={ getIva() }
                  removeField={ () => fields.remove(index) }
                />
            ))}
            <Row>
                <Col md={ 5 }>
                    <Button
                      bsStyle='link'
                      onClick={ () => fields.push({}) }
                    >
                        <Glyphicon glyph='plus' />
                    </Button>
                </Col>
                <Col mdOffset={ 5 } md={ 2 }>
                    Total: ${ total || 0 }
                </Col>
            </Row>
        </React.Fragment>
    );
}

const { number, object, array } = PropTypes;

LineasForm.propTypes = {
    fields: object,
    iva: number,
    lineas: array,
    opcionesIva: array.isRequired,
};

LineasForm.defaultProps = {
    lineas: [],
};

const selector = formValueSelector('CreateComprobanteForm');

function mapStateToProps(state) {
    return {
        iva: Number(selector(state, 'iva')),
        lineas: selector(state, 'lineas'),
    };
}

export default connect(mapStateToProps)(LineasForm);
