import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class DetalleFacturacionEstudio extends React.Component {

    render() {
        return (
            <div>
                <h4 style={ { marginTop: '25px' } }>Presentacion</h4>
                <span style={ { fontWeight: 'bold' } }>Nro: </span>
                <span>{this.props.estudioDetail.fecha}</span>

                <h4 style={ { marginTop: '25px' } }>Comprobante</h4>
                <span style={ { fontWeight: 'bold' } }>Nro: </span>
                <span>{this.props.estudioDetail.presentacion.comprobante.numero}</span>
            </div>
        );
    }
}

const { object } = PropTypes;

DetalleFacturacionEstudio.propTypes = {
    estudioDetail: object.isRequired,
};

function mapStateToProps(state) {
    return {
        estudioDetail: state.estudiosReducer.estudioDetail,
    };
}

function mapDispatchToProps() {
    return {
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetalleFacturacionEstudio));

