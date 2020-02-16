import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes, { bool } from 'prop-types';
import { Button, Row } from 'react-bootstrap';
import { FINALIZAR_PRESENTACION_OBRA_SOCIAL } from '../actionTypes';
import initialState from '../estudiosSinPresentarReducerInitialState';

/* eslint-disable arrow-body-style */

function initEditFormObject(props) {
    const { periodoValue, comprobanteState, estudiosSinPresentar } = props;
    const [estudiosApi, setEstudios] = useState(estudiosSinPresentar);
    const [tipoId, setTipoId] = useState(null);
    const [gravadoId, setGravadoId] = useState(null);
    const [nroTerminal, setNroTerminal] = useState(null);
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
        if (comprobanteState.tipo === 'Factura Electronica') {
            setTipoId(1);
        } else if (comprobanteState.tipo === 'Liquidacion') {
            setTipoId(2);
        } else if (comprobanteState.tipo === 'Recibo') {
            setTipoId(3);
        }
        if (comprobanteState.gravado === '0.00') {
            setGravadoId(1);
        } else if (comprobanteState.gravado === '10.50') {
            setGravadoId(2);
        } else if (comprobanteState.gravado === '21.00') {
            setGravadoId(3);
        }
        if (comprobanteState.responsable === 'Cedir') {
            setNroTerminal(91);
        } else if (comprobanteState.responsable === 'Brunetti') {
            setNroTerminal(2);
        }
    }, [comprobanteState]);

    useEffect(() => {
        setEstudios(estudiosSinPresentar);
    }, [estudiosSinPresentar]);

    return {
        obra_social_id: 1,
        periodo: periodoValue,
        fecha: '2019-12-26',
        estado: 'Pendiente',
        estudios: estudiosApi.map(filterKeys),
        comprobante: {
            tipo_id: tipoId,
            sub_tipo: comprobanteState.subTipo,
            responsable: comprobanteState.responsable,
            nro_terminal: nroTerminal,
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
    } = props;
    const postObject = initEditFormObject({
        periodoValue,
        comprobanteState,
        estudiosSinPresentar,
    });
    console.log(postObject);
    const clickHandler = () => {
        finalizarPresentacion(postObject);
    };
    return (
        <form>
            <div className='box'>
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
            </div>
        </form>
    );
}

const { array, string, func, object } = PropTypes;

FinalizarGuardarForm.propTypes = {
    estudiosSinPresentar: array.isRequired,
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

function mapStateToProps(state) {
    return {
        estudiosSinPresentar: state.estudiosSinPresentarReducer.estudiosSinPresentar,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        finalizarPresentacion: presentacion =>
            dispatch({ type: FINALIZAR_PRESENTACION_OBRA_SOCIAL, presentacion }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FinalizarGuardarForm);
