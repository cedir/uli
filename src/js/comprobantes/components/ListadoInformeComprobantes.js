import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListadoInformeComprobantesTable from './ListadoInformeComprobantesTable';
import SearchComprobantes from './SearchComprobantes';

class ListadoInformeComprobantes extends Component {
    render() {
        return (
            <div>
                <h2>Listado Informe Comprobantes</h2>
                <SearchComprobantes />
                {
                    this.props.comprobantes.length > 0 &&
                    <ListadoInformeComprobantesTable />
                }
                {
                    this.props.comprobantes.length === 0 &&
                    <div>
                        Su busqueda no arrojo resultados
                    </div>
                }
            </div>
        );
    }
}

const { array } = PropTypes;
ListadoInformeComprobantes.propTypes = {
    comprobantes: array.isRequired,
};

ListadoInformeComprobantes.defaultProps = {
    comprobantes: [],
};

function mapStateToProps(state) {
    return {
        comprobantes: state.comprobantesReducer.comprobantes,
    };
}

export default connect(mapStateToProps, null)(ListadoInformeComprobantes);
