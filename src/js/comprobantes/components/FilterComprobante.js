import React from 'react';
import { Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FETCH_COMPROBANTES_FILTRO } from '../actionTypes';
import ComprobanteFields from './ComprobanteFields';
import BotonesForm from './BotonesForm';

function FilterComprobantes({ buscarComprobante, handleSubmit, history, apiLoading }) {
    const style = {
        panel: { margin: '1.5rem' },
        comprobanteFields: { paddingLeft: 0 },
    };

    return (
        <Form
          onSubmit={ handleSubmit(params => buscarComprobante(params)) }
        >
            <Row>
                <Panel header='Filtros' style={ style.panel }>
                    <Col md={ 10 } style={ style.comprobanteFields }>
                        <ComprobanteFields />
                    </Col>
                </Panel>
                <Col md={ 2 }>
                    <BotonesForm
                      searching={ apiLoading }
                      history={ history }
                    />
                </Col>
            </Row>
        </Form>
    );
}

const { func, object, bool } = PropTypes;

FilterComprobantes.propTypes = {
    buscarComprobante: func.isRequired,
    handleSubmit: func.isRequired,
    history: object.isRequired,
    apiLoading: bool.isRequired,
};

const FilterComprobantesForm =
    reduxForm({
        form: 'searchObraSocial',
        destroyOnUnmount: false,
        enableReinitialize: true,
    })(FilterComprobantes);

function mapStateToProps(state) {
    return {
        apiLoading: state.comprobantesReducer.comprobantesApiLoading,
    };
}

const mapDispatchToProps = dispatch => ({
    buscarComprobante: params =>
        dispatch({ type: FETCH_COMPROBANTES_FILTRO, params }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterComprobantesForm);
