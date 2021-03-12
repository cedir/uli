import React, { useState } from 'react';
import { Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FETCH_COMPROBANTES_FILTRO } from '../actionTypes';
import ComprobanteFields from './ComprobanteFields';
import BotonesForm from './BotonesForm';

function FilterComprobantes({ buscarComprobante, handleSubmit, history }) {
    const [searching, setSearching] = useState(false);

    const handleSave = (comprobante) => {
        setSearching(true);
        buscarComprobante(comprobante, setSearching);
    };

    const style = {
        panel: { margin: '1.5rem' },
        comprobanteFields: { paddingLeft: 0 },
    };

    return (
        <Form
          onSubmit={ handleSubmit(handleSave) }
        >
            <Row>
                <Panel header='Filtros' style={ style.panel }>
                    <Col md={ 10 } style={ style.comprobanteFields }>
                        <ComprobanteFields />
                    </Col>
                </Panel>
                <Col md={ 2 }>
                    <BotonesForm
                      searching={ searching }
                      history={ history }
                    />
                </Col>
            </Row>
        </Form>
    );
}

const { func, object } = PropTypes;

FilterComprobantes.propTypes = {
    buscarComprobante: func.isRequired,
    handleSubmit: func.isRequired,
    history: object.isRequired,
};

const FilterComprobantesForm =
    reduxForm({
        form: 'searchObraSocial',
        destroyOnUnmount: false,
        enableReinitialize: true,
    })(FilterComprobantes);

const mapDispatchToProps = dispatch => ({
    buscarComprobante: (params, setSearching) =>
        dispatch({ type: FETCH_COMPROBANTES_FILTRO, params, setSearching }),
});

export default connect(null, mapDispatchToProps)(FilterComprobantesForm);
