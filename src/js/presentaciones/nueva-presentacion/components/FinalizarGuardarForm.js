import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Row } from 'react-bootstrap';
import { FINALIZAR_NUEVA_PRESENTACION } from '../actionTypes';

/* eslint-disable no-console */

function FinalizarGuardarForm(props) {
    const {
        periodoValue,
        onChangePeriodoValue,
        finalizar_nueva_presentacion,
    } = props;

    const [saving, setSaving] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        setSaving(true);
        finalizar_nueva_presentacion(
            e.target.periodo.value,
        );
    };

    console.log(saving);

    return (
        <form onSubmit={ handleSave }>
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
                      type='submit'
                    >
                        Finalizar
                    </Button>
                    <Button
                      bsStyle='primary'
                      type='submit'
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
    finalizar_nueva_presentacion: func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        finalizar_nueva_presentacion: (
            idObraSocial,
            periodo,
            fecha,
            estado,
            estudios,
            comprobante,
        ) =>
            dispatch({
                type: FINALIZAR_NUEVA_PRESENTACION,
                idObraSocial,
                periodo,
                fecha,
                estado,
                estudios,
                comprobante,
            }),
    };
}

export default connect(null, mapDispatchToProps)(FinalizarGuardarForm);
