import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, reduxForm, FieldArray } from 'redux-form';
import { Button } from 'react-bootstrap';
import { nonEmpty } from '../../../utilities/reduxFormValidators';
import CreateMovimientosForm from './CreateMovimientosForm';
import { CREATE_MOVIMIENTOS_CAJA } from '../../actionTypes';

function CreateCajaForm({ createMovimiento, handleSubmit, history }) {
    const [valid, setValid] = useState(false);
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
            <FieldArray
              name='movimientos'
              component={ CreateMovimientosForm }
              validate={ nonEmpty }
              valid={ valid }
              setValid={ setValid }
            />
            <Button type='submit' bsStyle='primary' disabled={ !valid }>
                    Crear Movimientos
            </Button>
            <Button
              bsStyle='primary'
              onClick={ selectEstudio }
            >
                    Crear Movimientos Asociados
            </Button>
        </Form>
    );
}

const { func, object } = PropTypes;

CreateCajaForm.propTypes = {
    createMovimiento: func.isRequired,
    handleSubmit: func.isRequired,
    history: object.isRequired,
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
