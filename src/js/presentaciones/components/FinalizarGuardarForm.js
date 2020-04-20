import React, { useState, useEffect } from 'react';
import PropTypes, { bool } from 'prop-types';
import { Button, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

/* eslint-disable no-unused-vars */
function presentacionObject(props) {
    const {
        periodoValue,
        estudios,
        fecha,
        id: newId,
        updatePresentacion,
    } = props;

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
    /* eslint-disable no-else-return */
    if (!updatePresentacion && newId) {
        return {
            obra_social_id: newId,
            periodo: periodoValue,
            fecha,
            estado: 'Abierto',
            estudios: estudios.map(filterKeys),
        };
    } else {
        return {
            periodo: periodoValue,
            fecha,
            estado: 'Abierto',
            estudios: estudios.map(filterKeys),
        };
    }
}

function comprobanteObject(props) {
    const { comprobanteState } = props;
    const [gravadoId, setGravadoId] = useState(null);
    useEffect(() => {
        const { gravado } = comprobanteState;
        switch (gravado) {
            case '0.00':
                setGravadoId(1);
                break;
            case '10.50':
                setGravadoId(2);
                break;
            case '21.00':
                setGravadoId(3);
                break;
            default:
                break;
        }
    }, [comprobanteState.gravado]);

    return {
        tipo_id: parseInt(comprobanteState.tipo, 10),
        nro_terminal: 99,
        sub_tipo: comprobanteState.subTipo,
        responsable: comprobanteState.responsable,
        gravado_id: gravadoId,
    };
}

function FinalizarGuardarForm(props) {
    const {
        periodoValue,
        onChangePeriodoValue,
        id,
        crearPresentacion,
        updatePresentacion,
        cerrarPresentacion,
        comprobanteState,
        finalizarButtonDisabled,
        guardarButtonDisabled,
        estudios,
        fecha,
        history,
    } = props;

    const postObject = presentacionObject({
        periodoValue,
        estudios,
        fecha,
        comprobanteState,
        id,
        updatePresentacion,
    });

    const comprobante = comprobanteObject({
        comprobanteState,
    });

    const finalizarClickHandler = () => {
        if (crearPresentacion !== undefined) {
            crearPresentacion(postObject);
        }
        if (updatePresentacion !== undefined) {
            updatePresentacion(postObject, id);
        }
        cerrarPresentacion(comprobante, id);
        setTimeout(() => {
            history.push('/presentaciones-obras-sociales');
        }, 1500);
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
                  disabled={ finalizarButtonDisabled }
                  onClick={ finalizarClickHandler }
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

const { array, string, func, object, number } = PropTypes;

FinalizarGuardarForm.propTypes = {
    estudios: array.isRequired,
    fecha: string.isRequired,
    periodoValue: string.isRequired,
    onChangePeriodoValue: func.isRequired,
    comprobanteState: object.isRequired,
    finalizarButtonDisabled: bool.isRequired,
    guardarButtonDisabled: bool.isRequired,
    id: number.isRequired,
    crearPresentacion: func,
    updatePresentacion: func,
    cerrarPresentacion: func.isRequired,
    history: object.isRequired,
};


export default withRouter(FinalizarGuardarForm);
