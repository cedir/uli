import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, reduxForm, FieldArray, destroy } from 'redux-form';
import CreateMovimientosForm from './CreateMovimientosForm';
import { CREATE_MOVIMIENTOS_CAJA, ASOCIAR_ESTUDIO } from '../../actionTypes';
import HeaderCreateMovimientoCaja from './HeaderCreateMovimientoCaja';
import { tiposMovimiento } from '../../../utilities/generalUtilities';

function CreateCajaForm({
    createMovimiento,
    handleSubmit,
    history,
    estudioAsociado,
    asociarEstudio,
    destruirForm,
    montoTotal,
}) {
    const fromCajaLocation = {
        pathname: '/estudios',
        state: { fromCaja: true },
    };
    const goBack = () => history.push('/caja/main');
    const [totalGrilla, setTotalGrilla] = useState(0.00);

    const selectEstudio = () => history.push(fromCajaLocation);

    const enviarFormulario = movimientos => createMovimiento({
        estudioAsociado,
        movimientos: movimientos.filter(movimiento => (movimiento.monto)).map(movimiento => ({
            ...movimiento,
            tipoMovimiento: tiposMovimiento.find(tipo =>
                tipo.text === movimiento.tipoMovimiento),
            medico: movimiento.medico ? movimiento.medico[0] : '',
        })),
    }, goBack, destruirForm);

    return (
        <Form
          onSubmit={ handleSubmit((movimientos) => {
              enviarFormulario(movimientos.movimientos);
          }) }
        >
            <HeaderCreateMovimientoCaja
              selectEstudio={ selectEstudio }
              asociarEstudio={ asociarEstudio }
              estudioAsociado={ estudioAsociado }
              montoAcumulado={ montoTotal }
              totalGrilla={ totalGrilla }
            />
            <FieldArray
              name='movimientos'
              component={ CreateMovimientosForm }
              setTotalGrilla={ setTotalGrilla }
              tiposMovimiento={ tiposMovimiento }
            />
        </Form>
    );
}

const { func, object, string } = PropTypes;

CreateCajaForm.propTypes = {
    createMovimiento: func.isRequired,
    handleSubmit: func.isRequired,
    history: object.isRequired,
    estudioAsociado: object.isRequired,
    asociarEstudio: func.isRequired,
    destruirForm: func.isRequired,
    montoTotal: string.isRequired,
};

const CreateCajaFormRedux = reduxForm({
    form: 'CreateCajaFormRedux',
    destroyOnUnmount: false,
    enableReinitialize: false,
})(CreateCajaForm);

function mapStateToProps(state) {
    return {
        estudioAsociado: state.cajaReducer.estudioAsociado,
        montoTotal: state.cajaReducer.montoTotal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createMovimiento: (movimientos, goBack, destruirForm) =>
            dispatch({ type: CREATE_MOVIMIENTOS_CAJA, movimientos, goBack, destruirForm }),
        asociarEstudio: estudio => dispatch({ type: ASOCIAR_ESTUDIO, estudio }),
        destruirForm: () => dispatch(destroy('CreateCajaFormRedux')),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCajaFormRedux);
