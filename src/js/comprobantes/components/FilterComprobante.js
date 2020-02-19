import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { Form, Button, Row, Col } from 'react-bootstrap/dist/react-bootstrap';
import PropTypes from 'prop-types';
import { FETCH_COMPROBANTES_FILTRO } from '../actionTypes';

function FilterComprobantes({ ejecutar_busqueda }) {
    const [searching, setSearching] = useState(false);

    const handleSave = (event) => {
        event.preventDefault();
        setSearching(true);
        ejecutar_busqueda(event.target.filtro.value, setSearching);
    };

    return (
        <Form
          inline
          onSubmit={ handleSave }
        >
            <Row className='search-grid'>
                <Col md={ 9 } style={ { border: 'none' } } >
                    <Field
                      name='filtro'
                      type='text'
                      placeholder='Buscar...'
                      align='left'
                      component='input'
                      className='form-control'
                    />
                </Col>
                <Col md={ 3 } style={ { border: 'none' } }>
                    <Button
                      type='submit'
                      bsStyle='primary'
                      disabled={ searching }
                    >
                        Buscar
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

FilterComprobantes.propTypes = {
    ejecutar_busqueda: PropTypes.func.isRequired,
};

const FilterComprobantesForm =
    reduxForm({
        form: 'searchObraSocial',
        destroyOnUnmount: false,
        enableReinitialize: true,
    })(FilterComprobantes);

const mapDispatchToProps = dispatch => ({
    ejecutar_busqueda: (filtro, setSearching) =>
        dispatch({ type: FETCH_COMPROBANTES_FILTRO, filtro, setSearching }),
});

export default connect(null, mapDispatchToProps)(FilterComprobantesForm);
