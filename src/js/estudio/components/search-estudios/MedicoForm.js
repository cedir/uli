import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { Field } from 'redux-form';
import AsyncTypeaheadRF from '../../../utilities/AsyncTypeaheadRF';

function MedicoForm({
    medicosSolicitantes,
    medicosActuantes,
    solicitante,
    actuante,
    buscarMedicos,
    fetchSolicitantes,
    fetchActuantes,
    apiLoading,
}) {
    const renderFunc = (option) => {
        if (!option.nombre || !option.apellido) {
            return '';
        }

        return `${option.apellido}, ${option.nombre}`;
    };

    const renderItem = option => (
        <div style={ { width: '100%' } } key={ option.id }>
            { `${option.apellido}, ${option.nombre}` }
        </div>
    );

    return (
        <React.Fragment>
            <Col md={ 6 }>
                <fieldset>
                    <legend>Medico Solicitante</legend>
                    <Field
                      name='medicoSolicitante'
                      label='Nombe/Apellido'
                      component={ AsyncTypeaheadRF }
                      options={ medicosSolicitantes }
                      labelKey={ renderFunc }
                      onSearch={ text => buscarMedicos(solicitante.id, text, fetchSolicitantes) }
                      selected={ solicitante }
                      renderMenuItemChildren={ renderItem }
                      isLoading={ apiLoading }
                    />
                </fieldset>
            </Col>
            <Col md={ 6 }>
                <fieldset>
                    <legend>Medico Actuante</legend>
                    <Field
                      name='medicoActuante'
                      label='Nombe/Apellido'
                      component={ AsyncTypeaheadRF }
                      options={ medicosActuantes }
                      labelKey={ renderFunc }
                      onSearch={ text => buscarMedicos(actuante.id, text, fetchActuantes) }
                      selected={ actuante }
                      renderMenuItemChildren={ renderItem }
                      isLoading={ apiLoading }
                    />
                </fieldset>
            </Col>
        </React.Fragment>
    );
}

const { array, func, bool } = PropTypes;

MedicoForm.propTypes = {
    medicosSolicitantes: array.isRequired,
    medicosActuantes: array.isRequired,
    solicitante: array.isRequired,
    actuante: array.isRequired,
    buscarMedicos: func.isRequired,
    fetchSolicitantes: func.isRequired,
    fetchActuantes: func.isRequired,
    apiLoading: bool.isRequired,
};

export default MedicoForm;
