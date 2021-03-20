import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { FETCH_MEDICOS } from '../../../medico/actionTypes';
import CreateMovimientoForm from './CreateMovimientoForm';

function CreateMovimientosForm({
    fetchMedicos,
    medicos,
    medicoApiLoading,
    setTotalGrilla,
    movimientos,
    fields,
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

    const renderMedicoMenuItem = option => (
        <div key={ option.id }>
            { `${option.apellido}, ${option.nombre}` }
        </div>
    );

    const medicosTypeaheadRenderFunc = (option) => {
        if (!option.nombre || !option.apellido) {
            return '-';
        }

        return `${option.apellido}, ${option.nombre}`;
    };

    const searchMedicos = (nombre) => {
        fetchMedicos({ searchText: nombre });
    };

    useEffect(() => {
        tiposMovimiento.map(movimiento =>
            fields.push({ tipoMovimiento: movimiento }));
    }, []);

    useEffect(() => {
        setTotalGrilla(
            movimientos.map(movimiento => Number(movimiento.monto || 0))
            .reduce((importeTotal, importe) => importeTotal + importe, 0));
    });

    return (
        <Table striped condensed hover responsive style={ { marginTop: '20px' } } >
            <thead>
                <tr>
                    <th>Médico</th>
                    <th>Concepto</th>
                    <th>Tipo de Mov.</th>
                    <th style={ { width: '15%' } } >Monto</th>
                </tr>
            </thead>
            <tbody>
                {fields.map((movimiento, key) => (
                    <CreateMovimientoForm
                      tiposMovimientos={ tiposMovimiento }
                      index={ movimiento }
                      key={ key }
                      opcionesMedicos={ medicos }
                      isLoading={ medicoApiLoading }
                      renderMenu={ renderMedicoMenuItem }
                      onSearch={ searchMedicos }
                      labelKey={ medicosTypeaheadRenderFunc }
                    />
                ))}
            </tbody>
        </Table>
    );
}

const { array, func, bool, object } = PropTypes;

CreateMovimientosForm.propTypes = {
    fetchMedicos: func.isRequired,
    medicos: array.isRequired,
    medicoApiLoading: bool.isRequired,
    setTotalGrilla: func.isRequired,
    movimientos: array.isRequired,
    fields: object,
};

CreateMovimientosForm.defaultProps = {
    movimientos: [],
};

const selector = formValueSelector('CreateCajaFormRedux');

function mapStateToProps(state) {
    let medico = selector(state, 'medico');
    medico = (medico && Array.isArray(medico))
        ? medico
        : [];
    return {
        medicos: state.medicoReducer.medicos,
        medicoApiLoading: state.medicoReducer.medicoApiLoading,
        selectedMedico: medico,
        movimientos: selector(state, 'movimientos'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMedicos: searchParam =>
            dispatch({ type: FETCH_MEDICOS, searchParam }),
    };
}

export default
    connect(mapStateToProps, mapDispatchToProps)(CreateMovimientosForm);
