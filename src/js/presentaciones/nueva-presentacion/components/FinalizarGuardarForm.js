import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Row } from 'react-bootstrap';
import { FINALIZAR_PRESENTACION_OBRA_SOCIAL } from '../actionTypes';

function initEditFormObject() {
    return {
        obra_social_id: 5,
        periodo: 'SEPTIEMBRE 2019',
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
            tipo_id: 2,
        },
    };
}

function FinalizarGuardarForm(props) {
    const {
        periodoValue,
        onChangePeriodoValue,
        finalizarPresentacion,
    } = props;
    const postObject = initEditFormObject();
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
                    >
                        Finalizar
                    </Button>
                    <Button
                      bsStyle='primary'
                    >
                        Guardar
                    </Button>
                </Row>
            </div>
        </form>
    );
}

const { string, func } = PropTypes;

FinalizarGuardarForm.propTypes = {
    periodoValue: string.isRequired,
    onChangePeriodoValue: func.isRequired,
    finalizarPresentacion: func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        finalizarPresentacion: presentacion =>
            dispatch({ type: FINALIZAR_PRESENTACION_OBRA_SOCIAL, presentacion }),
    };
}

export default connect(null, mapDispatchToProps)(FinalizarGuardarForm);
