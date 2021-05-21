import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { FETCH_MEDICOS } from '../../../medico/actionTypes';
import CreateMovimientoForm from './CreateMovimientoForm';
import { getArray } from '../../../utilities/utilFunctions';

function CreateMovimientosForm({
    fetchMedicos,
    medicos,
    medicoApiLoading,
    setTotalGrilla,
    movimientos,
    fields,
    tiposMovimiento,
}) {
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

    const descripcionMovimientos = tiposMovimiento.map(movimiento => movimiento.text);

    useEffect(() => {
        if (fields.length === 0) {
            descripcionMovimientos.map(movimiento =>
                fields.push({ tipoMovimiento: movimiento }));
        }
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
                      tiposMovimientos={ descripcionMovimientos }
                      index={ movimiento }
                      key={ key }
                      idMovimiento={ key }
                      medico={ getArray(movimiento.medico) }
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
    tiposMovimiento: array.isRequired,
};

CreateMovimientosForm.defaultProps = {
    movimientos: [],
};

const selector = formValueSelector('CreateCajaFormRedux');

function mapStateToProps(state) {
    return {
        medicos: state.medicoReducer.medicos,
        medicoApiLoading: state.medicoReducer.medicoApiLoading,
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
