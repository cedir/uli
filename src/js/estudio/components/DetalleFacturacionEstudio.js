import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function ComprobanteRender(comprobante) {
    if (!comprobante) {
        return null;
    }
    return (
        <div>
            <h4 style={ { marginTop: '25px' } }>Comprobante</h4>
            <span style={ { fontWeight: 'bold' } }>
                {comprobante.tipo_comprobante.nombre} &quot;{comprobante.sub_tipo}&quot;
            </span>
            <span>
                &nbsp;nro {comprobante.numero} - {comprobante.responsable}
            </span>
            <div>
                <span style={ { fontWeight: 'bold' } }>Fecha de emision: </span>
                <span>{comprobante.fecha_emision}</span>
            </div>
        </div>
    );
}

class DetalleFacturacionEstudio extends React.Component {

    render() {
        const { presentacion } = this.props.estudioDetail;
        const esPagoContraFactura = this.props.estudioDetail.es_pago_contra_factura !== 0;
        const comprobante = presentacion ? this.props.estudioDetail.presentacion.comprobante : null;

        const comprobanteRender = ComprobanteRender(comprobante);
        const mensajePresentacion = esPagoContraFactura ? 'El estudio fue dado de pago contra factura' : 'El estudio no fue presentado aún';

        if (presentacion) {
            return (
                <div>
                    <h4 style={ { marginTop: '25px' } }>Presentacion</h4>
                    <span style={ { fontWeight: 'bold' } }>Fecha: </span>
                    <span>{presentacion.fecha}</span> &nbsp;
                    <span style={ { fontWeight: 'bold' } }>Estado: </span>
                    <span>{presentacion.estado}</span>&nbsp;
                    <div>
                        <span style={ { fontWeight: 'bold' } }>Periodo: </span>
                        <span>{presentacion.periodo}</span>
                    </div>

                    {comprobanteRender}
                </div>
            );
        }
        return (
            <div>
                <span>{mensajePresentacion}</span>
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

