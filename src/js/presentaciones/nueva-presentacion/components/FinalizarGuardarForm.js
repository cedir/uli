import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes, { bool } from 'prop-types';
import { Button, Row } from 'react-bootstrap';
import { FINALIZAR_PRESENTACION_OBRA_SOCIAL } from '../actionTypes';

function initEditFormObject(props) {
    const { periodoValue, comprobanteState } = props;
    const [tipoId, setTipoId] = useState(null);
    const [gravadoId, setGravadoId] = useState(null);
    const [nroTerminal, setNroTerminal] = useState(null);
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
    return {
        obra_social_id: 5,
        periodo: periodoValue,
        fecha: '2019-12-26',
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
    } = props;
    const postObject = initEditFormObject({ periodoValue, comprobanteState });
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

const { string, func, object } = PropTypes;

FinalizarGuardarForm.propTypes = {
    periodoValue: string.isRequired,
    onChangePeriodoValue: func.isRequired,
    finalizarPresentacion: func.isRequired,
    comprobanteState: object.isRequired,
    finalizarButtonDisabled: bool.isRequired,
    guardarButtonDisabled: bool.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        finalizarPresentacion: presentacion =>
            dispatch({ type: FINALIZAR_PRESENTACION_OBRA_SOCIAL, presentacion }),
    };
}

export default connect(null, mapDispatchToProps)(FinalizarGuardarForm);
