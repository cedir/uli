import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { formValueSelector } from 'redux-form';
import LineaForm from './LineaForm';

function LineasForm({ fields, iva }) {
    return (
        <React.Fragment>
            {fields.map((linea, index) => (
                <LineaForm
                  hideLabel={ index !== 0 }
                  key={ index }
                  prefijo={ linea }
                  iva={ iva }
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
        </React.Fragment>
    );
}

const { number, object } = PropTypes;

LineasForm.propTypes = {
    fields: object,
    iva: number,
};

const selector = formValueSelector('CreateComprobanteForm');

function mapStateToProps(state) {
    return {
        iva: Number(selector(state, 'iva')),
    };
}

export default connect(mapStateToProps)(LineasForm);
