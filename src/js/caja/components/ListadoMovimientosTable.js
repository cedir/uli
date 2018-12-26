import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Table }
    from 'react-bootstrap/dist/react-bootstrap';

import ListadoMovimientosTableRow from './ListadoMovimientosTableRow';
import { FETCH_MOVIMIENTOS_CAJA } from '../actionTypes';
import './ListadoMovimientosTable.css';

class ListadoMovimientosTable extends Component {
    componentDidMount() {
        this.props.fetchMovimientosCaja();
    }

    render() {
        return (
            <div className='listado-movimientos'>
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th>Fecha Movimiento</th>
                            <th>Usuario</th>
                            <th>Tipo Movimiento</th>
                            <th>Estado</th>
                            <th>Descripcion Movimiento</th>
                            <th>Monto</th>
                            <th>Monto acumulado</th>
                            <th>Fecha estudio</th>
                            <th>Obra social</th>
                            <th>Practica</th>
                            <th>Paciente</th>
                            <th>Medico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.movimientos.map(movimiento =>
                                (
                                    <ListadoMovimientosTableRow
                                      key={ movimiento.id }
                                      movimiento={ movimiento }
                                    />
                                ))
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

const { array, func } = propTypes;

ListadoMovimientosTable.propTypes = {
    movimientos: array.isRequired,
    fetchMovimientosCaja: func.isRequired,
};

function mapStateToProps(state) {
    return {
        movimientos: state.cajaReducer.movimientos,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMovimientosCaja: () =>
            dispatch({ type: FETCH_MOVIMIENTOS_CAJA }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListadoMovimientosTable);
