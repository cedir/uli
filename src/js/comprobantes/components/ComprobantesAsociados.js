import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap/dist/react-bootstrap';

import ComprobanteRow from './ComprobanteRow';
import initialState from '../comprobantesReducuerInitialState';
import { FETCH_COMPROBANTES_LISTA } from '../actionTypes';

function BuscarComprobante({ comprobantesLista, cargar_comprobantes }) {
    useEffect(() => {
        cargar_comprobantes();
    }, []);

    return (
        <div>
            <h1>Crear comprobantes asociados</h1>
            <Table striped responsive style={ { marginTop: '20px' } }>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Numero de comprobante</th>
                        <th>Total facturado</th>
                        <th>Total cobrado</th>
                        <th>Fecha de emision</th>
                        <th>Tipo de comprobante</th>
                    </tr>
                </thead>
                <tbody>
                    {comprobantesLista.map(comprobante => (
                        <ComprobanteRow
                          key={ comprobante.id }
                          NombreCliente={ comprobante.nombre_cliente }
                          Numero={ comprobante.numero }
                          TotalFacturado={ comprobante.total_facturado }
                          TotalCobrado={ comprobante.total_cobrado }
                          FechaEmision={ comprobante.fecha_emision }
                          TipoComprobante={ comprobante.tipo_comprobante.nombre }
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

BuscarComprobante.propTypes = {
    comprobantesLista: PropTypes.array.isRequired,
    cargar_comprobantes: PropTypes.func.isRequired,
};

BuscarComprobante.defaultProps = {
    comprobantesLista: initialState.comprobantesLista,
};

const mapStateToProps = state => ({
    comprobantesLista: state.comprobantesReducer.comprobantes_lista,
});

function mapDispatchToProps(dispatch) {
    return {
        cargar_comprobantes: () => dispatch({ type: FETCH_COMPROBANTES_LISTA }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BuscarComprobante);
