import React from 'react';
import PropTypes, { bool } from 'prop-types';
import { formValueSelector } from 'redux-form';
import { connect, change } from 'react-redux';
import { FETCH_MEDICOS } from '../../../medico/actionTypes';
import CreateMovimientoForm from './CreateMovimientoForm';

function CreateMovimientosForm({
    fetchMedicos,
    medicos,
    selectedMedico,
    medicoApiLoading,
    setSelectedMedico,
    valid,
    setValid,
}) {
    const tiposMovimiento = [
        'General',
        'Honorario Médico',
        'Honorario Anestesista',
        'Medicación',
        'Práctica',
        'Descartable',
        'Material Específico',
        'Pago a Médico',
        'Consultorio 1',
        'Coseguro',
        'Egreso',
        'Consultorio 2',
    ];

    const setSelectedMedicoNew = (selection) => {
        if (selection[0] && selection[0].id) {
            setSelectedMedico(selection[0]);
        }
    };

    const renderMedicoMenuItem = option => (
        <div style={ { width: '100%' } } key={ option.id }>
            { `${option.apellido}, ${option.nombre}` }
        </div>
    );

    const searchMedicos = (nombre) => {
        fetchMedicos({ searchText: nombre });
    };

    // medicosTypeaheadRenderFunc(option) {
    //     if (!option.nombre || !option.apellido) {
    //         return '';
    //     }

    //     return `${option.apellido}, ${option.nombre}`;
    // }

    return (
        <React.Fragment>
            {tiposMovimiento.map((movimiento, index) => (
                <CreateMovimientoForm
                  tiposMovimientos={ tiposMovimiento }
                  index={ index }
                  movimiento={ movimiento }
                  opcionesMedicos={ medicos }
                  selectedMedico={ selectedMedico }
                  onChange={ setSelectedMedicoNew }
                  isLoading={ medicoApiLoading }
                  render={ renderMedicoMenuItem }
                  onSearch={ searchMedicos }
                  valid={ valid }
                  setValid={ setValid }
                />
            ))}
        </React.Fragment>
    );
}

const { array, func } = PropTypes;

CreateMovimientosForm.propTypes = {
    fetchMedicos: func.isRequired,
    medicos: array.isRequired,
    selectedMedico: array.isRequired,
    medicoApiLoading: bool.isRequired,
    setSelectedMedico: func.isRequired,
    valid: bool,
    setValid: func,
};

const selector = formValueSelector('CreateCajaFormRedux');

function mapStateToProps(state) {
    let medico = selector(state, 'medico');
    medico = (medico && Array.isArray(medico))
        ? medico
        : [];
    return {
        medicos: state.medicoReducer.medicos,
        medicoApiLoading: state.medicoReducer.medicoApiLoading || false,
        selectedMedico: medico,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMedicos: searchParam =>
            dispatch({ type: FETCH_MEDICOS, searchParam }),
        setSelectedMedico: medico =>
            dispatch(change('CreateMovimientosForm', 'medico', medico)),
    };
}

export default
    connect(mapStateToProps, mapDispatchToProps)(CreateMovimientosForm);
