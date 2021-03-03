import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, reduxForm, FieldArray } from 'redux-form';
import { Button, Panel } from 'react-bootstrap';
import { nonEmpty } from '../../../utilities/reduxFormValidators';
import CreateMovimientosForm from './CreateMovimientosForm';
import { CREATE_MOVIMIENTOS_CAJA } from '../../actionTypes';

function CreateCajaForm({ createMovimiento, handleSubmit, valid }) {
    return (
        <Form
          onSubmit={ handleSubmit(movimientos =>
            createMovimiento({
                movimientos,
            }),
          ) }
        >
            <h1> Crear Movimiento de Caja </h1>
            <Panel header='Movimientos' collapsible defaultExpanded>
                <FieldArray
                  name='movimientos'
                  component={ CreateMovimientosForm }
                  validate={ nonEmpty }
                />
            </Panel>
            <Button type='submit' bsStyle='primary' disabled={ !valid }>
                    Crear Movimientos
            </Button>
        </Form>
    );
}

const { func, bool } = PropTypes;

CreateCajaForm.propTypes = {
    createMovimiento: func.isRequired,
    valid: bool.isRequired,
    handleSubmit: func.isRequired,
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
