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

    const [netoTotal, setNetoTotal] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setNetoTotal(
            lineas.map(linea => Number(linea.importeNeto || 0))
                  .reduce((importeTotal, importe) => importeTotal + importe, 0),
        );
        setTotal(
            Math.round((netoTotal * 100) + (netoTotal * (iva || 0))) / 100,
        );
    });

    const getIva = () => Number(iva && opcionesIva.find(e => e.gravado === iva).porcentaje);

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
            </Row>
            <Row>
                <Col mdOffset={ 10 } md={ 2 }>
                    Total: ${ total }
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
