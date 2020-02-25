/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import PropTypes, { bool } from 'prop-types';
import { Button, Row } from 'react-bootstrap';
import { FINALIZAR_PRESENTACION_OBRA_SOCIAL } from '../actionTypes';
import { ModalSuccess } from './Modals';
import initialState from '../estudiosSinPresentarReducerInitialState';

/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */

function initEditFormObject(props) {
    const {
        periodoValue,
        comprobanteState,
        estudiosSinPresentar,
        fecha,
        selectedObraSocial,
    } = props;
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
        obra_social_id: selectedObraSocial[0].id,
        periodo: periodoValue,
        fecha: fecha,
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

/* function initEditFormObject() {
    return {
        obra_social_id: 5,
        periodo: 'SEPTIEMBRE 2019',
        fecha: '2019-12-25',
        estado: 'Pendiente',

        estudios: [
            {
                id: 4,
                nro_de_orden: 'FE003450603',
                importe_estudio: 5,
                pension: 1,
                diferencia_paciente: 1,
                medicacion: 1,
                arancel_anestesia: 1,
            },
        ],
        comprobante: {
            tipo_id: 1,
            sub_tipo: 'B',
            responsable: 'Cedir',
            nro_terminal: 104,
            gravado_id: 1,
        },
    };
} */

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
    // const postObject = initEditFormObject();
    const [modalSuccess, setModalSuccess] = useState(false);
    const clickHandler = () => {
        finalizarPresentacion(postObject);
        setModalSuccess(true);
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
            <ModalSuccess
              show={ modalSuccess }
              onClickClose={ () => setModalSuccess(false) }
            />
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
