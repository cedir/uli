import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap/dist/react-bootstrap';
import initialState from '../presentacionReducerInitialState';
import PresentacionesObraSocialTableRow from './PresentacionesObraSocialTableRow';

function PresentacionesObraSocialList(props) {
    const { presentaciones } = props;

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

const { array } = PropTypes;

PresentacionesObraSocialList.propTypes = {
    presentaciones: array,
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

export default
    connect(mapStateToProps, null)(PresentacionesObraSocialList);
