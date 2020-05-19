import React from 'react';
import PropTypes, { func } from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap/dist/react-bootstrap';
import initialState from '../presentacionReducerInitialState';
import PresentacionesObraSocialTableRow from './PresentacionesObraSocialTableRow';
import { FETCH_PRESENTACIONES_OBRA_SOCIAL } from '../actionTypes';

function PresentacionesObraSocialList(props) {
    /* eslint-disable no-unused-vars */
    const { presentaciones, idObraSocial, fetchPresentacionesObraSocial } = props;

    return (
        <div>
            <Table striped responsive style={ { marginTop: '20px' } }>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Obra Social</th>
                        <th>Total Facturado</th>
                        <th>Total Cobrado</th>
                        <th title='Descargar en Formato Digital'>Descargar</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    { presentaciones.map(presentacion => (
                        <PresentacionesObraSocialTableRow
                          key={ presentacion.id }
                          presentacion={ presentacion }
                          index={ presentaciones.indexOf(presentacion) }
                        />
                    )) }
                </tbody>
            </Table>
        </div>
    );
}

const { array, number } = PropTypes;

PresentacionesObraSocialList.propTypes = {
    presentaciones: array,
    idObraSocial: number,
    fetchPresentacionesObraSocial: func,
};

PresentacionesObraSocialList.defaultProps = {
    presentaciones: initialState.presentaciones,
    idObraSocial: initialState.idObraSocial,
};

function mapStateToProps(state) {
    return {
        presentaciones: state.presentacionReducer.presentaciones,
        idObraSocial: state.presentacionReducer.idObraSocial,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPresentacionesObraSocial: idObraSocial => dispatch({
            type: FETCH_PRESENTACIONES_OBRA_SOCIAL,
            id: idObraSocial,
        }),
    };
}

export default
    connect(mapStateToProps, mapDispatchToProps)(PresentacionesObraSocialList);
