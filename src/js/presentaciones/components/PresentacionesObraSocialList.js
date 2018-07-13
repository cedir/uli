import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap/dist/react-bootstrap';

import initialState from '../presentacionReducerInitialState';
import PresentacionesObraSocialTableRow from './PresentacionesObraSocialTableRow';

class PresentacionesObraSocialList extends Component {
    render() {
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
                            <th>Presentacion digital (formato OSDE)</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.presentaciones.map(presentacion => (
                            <PresentacionesObraSocialTableRow
                              key={ presentacion.id }
                              presentacion={ presentacion }
                            />
                        )) }
                    </tbody>
                </Table>
            </div>
        );
    }
}

const { array } = PropTypes;

PresentacionesObraSocialList.propTypes = {
    presentaciones: array,
};

PresentacionesObraSocialList.defaultProps = {
    presentaciones: initialState.presentaciones,
};

function mapStateToProps(state) {
    return {
        presentaciones: state.presentacionReducer.presentaciones,
    };
}

export default
    connect(mapStateToProps, null)(PresentacionesObraSocialList);
