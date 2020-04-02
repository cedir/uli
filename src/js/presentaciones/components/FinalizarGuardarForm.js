import React, { useState, useEffect } from 'react';
import PropTypes, { bool } from 'prop-types';
import { Button, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

function initEditFormObject(props) {
    const {
        periodoValue,
        comprobanteState,
        estudios,
        fecha,
        idObraSocial,
    } = props;
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
        if (comprobanteState.gravado === '0.00') {
            setGravadoId(1);
        } else if (comprobanteState.gravado === '10.50') {
            setGravadoId(2);
        } else if (comprobanteState.gravado === '21.00') {
            setGravadoId(3);
        }
    }, [comprobanteState.gravado]);

    return {
        obra_social_id: idObraSocial,
        periodo: periodoValue,
        fecha,
        estado: 'Pendiente',
        estudios: estudios.map(filterKeys),
    };
}

function FinalizarGuardarForm(props) {
    const {
        periodoValue,
        onChangePeriodoValue,
        crearOActualizarPresentacion,
        comprobanteState,
        finalizarButtonDisabled,
        guardarButtonDisabled,
        estudios,
        idObraSocial,
        fecha,
        history,
    } = props;

    const postObject = initEditFormObject({
        periodoValue,
        comprobanteState,
        estudios,
        fecha,
        idObraSocial,
    });

    const guardarClickHandler = () => {
        crearOActualizarPresentacion(postObject);
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
                >
                    Finalizar
                </Button>
                <Button
                  bsStyle='primary'
                  disabled={ guardarButtonDisabled }
                  onClick={ guardarClickHandler }
                >
                    Guardar
                </Button>
            </Row>
        </form>
    );
}

const { number, array, string, func, object } = PropTypes;

FinalizarGuardarForm.propTypes = {
    estudios: array.isRequired,
    fecha: string.isRequired,
    idObraSocial: number.isRequired,
    periodoValue: string.isRequired,
    onChangePeriodoValue: func.isRequired,
    comprobanteState: object.isRequired,
    finalizarButtonDisabled: bool.isRequired,
    guardarButtonDisabled: bool.isRequired,
    crearOActualizarPresentacion: func.isRequired,
    history: object.isRequired,
};


export default withRouter(FinalizarGuardarForm);
