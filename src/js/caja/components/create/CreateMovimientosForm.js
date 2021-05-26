import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import CreateMovimientoForm from './CreateMovimientoForm';
import { getArray } from '../../../utilities/utilFunctions';

function CreateMovimientosForm({
    setTotalGrilla,
    movimientos,
    fields,
    tiposMovimiento,
}) {
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
                      medico={ getArray(movimientos[key].medico) }
                    />
                ))}
            </tbody>
        </Table>
    );
}

const { array, func, object } = PropTypes;

CreateMovimientosForm.propTypes = {
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
        movimientos: selector(state, 'movimientos'),
    };
}

export default
    connect(mapStateToProps)(CreateMovimientosForm);
