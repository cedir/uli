import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, reduxForm, FieldArray } from 'redux-form';
import { Button, ButtonToolbar } from 'react-bootstrap';
import CreateMovimientosForm from './CreateMovimientosForm';
import { CREATE_MOVIMIENTOS_CAJA } from '../../actionTypes';

function CreateCajaForm({ createMovimiento, handleSubmit, history, valid }) {
    const location = {
        pathname: '/estudios',
        state: { fromCaja: true },
    };
    const selectEstudio = () => history.push(location);

    return (
        <Form
          onSubmit={ handleSubmit(movimientos =>
            createMovimiento({
                movimientos,
            }),
          ) }
        >
            <h1> Crear Movimiento de Caja </h1>
            <ButtonToolbar style={ { marginTop: '20px' } }>
                <Button type='submit' bsStyle='primary' disabled={ !valid }>
                        Crear Movimientos
                </Button>
                <Button
                  bsStyle='primary'
                  onClick={ selectEstudio }
                >
                        Asociar con Estudio
                </Button>
            </ButtonToolbar>
            <FieldArray
              name='movimientos'
              component={ CreateMovimientosForm }
            />
        </Form>
    );
}

const { func, object, bool } = PropTypes;

CreateCajaForm.propTypes = {
    createMovimiento: func.isRequired,
    handleSubmit: func.isRequired,
    history: object.isRequired,
    valid: bool.isRequired,
};

const CreateCajaFormRedux = reduxForm({
    form: 'CreateCajaFormRedux',
})(CreateCajaForm);

function mapDispatchToProps(dispatch) {
    return {
        createMovimiento: movimientos => dispatch({ type: CREATE_MOVIMIENTOS_CAJA, movimientos }),
    };
}

export default connect(mapDispatchToProps)(CreateCajaFormRedux);
