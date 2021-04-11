import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, reduxForm, FieldArray } from 'redux-form';
import CreateMovimientosForm from './CreateMovimientosForm';
import { CREATE_MOVIMIENTOS_CAJA, ASOCIAR_ESTUDIO } from '../../actionTypes';
import HeaderCreateMovimientoCaja from './HeaderCreateMovimientoCaja';

function CreateCajaForm({
    createMovimiento,
    handleSubmit,
    history,
    valid,
    estudioAsociado,
    asociarEstudio,
    location,
}) {
    const fromCajaLocation = {
        pathname: '/estudios',
        state: { fromCaja: true },
    };

    const montoAcumulado = location.state.montoAcumulado;

    const [totalGrilla, setTotalGrilla] = useState(0.00);

    const selectEstudio = () => history.push(fromCajaLocation);

    const tiposMovimiento = [
        { text: 'General', value: 1 },
        { text: 'Honorario Médico', value: 2 },
        { text: 'Honorario Anestesista', value: 3 },
        { text: 'Medicación', value: 4 },
        { text: 'Práctica', value: 5 },
        { text: 'Descartable', value: 6 },
        { text: 'Material Específico', value: 7 },
        { text: 'Pago a Médico', value: 8 },
        { text: 'Consultorio 1', value: 9 },
        { text: 'Coseguro', value: 10 },
        { text: 'Egreso', value: 11 },
        { text: 'Consultorio 2', value: 12 },
    ];

    const enviarFormulario = movimientos => createMovimiento({
        estudioAsociado,
        movimientos: movimientos.filter(movimiento => (movimiento.monto)).map(movimiento => ({
            ...movimiento,
            tipoMovimiento: tiposMovimiento.find(tipo =>
                tipo.text === movimiento.tipoMovimiento),
            medico: movimiento.medico ? movimiento.medico[0] : '',
        })),
    });

    return (
        <Form
          onSubmit={ handleSubmit((movimientos) => {
              enviarFormulario(movimientos.movimientos);
          }) }
        >
            <HeaderCreateMovimientoCaja
              selectEstudio={ selectEstudio }
              valid={ valid }
              asociarEstudio={ asociarEstudio }
              estudioAsociado={ estudioAsociado }
              montoAcumulado={ montoAcumulado }
              totalGrilla={ totalGrilla }
              goBack={ history.goBack }
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

const { func, object, bool } = PropTypes;

CreateCajaForm.propTypes = {
    createMovimiento: func.isRequired,
    handleSubmit: func.isRequired,
    history: object.isRequired,
    valid: bool.isRequired,
    estudioAsociado: object.isRequired,
    asociarEstudio: func.isRequired,
    location: object.isRequired,
};

const CreateCajaFormRedux = reduxForm({
    form: 'CreateCajaFormRedux',
    destroyOnUnmount: false,
    enableReinitialize: true,
})(CreateCajaForm);

function mapStateToProps(state) {
    return {
        estudioAsociado: state.cajaReducer.estudioAsociado,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createMovimiento: movimientos => dispatch({ type: CREATE_MOVIMIENTOS_CAJA, movimientos }),
        asociarEstudio: estudio => dispatch({ type: ASOCIAR_ESTUDIO, estudio }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCajaFormRedux);
