import React, { useEffect } from 'react';
import PropTypes, { func } from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap/dist/react-bootstrap';
import initialState from '../presentacionReducerInitialState';
import PresentacionesObraSocialTableRow from './PresentacionesObraSocialTableRow';
import { FETCH_PRESENTACIONES_OBRA_SOCIAL } from '../actionTypes';

function PresentacionesObraSocialList(props) {
    /* eslint-disable no-unused-vars */
    const { presentaciones, obraSocial, fetchPresentacionesObraSocial } = props;

    useEffect(() => {
        if (obraSocial) {
            fetchPresentacionesObraSocial(obraSocial);
        }
    }, []);

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

const { array, object } = PropTypes;

PresentacionesObraSocialList.propTypes = {
    presentaciones: array,
    obraSocial: object,
    fetchPresentacionesObraSocial: func,
};

PresentacionesObraSocialList.defaultProps = {
    presentaciones: initialState.presentaciones,
};

function mapStateToProps(state) {
    return {
        presentaciones: state.presentacionReducer.presentaciones,
        obraSocial: state.estudiosSinPresentarReducer.obraSocial,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPresentacionesObraSocial: obraSocial => dispatch({
            type: FETCH_PRESENTACIONES_OBRA_SOCIAL,
            id: obraSocial.id,
        }),
    };
}

export default
    connect(mapStateToProps, mapDispatchToProps)(PresentacionesObraSocialList);
