import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes, { bool } from 'prop-types';
import { Button, Row } from 'react-bootstrap';
import { CREAR_NUEVA_PRESENTACION_OBRA_SOCIAL } from '../nueva-presentacion/actionTypes';
import initialState from '../nueva-presentacion/estudiosSinPresentarReducerInitialState';

function initEditFormObject(props) {
    const {
        periodoValue,
        comprobanteState,
        estudiosSinPresentar,
        fecha,
        obraSocial,
    } = props;
    const [estudios, setEstudios] = useState(estudiosSinPresentar);
    /* eslint-disable no-unused-vars */
    const [gravadoId, setGravadoId] = useState(null);

    const filterKeys = ({
        id,
        nro_de_orden,
        importe_estudio,
        pension,
        diferencia_paciente,
        medicacion,
        arancel_anestesia,
    }) => ({
        id,
        nro_de_orden,
        importe_estudio,
        pension,
        diferencia_paciente,
        medicacion,
        arancel_anestesia,
    });

    useEffect(() => {
        setEstudios(estudios);
    }, [estudiosSinPresentar]);

    useEffect(() => {
        if (comprobanteState.gravado === '0.00') {
            setGravadoId(1);
        } else if (comprobanteState.gravado === '10.50') {
            setGravadoId(2);
        } else if (comprobanteState.gravado === '21.00') {
            setGravadoId(3);
        }
    }, [comprobanteState.gravado]);

    return {
        obra_social_id: obraSocial.id,
        periodo: periodoValue,
        /* eslint-disable object-shorthand */
        fecha: fecha,
        estado: 'Pendiente',
        estudios: estudios.map(filterKeys),
    };
}

function FinalizarGuardarForm(props) {
    const {
        periodoValue,
        onChangePeriodoValue,
        crearNuevaPresentacion,
        comprobanteState,
        finalizarButtonDisabled,
        guardarButtonDisabled,
        estudiosSinPresentar,
        fecha,
        obraSocial,
    } = props;

    const postObject = initEditFormObject({
        periodoValue,
        comprobanteState,
        estudiosSinPresentar,
        fecha,
        obraSocial,
    });

    return (
        <form>
            <Row>
                <strong>Periodo de la presentacion:</strong>
            </Row>
            <Row>
                <input
                  type='text'
                  name='periodo'
                  value={ periodoValue }
                  onChange={ onChangePeriodoValue }
                />
            </Row>
            <Row>
                <Button
                  bsStyle='primary'
                  disabled={ finalizarButtonDisabled }
                >
                    Finalizar
                </Button>
                <Button
                  bsStyle='primary'
                  disabled={ guardarButtonDisabled }
                  onClick={ () => crearNuevaPresentacion(postObject) }
                >
                    Guardar
                </Button>
            </Row>
        </form>
    );
}

const { array, string, func, object } = PropTypes;

FinalizarGuardarForm.propTypes = {
    estudiosSinPresentar: array.isRequired,
    fecha: string.isRequired,
    obraSocial: object.isRequired,
    periodoValue: string.isRequired,
    onChangePeriodoValue: func.isRequired,
    crearNuevaPresentacion: func.isRequired,
    comprobanteState: object.isRequired,
    finalizarButtonDisabled: bool.isRequired,
    guardarButtonDisabled: bool.isRequired,
};

FinalizarGuardarForm.defaultProps = {
    estudiosSinPresentar: initialState.estudiosSinPresentar,
    obraSocial: initialState.obraSocial,
};

function mapStateToProps(state) {
    return {
        estudiosSinPresentar: state.estudiosSinPresentarReducer.estudiosSinPresentar,
        obraSocial: state.estudiosSinPresentarReducer.obraSocial,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        crearNuevaPresentacion: presentacion =>
            dispatch({ type: CREAR_NUEVA_PRESENTACION_OBRA_SOCIAL, presentacion }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FinalizarGuardarForm);
