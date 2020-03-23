import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import PropTypes, { bool } from 'prop-types';
import { Button, Row } from 'react-bootstrap';
import { FINALIZAR_PRESENTACION_OBRA_SOCIAL } from '../nueva-presentacion/actionTypes';
import initialState from '../nueva-presentacion/estudiosSinPresentarReducerInitialState';

function initEditFormObject(props) {
    const {
        periodoValue,
        comprobanteState,
        estudiosSinPresentar,
        fecha,
        selectedObraSocial,
    } = props;
    const [estudios, setEstudios] = useState(estudiosSinPresentar);
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
        obra_social_id: selectedObraSocial[0].id,
        periodo: periodoValue,
        /* eslint-disable object-shorthand */
        fecha: fecha,
        estado: 'Pendiente',
        estudios: estudios.map(filterKeys),
        comprobante: {
            tipo_id: comprobanteState.tipo,
            sub_tipo: comprobanteState.subTipo,
            responsable: comprobanteState.responsable,
            nro_terminal: comprobanteState.responsable === 'Cedir' ? 91 : 2,
            gravado_id: gravadoId,
        },
    };
}

function FinalizarGuardarForm(props) {
    const {
        periodoValue,
        onChangePeriodoValue,
        finalizarPresentacion,
        comprobanteState,
        finalizarButtonDisabled,
        guardarButtonDisabled,
        estudiosSinPresentar,
        fecha,
        selectedObraSocial,
    } = props;

    const postObject = initEditFormObject({
        periodoValue,
        comprobanteState,
        estudiosSinPresentar,
        fecha,
        selectedObraSocial,
    });

    const clickHandler = () => {
        finalizarPresentacion(postObject);
    };

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
                  onClick={ clickHandler }
                  disabled={ finalizarButtonDisabled }
                >
                    Finalizar
                </Button>
                <Button
                  bsStyle='primary'
                  disabled={ guardarButtonDisabled }
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
    selectedObraSocial: array.isRequired,
    periodoValue: string.isRequired,
    onChangePeriodoValue: func.isRequired,
    finalizarPresentacion: func.isRequired,
    comprobanteState: object.isRequired,
    finalizarButtonDisabled: bool.isRequired,
    guardarButtonDisabled: bool.isRequired,
};

FinalizarGuardarForm.defaultProps = {
    estudiosSinPresentar: initialState.estudiosSinPresentar,
};

const selector = formValueSelector('searchPresentacionesObraSocial');

function mapStateToProps(state) {
    let obraSocial = selector(state, 'obraSocial');
    obraSocial = (obraSocial && Array.isArray(obraSocial))
        ? obraSocial
        : [];
    return {
        estudiosSinPresentar: state.estudiosSinPresentarReducer.estudiosSinPresentar,
        fecha: state.estudiosSinPresentarReducer.fecha,
        selectedObraSocial: obraSocial,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        finalizarPresentacion: presentacion =>
            dispatch({ type: FINALIZAR_PRESENTACION_OBRA_SOCIAL, presentacion }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FinalizarGuardarForm);
